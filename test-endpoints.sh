#!/bin/bash
# Test Mega Brain API Endpoints

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="${1:-https://calebnewton.me}"

echo ""
echo "🧠 Testing Mega Brain API Endpoints"
echo "===================================="
echo "Base URL: $BASE_URL"
echo ""

# Test 1: Ask endpoint (GET)
echo -e "${BLUE}Test 1: GET /api/brain/ask${NC}"
echo "Request: $BASE_URL/api/brain/ask?q=hello"
echo ""

RESPONSE=$(curl -s "$BASE_URL/api/brain/ask?q=hello")
if echo "$RESPONSE" | grep -q '"question"'; then
    echo -e "${GREEN}✅ Success!${NC}"
    echo "Response preview:"
    echo "$RESPONSE" | head -c 200
    echo "..."
else
    echo -e "${RED}❌ Failed${NC}"
    echo "Response: $RESPONSE"
fi
echo ""
echo "---"
echo ""

# Test 2: Ask endpoint (POST)
echo -e "${BLUE}Test 2: POST /api/brain/ask${NC}"
echo "Request: POST $BASE_URL/api/brain/ask"
echo '  Body: {"question": "What is my name?"}'
echo ""

RESPONSE=$(curl -s -X POST "$BASE_URL/api/brain/ask" \
    -H "Content-Type: application/json" \
    -d '{"question": "What is my name?"}')

if echo "$RESPONSE" | grep -q '"question"'; then
    echo -e "${GREEN}✅ Success!${NC}"
    echo "Response preview:"
    echo "$RESPONSE" | head -c 200
    echo "..."
else
    echo -e "${RED}❌ Failed${NC}"
    echo "Response: $RESPONSE"
fi
echo ""
echo "---"
echo ""

# Test 3: Do endpoint
echo -e "${BLUE}Test 3: POST /api/brain/do${NC}"
echo "Request: POST $BASE_URL/api/brain/do"
echo '  Body: {"command": "test command"}'
echo ""

RESPONSE=$(curl -s -X POST "$BASE_URL/api/brain/do" \
    -H "Content-Type: application/json" \
    -d '{"command": "test command"}')

if echo "$RESPONSE" | grep -q '"command"'; then
    echo -e "${GREEN}✅ Success!${NC}"
    echo "Response preview:"
    echo "$RESPONSE" | head -c 200
    echo "..."
else
    echo -e "${RED}❌ Failed${NC}"
    echo "Response: $RESPONSE"
fi
echo ""
echo "---"
echo ""

# Test 4: Poke endpoint
echo -e "${BLUE}Test 4: POST /api/brain/poke${NC}"
echo "Request: POST $BASE_URL/api/brain/poke"
echo '  Body: {"message": "brain test", "from": "test"}'
echo ""

RESPONSE=$(curl -s -X POST "$BASE_URL/api/brain/poke" \
    -H "Content-Type: application/json" \
    -d '{"message": "brain test", "from": "test"}')

if echo "$RESPONSE" | grep -q '"reply"'; then
    echo -e "${GREEN}✅ Success!${NC}"
    echo "Response preview:"
    echo "$RESPONSE" | head -c 200
    echo "..."
else
    echo -e "${RED}❌ Failed${NC}"
    echo "Response: $RESPONSE"
fi
echo ""
echo "---"
echo ""

# Summary
echo "===================================="
echo -e "${GREEN}🎉 All tests completed!${NC}"
echo "===================================="
echo ""
echo "Your Mega Brain API is live at:"
echo "  - $BASE_URL/api/brain/ask"
echo "  - $BASE_URL/api/brain/do"
echo "  - $BASE_URL/api/brain/poke"
echo ""
echo "Try asking a real question:"
echo "  curl \"$BASE_URL/api/brain/ask?q=what+projects+am+I+working+on\""
echo ""
