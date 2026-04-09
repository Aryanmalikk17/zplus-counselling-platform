import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import axios from 'axios';
import dotenv from 'dotenv';
import mammoth from 'mammoth';
import { execSync } from 'child_process';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

dotenv.config();

const ASSESSMENT_SCHEMA = {
  "title": "String",
  "description": "String",
  "category": "String (Inject this exactly from the CLI argument)",
  "estimatedTimeMinutes": "Integer (Estimate based on question count)",
  "isActive": true,
  "questions": [
    {
      "text": "String",
      "type": "MULTIPLE_CHOICE",
      "options": [
        {
          "text": "String",
          "weights": { "String (dimension/trait)": "Integer (score)" }
        }
      ]
    }
  ]
};

async function runIngestion(filePath, category, testType = 'psychometric') {
  if (!filePath || !category) {
    console.error('Usage: /kaam krde bhai <file_path> <category> <test_type>');
    console.error('Test Type options: psychometric, objective');
    process.exit(1);
  }

  // 1. Verify Environment
  const genAIKey = process.env.GEMINI_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const baseUrl = process.env.API_BASE_URL || 'https://zplus-counselling-platform.onrender.com/api/v1';

  if (!genAIKey || !adminEmail) {
    console.error('\x1b[31mError: Missing GEMINI_API_KEY or ADMIN_EMAIL in .env file.\x1b[0m');
    process.exit(1);
  }

  const ext = path.extname(filePath).toLowerCase();
  const isTxt = ext === '.txt';
  const isDocx = ext === '.docx';
  const isPdf = ext === '.pdf';
  const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);

  if (!isDocx && !isImage && !isPdf && !isTxt) {
    console.error(`\x1b[31mError: Unsupported file type: ${ext}. Use .docx, .pdf, .txt, or images.\x1b[0m`);
    process.exit(1);
  }

  try {
    console.log(`\x1b[36m[System] Processing: ${filePath} (${ext}) in category: ${category} | Type: ${testType}\x1b[0m`);

    // 2. Authenticate with Native Backend
    console.log('\x1b[36m[System] Logging in to native backend...\x1b[0m');
    let backendToken = '';
    try {
      const authRes = await axios.post(`${baseUrl}/auth/login`, {
        email: adminEmail,
        password: adminPassword
      });
      backendToken = authRes.data.accessToken || authRes.data.token;
      let roleInfo = "unknown";
      try {
        if(backendToken) {
           const payloadB64 = backendToken.split('.')[1];
           const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());
           roleInfo = JSON.stringify(payload);
        }
      } catch(e) {}
      console.log(`\x1b[32m[System] Authenticated successfully. Token Payload: ${roleInfo}\x1b[0m`);
    } catch (err) {
      console.error(`\x1b[31mBackend Login Error: ${err.message}\x1b[0m`);
      if (err.response) console.error(err.response.data);
      process.exit(1);
    }

    // 3. Data Preparation & Dynamic Prompting
    let genAIInput = [];
    const genAI = new GoogleGenerativeAI(genAIKey, { apiVersion: "v1" });
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", apiVersion: "v1" });

    let systemLogic = "";
    if (testType.toLowerCase() === 'objective') {
      systemLogic = `IMPORTANT: This is an OBJECTIVE Aptitude test. 
      1. Scan the document for an "Answer Key" or "Correct Answers" section at the bottom.
      2. For every question, you MUST assign {"Aptitude_Score": 1} to the weight of the correct option.
      3. Assign {"Aptitude_Score": 0} to the weights of all incorrect options.`;
    } else {
      systemLogic = `IMPORTANT: This is a PSYCHOMETRIC test.
      1. Deduce psychological scoring weights for the options based on the specific test traits (e.g. Big Five, Career interest, personality).
      2. Assign weights using trait names as keys (e.g. {"Extraversion": 1, "Agreeableness": 0}).`;
    }

    const prompt = `Extract test data. Output strict JSON matching schema below. 
    Category MUST be "${category}". 
    ${systemLogic}
    NO markdown. NO explanations. NO preamble.
    
    SCHEMA:
    ${JSON.stringify(ASSESSMENT_SCHEMA, null, 2)}`;

    const fileData = fs.readFileSync(filePath);
    
    let parts = [{ text: prompt }];

    if (isImage) {
      const buffer = await sharp(fileData).resize(1024).jpeg({ quality: 80 }).toBuffer();
      parts.push({ inlineData: { data: buffer.toString('base64'), mimeType: "image/jpeg" } });
    } else if (isPdf) {
      console.log('\x1b[32m[System] Uploading PDF via Gemini File API...\x1b[0m');
      const fileManager = new GoogleAIFileManager(genAIKey);
      const uploadResult = await fileManager.uploadFile(filePath, { mimeType: "application/pdf" });
      console.log(`\x1b[32m[System] PDF Uploaded successfully (URI: ${uploadResult.file.uri}).\x1b[0m`);
      parts.push({ fileData: { fileUri: uploadResult.file.uri, mimeType: "application/pdf" } });
    } else if (isDocx) {
      const { value: text } = await mammoth.extractRawText({ path: filePath });
      parts.push({ text: `DOCUMENT CONTENT:\n${text}` });
    } else if (isTxt) {
      const text = fs.readFileSync(filePath, 'utf8');
      parts.push({ text: `DOCUMENT CONTENT:\n${text}` });
    }

    console.log('\x1b[36m[System] Calling Gemini V1 API via curl (for total stability)...\x1b[0m');
    const payload = JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseMimeType: "application/json" }
    });
    const tempFile = path.join(process.cwd(), '.gemini_payload.json');
    fs.writeFileSync(tempFile, payload);

    try {
      const curlCmd = `curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${genAIKey}" \
        -H "Content-Type: application/json" \
        -d "@${tempFile}"`;
      
      const result = execSync(curlCmd).toString();
      
      const geminiRes = JSON.parse(result);
      if (!geminiRes.candidates || geminiRes.candidates.length === 0) {
        console.error('\x1b[31m[Gemini Debug] No candidates returned. Full Result:\x1b[0m');
        console.error(JSON.stringify(geminiRes, null, 2));
        throw new Error('No candidates returned from Gemini');
      }
      
      fs.unlinkSync(tempFile);
      
      let jsonText = geminiRes.candidates[0].content.parts[0].text.replace(/```json\n?|\n?```/g, "").trim();
      const assessmentData = JSON.parse(jsonText);
      console.log('\x1b[32m[System] AI Data extraction successful.\x1b[0m');

      // 5. Phase 3: Production API Injection
      console.log('\x1b[36m[System] Injecting assessment into database...\x1b[0m');
      const apiResponse = await axios.post(`${baseUrl}/admin/assessments`, assessmentData, {
        headers: {
          'Authorization': `Bearer ${backendToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(`\n\x1b[42m\x1b[37m[SUCCESS] Assessment seeded successfully!\x1b[0m`);
      console.log(`\x1b[32m[Database ID] ${apiResponse.data.id || 'N/A'}\x1b[0m\n`);

    } catch (innerErr) {
      console.error('\x1b[31m[System] Error during Gemini extraction or API injection\x1b[0m');
      throw innerErr;
    }
  } catch (err) {
    console.log('\n\x1b[41m\x1b[37m[ERROR] Pipeline Failure\x1b[0m');
    if (err.response) {
      console.error(`\x1b[31mBackend Error: ${err.response.status} - ${JSON.stringify(err.response.data, null, 2)}\x1b[0m`);
    } else {
      console.error(`\x1b[31mSystem Error: ${err.message}\x1b[0m`);
    }
    console.log('\n\x1b[33m--- SELF-HEALING DIAGNOSTIC TRIGGERED ---\x1b[0m');
    process.exit(1);
  }
}

const [,, fPath, tCategory, tType] = process.argv;
runIngestion(fPath, tCategory, tType);
