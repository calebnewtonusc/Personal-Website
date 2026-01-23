/**
 * Cloud Context Storage API
 * Stores ALL context on Vercel - runs 24/7 independent of Mac
 */

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const router = express.Router();

// Context storage directory (persisted on Vercel using Vercel KV or filesystem)
const CONTEXT_DIR = path.join(__dirname, '../context-data');

// Ensure context directory exists
(async () => {
  try {
    await fs.mkdir(CONTEXT_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating context directory:', error);
  }
})();

// ==================== STORAGE ENDPOINTS ====================

/**
 * GET /api/context/:filename
 * Retrieve any context file
 */
router.get('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(CONTEXT_DIR, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    res.json({ filename, content, lastModified: (await fs.stat(filePath)).mtime });
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

/**
 * POST /api/context/:filename
 * Update or create context file
 */
router.post('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { content, append = false } = req.body;

    const filePath = path.join(CONTEXT_DIR, filename);

    if (append) {
      const existing = await fs.readFile(filePath, 'utf-8').catch(() => '');
      await fs.writeFile(filePath, existing + '\n\n' + content);
    } else {
      await fs.writeFile(filePath, content);
    }

    res.json({ success: true, filename, updated: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/context/all
 * Get all context files
 */
router.get('/all/files', async (req, res) => {
  try {
    const files = await fs.readdir(CONTEXT_DIR);
    const contexts = {};

    for (const file of files) {
      if (file.endsWith('.md') || file.endsWith('.json')) {
        const content = await fs.readFile(path.join(CONTEXT_DIR, file), 'utf-8');
        contexts[file] = content;
      }
    }

    res.json({ contexts, totalFiles: Object.keys(contexts).length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/context/summary
 * Get concise summary of all context
 */
router.get('/summary/all', async (req, res) => {
  try {
    const files = await fs.readdir(CONTEXT_DIR);
    const summary = {};

    for (const file of files) {
      const stats = await fs.stat(path.join(CONTEXT_DIR, file));
      summary[file] = {
        size: stats.size,
        lastModified: stats.mtime,
        sizeKB: (stats.size / 1024).toFixed(2)
      };
    }

    res.json({ summary, totalFiles: Object.keys(summary).length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== WEBHOOK ENDPOINTS ====================

/**
 * POST /api/context/webhook/chrome
 * Receive Chrome data from Make.com/Zapier
 */
router.post('/webhook/chrome', async (req, res) => {
  try {
    const { url, title, timestamp } = req.body;

    const entry = `## ${timestamp}\n**${title}**\n${url}\n\n`;
    await appendToContext('CHROME_CONTEXT.md', entry);

    res.json({ success: true, message: 'Chrome data stored' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/context/webhook/gmail
 * Receive Gmail data from Make.com/Zapier
 */
router.post('/webhook/gmail', async (req, res) => {
  try {
    const { from, subject, timestamp, account } = req.body;

    const entry = `## ${timestamp} (${account})\n**From:** ${from}\n**Subject:** ${subject}\n\n`;
    await appendToContext('EMAIL_CONTEXT.md', entry);

    res.json({ success: true, message: 'Gmail data stored' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/context/webhook/todoist
 * Receive Todoist updates
 */
router.post('/webhook/todoist', async (req, res) => {
  try {
    const { content, completed, project, timestamp } = req.body;

    const entry = `## ${timestamp}\n**Task:** ${content}\n**Status:** ${completed ? '✅' : '⏳'}\n**Project:** ${project}\n\n`;
    await appendToContext('TODOIST_CONTEXT.md', entry);

    res.json({ success: true, message: 'Todoist data stored' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/context/webhook/calendar
 * Receive calendar events
 */
router.post('/webhook/calendar', async (req, res) => {
  try {
    const { summary, start, end, location, account } = req.body;

    const entry = `## ${start} (${account})\n**Event:** ${summary}\n**Time:** ${start} - ${end}\n${location ? `**Location:** ${location}` : ''}\n\n`;
    await appendToContext('CALENDAR_CONTEXT.md', entry);

    res.json({ success: true, message: 'Calendar data stored' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/context/webhook/github
 * Receive GitHub activity
 */
router.post('/webhook/github', async (req, res) => {
  try {
    const { repo, action, timestamp } = req.body;

    const entry = `## ${timestamp}\n**Repo:** ${repo}\n**Action:** ${action}\n\n`;
    await appendToContext('GITHUB_CONTEXT.md', entry);

    res.json({ success: true, message: 'GitHub data stored' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/context/webhook/generic
 * Generic webhook for any data source
 */
router.post('/webhook/generic', async (req, res) => {
  try {
    const { source, data, timestamp } = req.body;

    const filename = `${source.toUpperCase()}_CONTEXT.md`;
    const entry = `## ${timestamp}\n${JSON.stringify(data, null, 2)}\n\n`;

    await appendToContext(filename, entry);

    res.json({ success: true, message: `${source} data stored` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== HELPER FUNCTIONS ====================

async function appendToContext(filename, content) {
  const filePath = path.join(CONTEXT_DIR, filename);
  try {
    const existing = await fs.readFile(filePath, 'utf-8');
    await fs.writeFile(filePath, existing + content);
  } catch (error) {
    // File doesn't exist, create it
    await fs.writeFile(filePath, `# ${filename}\n\nLast updated: ${new Date().toISOString()}\n\n---\n\n${content}`);
  }
}

// ==================== SYNC FROM MAC ====================

/**
 * POST /api/context/sync/mac
 * Receive bulk update from Mac agents
 */
router.post('/sync/mac', async (req, res) => {
  try {
    const { files } = req.body; // { filename: content }

    const results = [];
    for (const [filename, content] of Object.entries(files)) {
      await fs.writeFile(path.join(CONTEXT_DIR, filename), content);
      results.push({ filename, status: 'updated' });
    }

    res.json({ success: true, updated: results.length, files: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
