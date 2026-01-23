/**
 * Vercel Serverless Function: /api/brain/do
 * Mega Brain - Execute commands
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
 * Execute a command
 */
async function executeCommand(command) {
  console.log(`[Mega Brain] Executing: ${command}`);

  const context = await loadAllContext();

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: `You are Caleb's autonomous AI assistant that can execute commands.

User command: ${command}

Based on this command, determine what actions should be taken.
Return a JSON response with:
{
  "understood": "what you understood from the command",
  "actions": ["list of actions to take"],
  "result": "expected result"
}`,
        },
      ],
    });

    const response = message.content[0].text;

    return {
      command,
      aiResponse: response,
      executed: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      command,
      error: error.message,
      executed: false,
    };
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
    const command = req.body.command || req.body.cmd;

    if (!command) {
      return res.status(400).json({
        error: 'Missing command in request body',
      });
    }

    const result = await executeCommand(command);
    return res.status(200).json(result);
  } catch (error) {
    console.error('[API Error]', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
};
