/**
 * Vercel Serverless Function: /api/brain/ask
 * Mega Brain - Ask questions with full context
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs').promises;
const path = require('path');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Context directory (relative to project root)
const CONTEXT_DIR = path.join(process.cwd(), 'context-data');

/**
 * Load all context files
 */
async function loadAllContext() {
  const contextFiles = [
    'WHO_IS_CALEB.md',
    'CHROME_CONTEXT.md',
    'TERMINAL_CONTEXT.md',
    'VSCODE_CONTEXT.md',
    'PHOTOS_CONTEXT.md',
    'NOTES_CONTEXT.md',
    'ALL_APPS_CONTEXT.md',
    'IMESSAGE_CONTEXT.md',
    'EMAIL_CONTEXT.md',
    'KEYCHAIN_CONTEXT.md',
  ];

  const context = {};

  for (const file of contextFiles) {
    try {
      const content = await fs.readFile(
        path.join(CONTEXT_DIR, file),
        'utf-8'
      );
      const key = file.replace('_CONTEXT.md', '').replace('.md', '');
      context[key] = content.substring(0, 3000); // First 3K chars
    } catch (err) {
      console.log(`Warning: ${file} not found`);
    }
  }

  return context;
}

/**
 * Ask the Mega Brain
 */
async function askMegaBrain(question) {
  console.log(`[Mega Brain] Question: ${question}`);

  const context = await loadAllContext();

  const contextStr = Object.entries(context)
    .map(([key, val]) => `## ${key}\n${val}`)
    .join('\n\n');

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `You are Caleb's Mega Brain - an AI with COMPLETE knowledge of his entire digital life.

=== COMPLETE CONTEXT ABOUT CALEB ===
${contextStr}

=== USER QUESTION ===
${question}

Answer using the context above. Be specific, cite sources from the context, and provide actionable insights.`,
        },
      ],
    });

    const answer = message.content[0].text;
    console.log(`[Mega Brain] Generated answer (${answer.length} chars)`);

    return {
      question,
      answer,
      timestamp: new Date().toISOString(),
      contextUsed: Object.keys(context),
    };
  } catch (error) {
    console.error('[Mega Brain] Error:', error);
    return {
      question,
      answer: `Error: ${error.message}`,
      error: true,
    };
  }
}

/**
 * Vercel serverless handler
 */
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let question;

    if (req.method === 'GET') {
      question = req.query.q || req.query.question;
    } else if (req.method === 'POST') {
      question = req.body.question || req.body.q;
    }

    if (!question) {
      return res.status(400).json({
        error: 'Missing question parameter. Use: ?q=your-question',
      });
    }

    const result = await askMegaBrain(question);
    return res.status(200).json(result);
  } catch (error) {
    console.error('[API Error]', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
};
