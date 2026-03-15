#!/bin/bash

# ZPlus Counselling - Production API Audit Script (Non-Blocking)
# Purpose: Verify CRUD lifecycle of Assessments on the live server.
# Usage: ./admin_api_test.sh "YOUR_FIREBASE_ID_TOKEN"

# --- CONFIGURATION ---
BASE_URL="https://zplus-counselling-platform.onrender.com/api/v1"
ADMIN_TOKEN="$1"
LOG_FILE="admin_test_report.log"

# Function to log both to terminal and file
log_output() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

# Header
echo "====================================================" | tee "$LOG_FILE"
echo "🚀 PRODUCTION API AUDIT - $(date)" | tee -a "$LOG_FILE"
echo "====================================================" | tee -a "$LOG_FILE"

# Check Authentication
if [ -z "$ADMIN_TOKEN" ]; then
    log_output "❌ ERROR: No Bearer token provided."
    log_output "Usage: ./admin_api_test.sh \"YOUR_ID_TOKEN\""
    exit 1
fi

# ---------------------------------------------------------
# TEST 1: GET ALL ASSESSMENTS
# ---------------------------------------------------------
log_output "\n[1/5] TEST: GET ALL ASSESSMENTS"
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/admin/assessments" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json")

HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

log_output "HTTP Status: $HTTP_STATUS"
log_output "Raw Response: $BODY"

# ---------------------------------------------------------
# TEST 2: CREATE ASSESSMENT (POST)
# ---------------------------------------------------------
log_output "\n[2/5] TEST: CREATE ASSESSMENT"
CREATE_PAYLOAD='{
    "title": "QA Audit Test - $(date +%s)",
    "description": "Automated production integrity check",
    "questions": [
        {
            "text": "System sanity check?",
            "type": "binary",
            "options": [{"text": "Pass", "weight": 1}, {"text": "Fail", "weight": 0}]
        }
    ]
}'

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/admin/assessments" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$CREATE_PAYLOAD")

HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')
NEW_ID=$(echo "$BODY" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

log_output "HTTP Status: $HTTP_STATUS"
log_output "Raw Response: $BODY"
log_output "Extracted ID: $NEW_ID"

# ---------------------------------------------------------
# TEST 3: GET SINGLE ASSESSMENT
# ---------------------------------------------------------
if [ ! -z "$NEW_ID" ]; then
    log_output "\n[3/5] TEST: GET SINGLE ASSESSMENT ($NEW_ID)"
    RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/admin/assessments/$NEW_ID" \
        -H "Authorization: Bearer $ADMIN_TOKEN")
    
    HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    log_output "HTTP Status: $HTTP_STATUS"
    log_output "Raw Response: $BODY"
else
    log_output "\n[3/5] TEST: GET SINGLE ASSESSMENT -> SKIPPED (No ID extracted)"
fi

# ---------------------------------------------------------
# TEST 4: UPDATE ASSESSMENT (PUT)
# ---------------------------------------------------------
if [ ! -z "$NEW_ID" ]; then
    log_output "\n[4/5] TEST: UPDATE ASSESSMENT ($NEW_ID)"
    UPDATE_PAYLOAD='{
        "title": "QA Audit Test (UPDATED)",
        "description": "Metadata update confirmed"
    }'
    
    RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT "$BASE_URL/admin/assessments/$NEW_ID" \
        -H "Authorization: Bearer $ADMIN_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$UPDATE_PAYLOAD")
    
    HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    log_output "HTTP Status: $HTTP_STATUS"
    log_output "Raw Response: $BODY"
else
    log_output "\n[4/5] TEST: UPDATE ASSESSMENT -> SKIPPED (No ID extracted)"
fi

# ---------------------------------------------------------
# TEST 5: DELETE ASSESSMENT
# ---------------------------------------------------------
if [ ! -z "$NEW_ID" ]; then
    log_output "\n[5/5] TEST: DELETE ASSESSMENT ($NEW_ID)"
    RESPONSE=$(curl -s -w "\n%{http_code}" -X DELETE "$BASE_URL/admin/assessments/$NEW_ID" \
        -H "Authorization: Bearer $ADMIN_TOKEN")
    
    HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    log_output "HTTP Status: $HTTP_STATUS"
    log_output "Raw Response: $BODY"
else
    log_output "\n[5/5] TEST: DELETE ASSESSMENT -> SKIPPED (No ID extracted)"
fi

log_output "\n===================================================="
log_output "🎯 AUDIT FINISHED - See $LOG_FILE for full details"
log_output "===================================================="
