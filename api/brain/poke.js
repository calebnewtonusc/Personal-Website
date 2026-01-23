/**
 * Vercel Serverless Function: /api/brain/poke
 * Mega Brain - SMS/Text message integration webhook
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs').promises;
const path = require('path');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Context directory
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
  ];

  const context = {};

  for (const file of contextFiles) {
    try {
      const content = await fs.readFile(
        path.join(CONTEXT_DIR, file),
        'utf-8'
      );
      const key = file.replace('_CONTEXT.md', '').replace('.md', '');
      context[key] = content.substring(0, 2000);
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
  const context = await loadAllContext();

  const contextStr = Object.entries(context)
    .map(([key, val]) => `## ${key}\n${val}`)
    .join('\n\n');

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `You are Caleb's Mega Brain - an AI with knowledge of his digital life.

=== CONTEXT ===
${contextStr}

=== QUESTION ===
${question}

Answer briefly and concisely (this is for text message, keep it short).`,
        },
      ],
    });

    return message.content[0].text;
  } catch (error) {
    console.error('[Mega Brain] Error:', error);
    return `Error: ${error.message}`;
  }
}

/**
 * Execute command
 */
async function executeCommand(command) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: `You are Caleb's AI assistant. Execute: ${command}

Respond with what you would do (briefly, for text message).`,
        },
      ],
    });

    return message.content[0].text;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

/**
 * Vercel serverless handler
 */
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { message, from } = req.body;

    console.log(`[Poke] Message from ${from}: ${message}`);

    let response;

    if (message.toLowerCase().startsWith('brain ')) {
      // Question mode: "brain what am I working on?"
      const question = message.substring(6);
      response = await askMegaBrain(question);
    } else if (message.toLowerCase().startsWith('do ')) {
      // Command mode: "do commit my code"
      const command = message.substring(3);
      response = await executeCommand(command);
    } else {
      // Default: treat as question
      response = await askMegaBrain(message);
    }

    return res.status(200).json({
      reply: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API Error]', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
};
