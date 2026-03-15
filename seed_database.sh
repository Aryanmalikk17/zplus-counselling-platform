#!/bin/bash

# Configuration
BASE_URL="https://zplus-counselling-platform.onrender.com/api/v1"
AUTH_TOKEN=$1

if [ -z "$AUTH_TOKEN" ]; then
    echo "Error: Firebase JWT Token is required as the first argument."
    echo "Usage: ./seed_database.sh <YOUR_ADMIN_JWT>"
    exit 1
fi

if [ ! -f "seed_assessments.json" ]; then
    echo "Error: seed_assessments.json not found!"
    exit 1
fi

echo "🚀 Starting database seeding to live server: $BASE_URL"
echo "--------------------------------------------------------"

# Use jq to iterate over the JSON array
count=$(jq '. | length' seed_assessments.json)
echo "Found $count assessments to seed."

for ((i=0; i<$count; i++))
do
    assessment=$(jq ".[$i]" seed_assessments.json)
    title=$(echo "$assessment" | jq -r '.title')
    
    echo -n "Inserting: $title ... "
    
    response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/admin/assessments" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $AUTH_TOKEN" \
        -d "$assessment")
    
    http_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
        echo "✅ SUCCESS ($http_code)"
    else
        echo "❌ FAILED ($http_code)"
        echo "   Error: $body"
    fi
done

echo "--------------------------------------------------------"
echo "🎉 Seeding process complete!"
