# Mega Brain Deployment Guide

## Overview
This deployment integrates the Mega Brain API into the Personal Website and deploys it to Vercel for 24/7 cloud operation.

## Architecture

### Frontend
- React app with Glassmorphic UI
- Deployed to Vercel CDN
- Custom domain: calebnewton.me

### Backend API (Serverless Functions)
- **Location**: `/api/brain/`
- **Runtime**: Node.js (Vercel Serverless)
- **Dependencies**: @anthropic-ai/sdk

## API Endpoints

### 1. Ask Mega Brain
**Endpoint**: `https://calebnewton.me/api/brain/ask`

**Methods**: GET, POST

**GET Request**:
```bash
curl "https://calebnewton.me/api/brain/ask?q=What+projects+am+I+working+on"
```

**POST Request**:
```bash
curl -X POST https://calebnewton.me/api/brain/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What projects am I working on?"}'
```

**Response**:
```json
{
  "question": "What projects am I working on?",
  "answer": "Based on your context...",
  "timestamp": "2026-01-22T...",
  "contextUsed": ["WHO_IS_CALEB", "CHROME_CONTEXT", ...]
}
```

### 2. Execute Command
**Endpoint**: `https://calebnewton.me/api/brain/do`

**Method**: POST

**Request**:
```bash
curl -X POST https://calebnewton.me/api/brain/do \
  -H "Content-Type: application/json" \
  -d '{"command": "commit my code"}'
```

**Response**:
```json
{
  "command": "commit my code",
  "aiResponse": "I understand you want to...",
  "executed": true,
  "timestamp": "2026-01-22T..."
}
```

### 3. Poke Webhook (SMS Integration)
**Endpoint**: `https://calebnewton.me/api/brain/poke`

**Method**: POST

**Request** (from SMS gateway):
```bash
curl -X POST https://calebnewton.me/api/brain/poke \
  -H "Content-Type: application/json" \
  -d '{"message": "brain what am I working on?", "from": "+1234567890"}'
```

**Message Formats**:
- `brain [question]` - Ask a question
- `do [command]` - Execute a command
- Any other text - Treated as a question

**Response**:
```json
{
  "reply": "Brief answer for SMS...",
  "timestamp": "2026-01-22T..."
}
```

## Environment Variables

### Required in Vercel Dashboard

1. **ANTHROPIC_API_KEY** (Required)
   - Your Claude API key
   - Get from: https://console.anthropic.com/
   - Example: `sk-ant-api03-...`

2. **SYNC_TOKEN** (Optional, for Mac sync)
   - Token for Mac agents to sync context files
   - Set to any secure random string
   - Example: `mac-sync-token-secure-12345`

### Setting Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Select the `personal-website` project
3. Go to **Settings** → **Environment Variables**
4. Add the following:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your API key
   - Environments: Production, Preview, Development

## Deployment Steps

### Initial Deployment

1. **Login to Vercel**:
```bash
cd "/Users/joelnewton/Desktop/2026 Code/Big-Projects/Personal-Website"
vercel login
```

2. **Link project** (first time only):
```bash
vercel link
```
   - Select your team/account
   - Link to existing project or create new
   - Project name: `personal-website`

3. **Deploy to production**:
```bash
vercel --prod
```

### Subsequent Deployments

```bash
cd "/Users/joelnewton/Desktop/2026 Code/Big-Projects/Personal-Website"
vercel --prod
```

## Testing Endpoints

### Test Ask Endpoint
```bash
# GET request
curl "https://calebnewton.me/api/brain/ask?q=hello"

# POST request
curl -X POST https://calebnewton.me/api/brain/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is my name?"}'
```

### Test Do Endpoint
```bash
curl -X POST https://calebnewton.me/api/brain/do \
  -H "Content-Type: application/json" \
  -d '{"command": "test command"}'
```

### Test Poke Endpoint
```bash
curl -X POST https://calebnewton.me/api/brain/poke \
  -H "Content-Type: application/json" \
  -d '{"message": "brain test", "from": "test"}'
```

## Context Files

The API reads from `/context-data/` directory:
- WHO_IS_CALEB.md
- CHROME_CONTEXT.md
- TERMINAL_CONTEXT.md
- VSCODE_CONTEXT.md
- PHOTOS_CONTEXT.md
- NOTES_CONTEXT.md
- ALL_APPS_CONTEXT.md
- IMESSAGE_CONTEXT.md
- EMAIL_CONTEXT.md
- KEYCHAIN_CONTEXT.md

These files should be synced from your Mac using the cloud-sync agent.

## Integration with Other Services

### iPhone Shortcuts
1. Create a new shortcut
2. Add "Get contents of URL" action
3. URL: `https://calebnewton.me/api/brain/ask?q={prompt}`
4. Method: GET
5. Show result

### Zapier/Make.com
Connect the `/api/brain/poke` endpoint as a webhook to:
- Text messages (Twilio)
- Slack messages
- Email triggers
- Calendar events

### Claude Desktop/Web
Use as a custom MCP server or simply fetch context:
```bash
curl https://calebnewton.me/api/context/all/files
```

## Monitoring

### Check Deployment Status
```bash
vercel ls
```

### View Logs
```bash
vercel logs [deployment-url]
```

### Check Function Performance
- Go to Vercel Dashboard
- Select project
- View **Functions** tab for metrics

## Troubleshooting

### API returns 500 error
- Check environment variables are set in Vercel
- Verify ANTHROPIC_API_KEY is valid
- Check function logs: `vercel logs`

### Context files not found
- Ensure `/context-data/` directory exists in repo
- Verify files are committed to git
- Check file permissions

### CORS errors
- CORS headers are set in vercel.json
- For additional origins, update headers in vercel.json

## Security Notes

1. **No authentication required** for Mega Brain endpoints
   - This allows Claude windows to access without auth
   - Consider adding rate limiting if needed

2. **API key security**
   - Never commit ANTHROPIC_API_KEY to git
   - Use Vercel environment variables only
   - Rotate keys if compromised

3. **Poke webhook**
   - Consider adding webhook signature verification
   - Validate incoming phone numbers
   - Add rate limiting for SMS endpoints

## Cost Considerations

- **Vercel**: Free tier includes 100GB bandwidth, unlimited serverless function invocations
- **Anthropic API**: Pay per token used
  - Average request: ~2000 tokens input + 500 tokens output
  - Cost: ~$0.015 per request with Claude Sonnet 4

## Next Steps

1. Deploy to production: `vercel --prod`
2. Set environment variables in Vercel dashboard
3. Test all three endpoints
4. Set up iPhone shortcuts
5. Configure Poke SMS integration
6. Set up Mac → Cloud sync agent

## Support

For issues or questions:
- Check Vercel logs: `vercel logs`
- Review function source: `/api/brain/*.js`
- Test locally: `vercel dev`

---

**Last Updated**: January 22, 2026
**Status**: Ready for deployment
