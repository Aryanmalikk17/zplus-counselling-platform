#!/bin/bash

# ZPlus Counselling - Admin API Integration Audit Script
# Purporse: Verify Create, Read, Update, and Delete operations for Assessments.

# --- CONFIGURATION ---
API_BASE_URL="${VITE_API_URL:-http://localhost:8080/api/v1}"
ADMIN_TOKEN="" # Paste your Firebase ID Token here for manual runs

echo "===================================================="
echo "🚀 ZPlus Counselling: Admin API Audit"
echo "===================================================="

# Check if token is provided
if [ -z "$ADMIN_TOKEN" ]; then
    echo "⚠️ Warning: ADMIN_TOKEN is not set. Using dummy token."
    ADMIN_TOKEN="DEBUG_TOKEN"
fi

# 1. CREATE ASSESSMENT
echo "\n[1/4] Testing: CREATE ASSESSMENT"
CREATE_RESPONSE=$(curl -s -X POST "$API_BASE_URL/admin/assessments" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "title": "Audit Test Assessment",
        "description": "Triggered by automated audit script",
        "questions": [
            {
                "text": "How reliable is this system?",
                "type": "multiple-choice",
                "options": [{"text": "Very", "weight": 1}, {"text": "Not at all", "weight": 0}]
            }
        ]
    }')

NEW_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ ! -z "$NEW_ID" ]; then
    echo "✅ SUCCESS: Created assessment with ID: $NEW_ID"
else
    echo "❌ FAILED: Could not create assessment."
    echo "Response: $CREATE_RESPONSE"
fi

# 2. READ ASSESSMENT
if [ ! -z "$NEW_ID" ]; then
    echo "\n[2/4] Testing: READ ASSESSMENT ($NEW_ID)"
    READ_RESPONSE=$(curl -s -X GET "$API_BASE_URL/admin/assessments/$NEW_ID" \
        -H "Authorization: Bearer $ADMIN_TOKEN")
    
    if [[ "$READ_RESPONSE" == *"$NEW_ID"* ]]; then
        echo "✅ SUCCESS: Successfully retrieved assessment data."
    else
        echo "❌ FAILED: Data mismatch or link broken."
    fi
fi

# 3. UPDATE ASSESSMENT
if [ ! -z "$NEW_ID" ]; then
    echo "\n[3/4] Testing: UPDATE ASSESSMENT ($NEW_ID)"
    UPDATE_RESPONSE=$(curl -s -X PUT "$API_BASE_URL/admin/assessments/$NEW_ID" \
        -H "Authorization: Bearer $ADMIN_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
            "title": "Audit Test Assessment (UPDATED)",
            "description": "Integration verified"
        }')
    
    if [[ "$UPDATE_RESPONSE" == *"UPDATED"* ]]; then
        echo "✅ SUCCESS: Data updated in backend."
    else
        echo "❌ FAILED: Update failed."
    fi
fi

# 4. DELETE ASSESSMENT
if [ ! -z "$NEW_ID" ]; then
    echo "\n[4/4] Testing: DELETE ASSESSMENT ($NEW_ID)"
    DELETE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$API_BASE_URL/admin/assessments/$NEW_ID" \
        -H "Authorization: Bearer $ADMIN_TOKEN")
    
    if [ "$DELETE_STATUS" == "200" ] || [ "$DELETE_STATUS" == "204" ]; then
        echo "✅ SUCCESS: Assessment purged from database."
    else
        echo "❌ FAILED: Delete returned status $DELETE_STATUS"
    fi
fi

echo "\n===================================================="
echo "🎯 Audit Complete"
echo "===================================================="
