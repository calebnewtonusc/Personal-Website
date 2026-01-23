# Mega Brain Quick Start Guide

## 🚀 Deploy Now (3 Steps)

### Step 1: Set Environment Variables in Vercel
1. Go to https://vercel.com/dashboard
2. Select your `personal-website` project (or create it)
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your Claude API key from https://console.anthropic.com/
   - **Environments**: Production ✓ Preview ✓ Development ✓

### Step 2: Deploy
```bash
cd "/Users/joelnewton/Desktop/2026 Code/Big-Projects/Personal-Website"
./deploy.sh
```

Or manually:
```bash
vercel --prod
```

### Step 3: Test
```bash
# Test the ask endpoint
curl "https://calebnewton.me/api/brain/ask?q=hello"

# Should return:
# {
#   "question": "hello",
#   "answer": "...",
#   "timestamp": "...",
#   "contextUsed": [...]
# }
```

## 🔗 Your Cloud Endpoints

### 1. Ask Questions
```bash
https://calebnewton.me/api/brain/ask?q=YOUR_QUESTION
```

**Use from any Claude window**:
```
Can you check what I'm working on?
Use: https://calebnewton.me/api/brain/ask?q=what+projects+am+I+working+on
```

### 2. Execute Commands
```bash
curl -X POST https://calebnewton.me/api/brain/do \
  -H "Content-Type: application/json" \
  -d '{"command": "YOUR_COMMAND"}'
```

### 3. SMS Integration (Poke)
```bash
curl -X POST https://calebnewton.me/api/brain/poke \
  -H "Content-Type: application/json" \
  -d '{"message": "brain what am I working on?", "from": "YOUR_NUMBER"}'
```

## 📱 iPhone Siri Shortcut

1. Open **Shortcuts** app
2. Create new shortcut: **"Ask My Mega Brain"**
3. Add actions:
   ```
   Ask for Input → "What do you want to ask?"
   Get Contents of URL
     URL: https://calebnewton.me/api/brain/ask?q=[Input]
     Method: GET
   Get Dictionary Value
     Key: answer
   Show Result
   ```
4. Say: **"Hey Siri, ask my Mega Brain"**

## 💬 Text Message Integration

### Setup with Twilio
1. Create Twilio account: https://twilio.com
2. Get a phone number
3. Set webhook URL: `https://calebnewton.me/api/brain/poke`
4. Text your Twilio number: **"brain what am I working on?"**

### Message Formats
- `brain [question]` → Ask a question
- `do [command]` → Execute a command
- Any text → Treated as question

## 🔍 Access from Any Claude Window

### Method 1: Direct URL
```markdown
Please fetch and summarize:
https://calebnewton.me/api/brain/ask?q=what+is+my+current+focus
```

### Method 2: Context Fetch (Future)
```markdown
Please load my context from:
https://calebnewton.me/api/context/all/files

Then answer: What am I working on?
```

## 🛠️ Troubleshooting

### "Error: Missing API key"
→ Set `ANTHROPIC_API_KEY` in Vercel dashboard (Settings → Environment Variables)

### "Error: Context files not found"
→ Ensure `/context-data/` directory is committed to git and deployed

### CORS errors
→ Already configured in `vercel.json` (no action needed)

### Function timeout
→ Functions have 30 second timeout (configured in `vercel.json`)

## 📊 Monitor Usage

### View Logs
```bash
vercel logs
```

### Check Function Stats
1. Go to Vercel dashboard
2. Select `personal-website`
3. Click **Functions** tab
4. View metrics for `/api/brain/*`

## 🔐 Security Notes

- **No authentication required** (allows any Claude window to access)
- API key is stored securely in Vercel environment variables
- Never commit `ANTHROPIC_API_KEY` to git
- Consider adding rate limiting for production use

## 💰 Cost Estimate

**Vercel**: Free (100GB bandwidth, unlimited functions)
**Claude API**: ~$0.015 per request
- 2000 input tokens + 500 output tokens
- With Claude Sonnet 4

**Monthly estimate for 100 requests**: ~$1.50

## 📝 What's Deployed

```
/api/brain/ask.js    → Question answering with full context
/api/brain/do.js     → Command execution
/api/brain/poke.js   → SMS/webhook integration
/context-data/       → All context files (WHO_IS_CALEB.md, etc.)
/build/              → React frontend
```

## 🎯 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test endpoints
3. ⬜ Set up iPhone Siri shortcut
4. ⬜ Configure Twilio for SMS
5. ⬜ Add to other Claude windows
6. ⬜ Set up Mac → Cloud sync automation

## 🆘 Need Help?

Check the full deployment guide:
```bash
cat DEPLOYMENT.md
```

Or view logs:
```bash
vercel logs --follow
```

---

**Status**: Ready to deploy
**Last Updated**: January 22, 2026
