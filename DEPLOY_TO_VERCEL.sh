#!/bin/bash
#
# DEPLOY TO VERCEL
# Quick deployment to calebnewton.me
#

echo "🚀 Deploying to Vercel..."
echo ""

cd "/Users/joelnewton/Desktop/2026 Code/Projects/Big-Projects/Personal-Website"

# Check if logged in
vercel whoami &>/dev/null
if [ $? -ne 0 ]; then
    echo "🔐 Please log in to Vercel:"
    vercel login
    echo ""
fi

# Commit any changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Committing changes..."
    git add .
    git commit -m "Update Mega Brain - $(date +%Y-%m-%d\ %H:%M:%S)"
    echo ""
fi

# Deploy
echo "🚀 Deploying to production..."
vercel --prod --yes

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Test endpoints:"
echo "   curl 'https://calebnewton.me/api/brain/ask?q=hello'"
echo ""
