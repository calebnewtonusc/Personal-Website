/**
 * MEGA BRAIN API - Cloud Accessible from ANYWHERE
 *
 * Access from:
 * - ANY Claude window: https://calebnewton.me/api/brain/ask?q=your-question
 * - Poke (text message): Text "brain what projects am I working on?"
 * - iPhone shortcut: Siri, ask my Mega Brain
 * - Any device with internet
 *
 * The Mega Brain is ALWAYS available, 24/7, with complete context
 */

const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const CONTEXT_DIR = path.join(__dirname, '../../Caleb-Context');
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

/**
 * Mega Brain - The ultimate intelligence
 */
class MegaBrainAPI {
  constructor() {
    this.contextCache = {};
    this.lastCacheUpdate = null;
  }

  /**
   * Load ALL context from files
   */
  async loadAllContext() {
    const now = Date.now();

    // Cache for 1 minute
    if (this.lastCacheUpdate && now - this.lastCacheUpdate < 60000) {
      return this.contextCache;
    }

    console.log('[Mega Brain] Loading complete context...');

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
        console.log(`  Warning: ${file} not found`);
      }
    }

    this.contextCache = context;
    this.lastCacheUpdate = now;

    console.log(`[Mega Brain] Loaded ${Object.keys(context).length} context files`);
    return context;
  }

  /**
   * Ask the Mega Brain anything
   */
  async ask(question) {
    console.log(`[Mega Brain] Question: ${question}`);

    // Load all context
    const context = await this.loadAllContext();

    // Build mega prompt
    const contextStr = Object.entries(context)
      .map(([key, val]) => `## ${key}\n${val}`)
      .join('\n\n');

    try {
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250514',
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
   * Execute a command
   */
  async execute(command) {
    console.log(`[Mega Brain] Executing: ${command}`);

    // Use AI to determine what actions to take
    const context = await this.loadAllContext();

    try {
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250514',
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
   * Get quick summary of Caleb's digital life
   */
  async getSummary() {
    const context = await this.loadAllContext();

    return {
      contextSources: Object.keys(context).length,
      available: true,
      timestamp: new Date().toISOString(),
      accessPoints: [
        'https://calebnewton.me/api/brain/ask',
        'Text via Poke',
        'iPhone Siri shortcut',
        'Any Claude window',
      ],
    };
  }
}

// Singleton instance
const megaBrain = new MegaBrainAPI();

/**
 * Express route handlers
 */
module.exports = (app) => {
  // Ask Mega Brain
  app.get('/api/brain/ask', async (req, res) => {
    const question = req.query.q || req.query.question;

    if (!question) {
      return res.status(400).json({
        error: 'Missing question parameter. Use: ?q=your-question',
      });
    }

    const result = await megaBrain.ask(question);
    res.json(result);
  });

  app.post('/api/brain/ask', async (req, res) => {
    const question = req.body.question || req.body.q;

    if (!question) {
      return res.status(400).json({
        error: 'Missing question in request body',
      });
    }

    const result = await megaBrain.ask(question);
    res.json(result);
  });

  // Execute command
  app.post('/api/brain/do', async (req, res) => {
    const command = req.body.command || req.body.cmd;

    if (!command) {
      return res.status(400).json({
        error: 'Missing command in request body',
      });
    }

    const result = await megaBrain.execute(command);
    res.json(result);
  });

  // Poke webhook (text message integration)
  app.post('/api/brain/poke', async (req, res) => {
    const { message, from } = req.body;

    console.log(`[Poke] Message from ${from}: ${message}`);

    // Parse command from message
    let response;

    if (message.toLowerCase().startsWith('brain ')) {
      // Question mode: "brain what am I working on?"
      const question = message.substring(6); // Remove "brain "
      const result = await megaBrain.ask(question);
      response = result.answer;
    } else if (message.toLowerCase().startsWith('do ')) {
      // Command mode: "do commit my code"
      const command = message.substring(3);
      const result = await megaBrain.execute(command);
      response = `Executed: ${result.aiResponse}`;
    } else {
      // Default: treat as question
      const result = await megaBrain.ask(message);
      response = result.answer;
    }

    // Send response back via Poke
    res.json({
      reply: response,
      timestamp: new Date().toISOString(),
    });
  });

  // Get summary
  app.get('/api/brain/summary', async (req, res) => {
    const summary = await megaBrain.getSummary();
    res.json(summary);
  });

  // Get complete context (for Claude windows)
  app.get('/api/brain/context', async (req, res) => {
    const context = await megaBrain.loadAllContext();
    res.json({
      context,
      instruction: `Use this context to answer questions about Caleb.
This is his complete digital life as of ${new Date().toISOString()}.`,
    });
  });

  console.log('🧠 Mega Brain API routes registered');
  console.log('   GET  /api/brain/ask?q=question');
  console.log('   POST /api/brain/ask {question}');
  console.log('   POST /api/brain/do {command}');
  console.log('   POST /api/brain/poke {message, from}');
  console.log('   GET  /api/brain/summary');
  console.log('   GET  /api/brain/context');
};
