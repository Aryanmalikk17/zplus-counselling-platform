#!/usr/bin/env bash
# ============================================================================
#  ZPlus Counselling Platform — End-to-End API Integration Test Script
#  Usage:  ./api_test.sh <USER_FIREBASE_ID_TOKEN>
#          or: FIREBASE_TOKEN=<token> ./api_test.sh
#          Optionally add ADMIN_TOKEN=<token> for admin endpoints
# ============================================================================
set -uo pipefail # Removed -e to manually handle test failures without aborting

# ── Configuration ───────────────────────────────────────────────────────────
BASE_URL="http://localhost:8080/api/v1" # Local test URL (change to Render for live tests)
if [[ "${1:-}" == "https://"* ]]; then
    BASE_URL="${1:-}"
    TOKEN="${2:-${FIREBASE_TOKEN:-}}"
else
    TOKEN="${1:-${FIREBASE_TOKEN:-}}"
fi

ADMIN_TOKEN="${ADMIN_TOKEN:-$TOKEN}" # Fallback to generic token if ADMIN_TOKEN missing
REPORT_FILE="test_report.log"
PASS=0
FAIL=0
SKIP=0
SESSION_ID=""   # populated during the assessment flow
TEMPLATE_ID=""  # populated during the assessment flow

# ── Colors ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# ── Helpers ─────────────────────────────────────────────────────────────────
timestamp() { date "+%Y-%m-%d %H:%M:%S"; }

log() {
  local msg="[$(timestamp)] $1"
  echo -e "$msg" | tee -a "$REPORT_FILE"
}

separator() {
  local line="════════════════════════════════════════════════════════════════"
  echo -e "${CYAN}${line}${NC}" | tee -a "$REPORT_FILE"
}

# Core curl wrapper: performs the request, checks HTTP status + body
# Usage: run_test "LABEL" "METHOD" "URL" "EXPECTED_STATUS_REGEX" ["JSON_BODY"] ["AUTH_TOKEN"]
run_test() {
  local label="$1"
  local method="$2"
  local url="$3"
  local expected_status_regex="$4"
  local body="${5:-}"
  local auth_token="${6:-}"

  separator
  log "${BOLD}▶ TEST: ${label}${NC}"
  log "  ${method} ${url}"

  # Build curl args
  local -a args=( -s -w "\n__HTTP_STATUS__%{http_code}" -X "$method" "$url"
                  -H "Content-Type: application/json" )

  # Attach auth header if a token is explicitly provided (not NO_AUTH)
  if [[ -n "$auth_token" && "$auth_token" != "NO_AUTH" ]]; then
    args+=( -H "Authorization: Bearer ${auth_token}" )
  fi

  # Attach body for POST/PUT/PATCH
  if [[ -n "$body" ]]; then
    args+=( -d "$body" )
    log "  Body: ${body}"
  fi

  # Execute
  local raw_output
  raw_output=$(curl "${args[@]}" 2>&1) || true

  # Parse status and body
  local http_status
  http_status=$(echo "$raw_output" | grep "__HTTP_STATUS__" | sed 's/.*__HTTP_STATUS__//')
  local response_body
  response_body=$(echo "$raw_output" | sed '/__HTTP_STATUS__/d')

  local display_body
  if [[ ${#response_body} -gt 1000 ]]; then
    display_body="${response_body:0:1000}...(truncated)"
  else
    display_body="$response_body"
  fi

  # Evaluate pass/fail against EXPECTED regex
  if [[ "$http_status" =~ $expected_status_regex ]]; then
    log "  ${GREEN}✅ STATUS: ${http_status} (Expected: ${expected_status_regex}) — PASS${NC}"
    PASS=$((PASS + 1))
  else
    log "  ${RED}❌ STATUS: ${http_status} (Expected: ${expected_status_regex}) — FAIL${NC}"
    FAIL=$((FAIL + 1))
  fi

  log "  Response: ${display_body}"
  echo "" | tee -a "$REPORT_FILE"

  # Export for downstream parsing
  LAST_STATUS="$http_status"
  LAST_BODY="$response_body"
}

# Extract a JSON value
json_val() {
  local json="$1"
  local key="$2"
  if command -v jq &>/dev/null; then
    echo "$json" | jq -r "$key" 2>/dev/null || echo ""
  else
    echo "$json" | grep -o "\"${key}\"[[:space:]]*:[[:space:]]*\"[^\"]*\"" | head -1 | sed 's/.*: *"//;s/"//' || echo ""
  fi
}

# ── Pre-flight ──────────────────────────────────────────────────────────────
echo "" > "$REPORT_FILE"
separator
log "${BOLD}🚀 ZPlus Counselling — API Integration Test Suite${NC}"
log "   Base URL : ${BASE_URL}"
log "   Token    : ${TOKEN:0:20}…(redacted)"
log "   Started  : $(timestamp)"
separator

if [[ -z "$TOKEN" ]]; then
  log "${YELLOW}⚠️  No Firebase token provided. Protected endpoints will likely return 401/403.${NC}"
  log "   Usage: ./api_test.sh <FIREBASE_ID_TOKEN>"
  log ""
fi

# ============================================================================
#  SECTION 1 — HEALTH CHECK (Unprotected)
# ============================================================================
log "\n${BOLD}━━━ SECTION 1: HEALTH CHECK (Unprotected) ━━━${NC}"
run_test "Actuator Health" "GET" "${BASE_URL}/actuator/health" "^2" "" "NO_AUTH"

# ============================================================================
#  SECTION 2 — AUTHENTICATION & USER (Protected — Firebase Bearer)
# ============================================================================
log "\n${BOLD}━━━ SECTION 2: AUTHENTICATION & USER ━━━${NC}"

run_test "Auth — Get Current User (/auth/me)" \
  "GET" "${BASE_URL}/auth/me" "^2" "" "$TOKEN"

run_test "User — Get Profile (/users/profile)" \
  "GET" "${BASE_URL}/users/profile" "^2" "" "$TOKEN"

run_test "User — Update Profile (/users/profile)" \
  "PUT" "${BASE_URL}/users/profile" "^2" \
  '{"fullName":"QA Test User","phone":"9999999999","location":"Delhi"}' "$TOKEN"

run_test "User — Dashboard (/users/dashboard)" \
  "GET" "${BASE_URL}/users/dashboard" "^2" "" "$TOKEN"

# ============================================================================
#  SECTION 3 — ASSESSMENT FLOW (MongoDB — Protected)
# ============================================================================
log "\n${BOLD}━━━ SECTION 3: ASSESSMENT FLOW (MongoDB) ━━━${NC}"

# 3a. List available assessments
run_test "Assessments — List Available" \
  "GET" "${BASE_URL}/assessments/available" "^2" "" "$TOKEN"

# 3b. Get assessment template (IQ test)
run_test "Assessments — Get Template (iq-test)" \
  "GET" "${BASE_URL}/assessments/iq-test" "^2" "" "$TOKEN"

if [[ "$LAST_STATUS" =~ ^2 ]]; then
  TEMPLATE_ID=$(json_val "$LAST_BODY" ".data.id" 2>/dev/null || echo "")
  if [[ -z "$TEMPLATE_ID" || "$TEMPLATE_ID" == "null" ]]; then
    # Fallback grep for nested "id"
    TEMPLATE_ID=$(echo "$LAST_BODY" | grep -o '"id":"[^"]*"' | head -1 | sed 's/"id":"//;s/"//')
  fi
  log "  📌 Captured templateId: ${TEMPLATE_ID:-NONE}"
fi

# 3c. Start an assessment session
if [[ -n "$TEMPLATE_ID" && "$TEMPLATE_ID" != "null" ]]; then
  run_test "Assessments — Start Session (iq-test)" \
    "POST" "${BASE_URL}/assessments/iq-test/start" "^2" \
    "{\"templateId\":\"${TEMPLATE_ID}\"}" "$TOKEN"

  if [[ "$LAST_STATUS" =~ ^2 ]]; then
    SESSION_ID=$(json_val "$LAST_BODY" ".data.sessionId" 2>/dev/null || echo "")
    if [[ -z "$SESSION_ID" || "$SESSION_ID" == "null" ]]; then
      SESSION_ID=$(echo "$LAST_BODY" | grep -o '"sessionId":"[^"]*"' | head -1 | sed 's/"sessionId":"//;s/"//')
    fi
    log "  📌 Captured sessionId: ${SESSION_ID:-NONE}"
  fi
else
  log "${YELLOW}  ⏭️  Skipping Start Session — no templateId captured.${NC}"
  FAIL=$((FAIL + 1))
fi

# 3d. Submit an answer (if we got a session)
if [[ -n "$SESSION_ID" && "$SESSION_ID" != "null" ]]; then
  run_test "Assessments — Submit Answer (Q1)" \
    "PUT" "${BASE_URL}/assessments/iq-test/answer" "^2" \
    "{\"sessionId\":\"${SESSION_ID}\",\"questionId\":\"iq1\",\"answer\":\"b\",\"responseTime\":12}" "$TOKEN"

  run_test "Assessments — Submit Answer (Q2)" \
    "PUT" "${BASE_URL}/assessments/iq-test/answer" "^2" \
    "{\"sessionId\":\"${SESSION_ID}\",\"questionId\":\"iq2\",\"answer\":\"b\",\"responseTime\":8}" "$TOKEN"

  # 3e. Complete the assessment
  run_test "Assessments — Complete (iq-test)" \
    "POST" "${BASE_URL}/assessments/iq-test/submit" "^2" \
    "{\"sessionId\":\"${SESSION_ID}\"}" "$TOKEN"
else
  log "${YELLOW}  ⏭️  Skipping answer/complete tests — no sessionId captured.${NC}"
  SKIP=$((SKIP + 3))
fi

# 3f. Assessment history
run_test "Assessments — History" \
  "GET" "${BASE_URL}/assessments/history" "^2" "" "$TOKEN"

# ============================================================================
#  SECTION 4 — TEST RESULTS (PostgreSQL — Protected)
# ============================================================================
log "\n${BOLD}━━━ SECTION 4: TEST RESULTS (PostgreSQL) ━━━${NC}"

# Fixed payload: use percentage and timeSpent to match FrontendTestResultDto
run_test "Test Results — Submit Frontend Result" \
  "POST" "${BASE_URL}/test-results" "^2" \
  '{"testType":"iq-test","score":85,"percentage":85,"timeSpent":1200,"detailedAnswers":[{"questionId":"iq1","selectedOption":"b","isCorrect":true}]}' "$TOKEN"

# ============================================================================
#  SECTION 5 — ADMIN ASSESSMENTS (Protected)
# ============================================================================
log "\n${BOLD}━━━ SECTION 5: ADMIN ENDPOINTS ━━━${NC}"
# Use the explicit ADMIN_TOKEN (which might just be the user token if not provided)
# If it's a regular user token, expect a 403 Forbidden. If it's a real admin token, expect 2xx.
ADMIN_EXPECT="^(2|403)"

run_test "Admin — List All Assessments" \
  "GET" "${BASE_URL}/admin/assessments" "$ADMIN_EXPECT" "" "$ADMIN_TOKEN"

run_test "Admin — Get Single Assessment (iq-test)" \
  "GET" "${BASE_URL}/admin/assessments/iq-test" "$ADMIN_EXPECT" "" "$ADMIN_TOKEN"

# ============================================================================
#  SECTION 6 — EDGE CASES & NEGATIVE TESTS
# ============================================================================
log "\n${BOLD}━━━ SECTION 6: EDGE CASES & NEGATIVE TESTS ━━━${NC}"

# Unprotected route that does not exist -> 404
run_test "404 — Non-existent public endpoint" \
  "GET" "${BASE_URL}/public/this-does-not-exist" "^404" "" "NO_AUTH"

# Protected route that does not exist WITHOUT token -> 401
run_test "401 — Non-existent protected endpoint (No token)" \
  "GET" "${BASE_URL}/this-does-not-exist" "^401" "" "NO_AUTH"

# Protected endpoint without token -> 401
run_test "401 — Protected endpoint without token" \
  "GET" "${BASE_URL}/auth/me" "^401" "" "NO_AUTH"

# Invalid assessment type -> 404
run_test "404 — Invalid assessment type" \
  "GET" "${BASE_URL}/assessments/non-existent-test-type" "^404" "" "$TOKEN"

# ============================================================================
#  SUMMARY
# ============================================================================
separator
log ""
log "${BOLD}📊 TEST SUMMARY${NC}"
log "   ${GREEN}✅ Passed : ${PASS}${NC}"
log "   ${RED}❌ Failed : ${FAIL}${NC}"
log "   ${YELLOW}⏭️  Skipped: ${SKIP}${NC}"
log "   Total   : $((PASS + FAIL + SKIP))"
log ""
log "   Full report saved to: ${REPORT_FILE}"
separator

if [[ $FAIL -gt 0 ]]; then
  exit 1
fi
