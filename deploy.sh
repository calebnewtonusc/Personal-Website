#!/bin/bash
# Mega Brain Deployment Script for Vercel

set -e

echo "🧠 Mega Brain Deployment to Vercel"
echo "=================================="
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Must run from project root"
    exit 1
fi

# Check Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found"
    echo "Install with: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI found"
echo ""

# Check login status
echo "Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Not logged in to Vercel"
    echo "Running: vercel login"
    vercel login
fi

echo "✅ Authenticated with Vercel"
echo ""

# Check if project is linked
if [ ! -d ".vercel" ]; then
    echo "⚠️  Project not linked to Vercel"
    echo "Running: vercel link"
    echo ""
    echo "Please select:"
    echo "  - Your team/account"
    echo "  - Link to existing project 'personal-website' or create new"
    echo ""
    vercel link
    echo ""
fi

echo "✅ Project linked"
echo ""

# Show environment variables reminder
echo "📋 IMPORTANT: Environment Variables"
echo "=================================="
echo ""
echo "Before deploying, ensure these are set in Vercel Dashboard:"
echo "  1. ANTHROPIC_API_KEY (Required)"
echo "  2. SYNC_TOKEN (Optional)"
echo ""
echo "To set them:"
echo "  1. Go to: https://vercel.com/dashboard"
echo "  2. Select: personal-website project"
echo "  3. Settings → Environment Variables"
echo "  4. Add ANTHROPIC_API_KEY with your Claude API key"
echo ""
read -p "Press Enter when environment variables are configured..."
echo ""

# Build check
echo "Building project..."
npm run build
echo "✅ Build successful"
echo ""

# Deploy to production
echo "🚀 Deploying to Vercel production..."
echo ""
vercel --prod

echo ""
echo "=================================="
echo "✅ Deployment Complete!"
echo "=================================="
echo ""
echo "Your Mega Brain API is now live at:"
echo "  - https://calebnewton.me/api/brain/ask"
echo "  - https://calebnewton.me/api/brain/do"
echo "  - https://calebnewton.me/api/brain/poke"
echo ""
echo "Test with:"
echo "  curl \"https://calebnewton.me/api/brain/ask?q=hello\""
echo ""
