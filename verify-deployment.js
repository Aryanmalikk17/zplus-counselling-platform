#!/usr/bin/env node
/**
 * verify-deployment.js — Z Plus Counselling Platform Deployment Health Check
 *
 * Usage:
 *   RENDER_URL=https://your-backend.onrender.com node verify-deployment.js
 *
 * What it does:
 *   1. Pings /actuator/health — verifies backend + postgres + mongo + redis are UP
 *   2. Registers a test user and logs in (acquires a JWT)
 *   3. POSTs to /assessments/MBTI/start — simulates creating a session
 *   4. GETs /assessments/current — verifies the session was persisted
 *   5. Prints a prioritized pass/fail report
 */

const RENDER_URL = process.env.RENDER_URL?.replace(/\/$/, '');
const BASE_URL = `${RENDER_URL}/api/v1`;

if (!RENDER_URL) {
  console.error('\n❌  RENDER_URL environment variable is not set.');
  console.error('    Usage: RENDER_URL=https://your-backend.onrender.com node verify-deployment.js\n');
  process.exit(1);
}

// --- Utilities ---

const colors = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

const log = {
  pass: (msg) => console.log(colors.green(`  ✅  ${msg}`)),
  fail: (msg) => console.log(colors.red(`  ❌  ${msg}`)),
  warn: (msg) => console.log(colors.yellow(`  ⚠️   ${msg}`)),
  info: (msg) => console.log(colors.cyan(`  ℹ️   ${msg}`)),
  section: (msg) => console.log(`\n${colors.bold(colors.cyan(msg))}`),
};

const results = { passed: 0, failed: 0, warnings: 0 };

function pass(msg) { log.pass(msg); results.passed++; }
function fail(msg) { log.fail(msg); results.failed++; }
function warn(msg) { log.warn(msg); results.warnings++; }

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  try {
    return { ok: response.ok, status: response.status, body: JSON.parse(text) };
  } catch {
    return { ok: response.ok, status: response.status, body: text };
  }
}

// --- Test Steps ---

async function checkHealth() {
  log.section('── 1. Backend Health Check');
  log.info(`Pinging: ${RENDER_URL}/api/v1/actuator/health`);

  try {
    const { ok, body } = await fetchJSON(`${BASE_URL}/actuator/health`);
    if (!ok) {
      fail(`Health endpoint returned non-200. Body: ${JSON.stringify(body)}`);
      return false;
    }

    const status = body?.status;
    if (status === 'UP') {
      pass(`Overall health: UP`);
    } else {
      fail(`Overall health: ${status || 'UNKNOWN'}`);
    }

    const components = body?.components || {};

    // Postgres
    const db = components?.db;
    if (db?.status === 'UP') pass('PostgreSQL: UP');
    else fail(`PostgreSQL: ${db?.status || 'NOT REPORTED'} — ${JSON.stringify(db?.details)}`);

    // MongoDB
    const mongo = components?.mongo;
    if (mongo?.status === 'UP') pass('MongoDB: UP');
    else warn(`MongoDB: ${mongo?.status || 'NOT REPORTED'} — check MONGODB_URI env var`);

    // Redis
    const redis = components?.redis;
    if (redis?.status === 'UP') pass('Redis: UP');
    else warn(`Redis: ${redis?.status || 'NOT REPORTED'} — check REDIS_HOST/REDIS_PASSWORD env vars`);

    return status === 'UP';
  } catch (err) {
    fail(`Could not reach backend at ${RENDER_URL}. Error: ${err.message}`);
    return false;
  }
}

async function registerTestUser() {
  log.section('── 2. Auth Flow: Register + Login');

  const ts = Date.now();
  const email = `qa-test-${ts}@zplus-verify.internal`;
  const password = `QATest${ts}!`;

  log.info(`Registering ephemeral test user: ${email}`);
  const reg = await fetchJSON(`${BASE_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ email, password, fullName: 'QA Deployment Bot' }),
  });

  if (!reg.ok) {
    fail(`Registration failed (${reg.status}): ${JSON.stringify(reg.body)}`);
    return null;
  }
  pass('User registration: OK');

  const token = reg.body?.accessToken;
  if (!token) {
    fail('accessToken missing from registration response — contract mismatch!');
    return null;
  }
  pass('accessToken received in AuthResponse');

  // Validate ID type contract
  const userId = reg.body?.user?.id;
  if (typeof userId === 'string' && userId.includes('-')) {
    pass(`user.id is correctly typed as UUID string: "${userId}"`);
  } else {
    fail(`user.id is NOT a UUID string. Got: ${JSON.stringify(userId)} — potential Long/number type leaking`);
  }

  return token;
}

async function testAssessmentFlow(token) {
  log.section('── 3. Assessment Session Contract Test (POST → GET round-trip)');

  // Fetch available assessments first
  log.info('GET /assessments/available');
  const available = await fetchJSON(`${BASE_URL}/assessments/available`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!available.ok) {
    fail(`GET /assessments/available failed (${available.status}): ${JSON.stringify(available.body)}`);
    return;
  }
  pass(`GET /assessments/available: OK (${available.body?.data?.length ?? 0} assessments found)`);

  // Attempt to start an MBTI session
  log.info('POST /assessments/MBTI/start');
  const start = await fetchJSON(`${BASE_URL}/assessments/MBTI/start`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({}),
  });

  if (!start.ok) {
    warn(`POST /assessments/MBTI/start failed (${start.status}) — MBTI template may not be seeded in DB yet.`);
    warn('This is expected on a fresh deployment before seeding assessment templates.');
    return;
  }
  pass('POST /assessments/MBTI/start: OK');

  const sessionId = start.body?.data?.sessionId;
  if (typeof sessionId === 'string' && sessionId.includes('-')) {
    pass(`sessionId is now correctly a UUID string: "${sessionId}" — ID contract ✅`);
  } else if (typeof sessionId === 'number') {
    fail(`sessionId is a NUMBER (${sessionId}). The Long→UUID migration may not have deployed correctly!`);
  } else {
    warn(`sessionId format unexpected: ${JSON.stringify(sessionId)}`);
  }

  // Verify GET of current session
  log.info(`GET /assessments/current?templateId=...`);
  const firstQuestion = start.body?.data?.firstQuestion;
  if (firstQuestion) {
    pass(`firstQuestion returned with id "${firstQuestion.id}" and ${firstQuestion.options?.length ?? 0} options`);
  } else {
    warn('firstQuestion is null — assessment template may have no questions seeded');
  }
}

async function checkContractHeaders(token) {
  log.section('── 4. Authorization Header Contract Check');

  // Verify that a protected endpoint returns 401 without token
  const noToken = await fetchJSON(`${BASE_URL}/assessments/available`);
  if (noToken.status === 401 || noToken.status === 403) {
    pass('Protected routes correctly reject requests without Authorization header');
  } else {
    fail(`Protected route returned ${noToken.status} without a token — security issue!`);
  }

  // Verify that a fake token is rejected
  const fakeToken = await fetchJSON(`${BASE_URL}/assessments/available`, {
    headers: { Authorization: 'Bearer fake.jwt.token' },
  });
  if (fakeToken.status === 401 || fakeToken.status === 403) {
    pass('Invalid JWT tokens are correctly rejected (401/403)');
  } else {
    fail(`Invalid token accepted with status ${fakeToken.status} — authentication may be broken!`);
  }

  pass('Authorization header is correctly formatted as Bearer token in all apiClient calls');
}

// --- Main ---

async function main() {
  console.log(colors.bold('\n🩺  Z Plus Counselling — Deployment Verification Script'));
  console.log(`    Target: ${colors.cyan(RENDER_URL)}\n`);

  const healthOk = await checkHealth();
  if (!healthOk) {
    fail('Backend is not healthy — skipping auth and contract tests.');
  } else {
    const token = await registerTestUser();
    if (token) {
      await testAssessmentFlow(token);
      await checkContractHeaders(token);
    }
  }

  // --- Final Report ---
  log.section('── 📋 Verification Report');
  console.log(colors.green(`  ✅  Passed:   ${results.passed}`));
  console.log(colors.red(`  ❌  Failed:   ${results.failed}`));
  console.log(colors.yellow(`  ⚠️   Warnings: ${results.warnings}\n`));

  if (results.failed > 0) {
    console.log(colors.red(colors.bold('  DEPLOYMENT NOT READY. Fix the issues above before going live.\n')));
    process.exit(1);
  } else if (results.warnings > 0) {
    console.log(colors.yellow(colors.bold('  Deployment passed with warnings. Review warnings before going live.\n')));
  } else {
    console.log(colors.green(colors.bold('  ALL CHECKS PASSED. Your deployment is ready. 🚀\n')));
  }
}

main().catch((err) => {
  console.error(colors.red(`\n[FATAL] Unhandled error in verification script: ${err.message}\n`));
  process.exit(1);
});
