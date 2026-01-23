/**
 * Backend API Server for Context Sync System
 * Handles authentication, sync status, Claude integration, and context updates
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const Anthropic = require('@anthropic-ai/sdk');

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3001;

// Configuration
const ADMIN_PASSWORD = 'Jesusisgoated123';
const CONTEXT_DIR = path.join(__dirname, '../../Caleb-Context');
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

// Initialize Claude
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Simple session storage (in production, use Redis or a proper session store)
const sessions = new Map();

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Generate simple token (in production, use JWT)
  const token = Math.random().toString(36).substring(7) + Date.now().toString(36);
  sessions.set(token, { createdAt: Date.now() });

  res.json({ token, message: 'Authenticated successfully' });
});

// Logout
app.post('/api/admin/logout', authenticate, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  sessions.delete(token);
  res.json({ message: 'Logged out successfully' });
});

// ==================== SYNC STATUS ROUTES ====================

// Get sync status for all data sources
app.get('/api/admin/sync-status', authenticate, async (req, res) => {
  try {
    const sources = [
      { name: 'Chrome', file: 'CHROME_CONTEXT.md', script: 'extract-chrome-context.py' },
      { name: 'Terminal', file: 'TERMINAL_CONTEXT.md', script: 'extract-terminal-context.py' },
      { name: 'VS Code', file: 'VSCODE_CONTEXT.md', script: 'extract-vscode-context.py' },
      { name: 'iMessage', file: 'IMESSAGE_CONTEXT.md', script: 'imessage-kit/extract-context.ts' },
      { name: 'Notes', file: 'NOTES_CONTEXT.md', script: 'extract-notes-context.py' },
      { name: 'Keychain', file: 'KEYCHAIN_CONTEXT.md', script: 'extract-keychain-context.py' },
      { name: 'Photos', file: 'PHOTOS_CONTEXT.md', script: 'extract-photos-context-v2.py' },
      { name: 'Gmail (Personal)', file: 'GMAIL_CONTEXT.md', script: 'extract-gmail-context.py', account: 'personal' },
      { name: 'Gmail (USC)', file: 'GMAIL_CONTEXT.md', script: 'extract-gmail-context.py', account: 'usc' },
      { name: 'Calendar (Personal)', file: 'CALENDAR_CONTEXT.md', script: 'extract-calendar-context.py', account: 'personal' },
      { name: 'Calendar (USC)', file: 'CALENDAR_CONTEXT.md', script: 'extract-calendar-context.py', account: 'usc' },
      { name: 'Todoist', file: 'TODOIST_CONTEXT.md', script: 'extract-todoist-context.py' },
      { name: 'Contacts', file: 'CONTACTS_CONTEXT.md', script: 'extract-contacts-context.py' },
      { name: 'ChatGPT', file: 'CHATGPT_CONTEXT.md', script: 'extract-chatgpt-context.py' }
    ];

    const statuses = await Promise.all(sources.map(async (source) => {
      const filePath = path.join(CONTEXT_DIR, source.file);

      try {
        const stats = await fs.stat(filePath);
        const lastModified = stats.mtime;
        const size = stats.size;

        // Check if file was modified in last hour (active)
        const hourAgo = Date.now() - (60 * 60 * 1000);
        const isActive = stats.mtime.getTime() > hourAgo;

        return {
          name: source.name,
          status: 'active',
          lastSync: lastModified.toISOString(),
          size: formatBytes(size),
          isActive,
          file: source.file
        };
      } catch (error) {
        return {
          name: source.name,
          status: 'not_configured',
          lastSync: null,
          size: 0,
          isActive: false,
          file: source.file
        };
      }
    }));

    // Check if monitor is running
    let monitorStatus = 'stopped';
    try {
      const { stdout } = await execAsync('ps aux | grep "real-time-monitor.py" | grep -v grep');
      monitorStatus = stdout.trim() ? 'running' : 'stopped';
    } catch {
      monitorStatus = 'stopped';
    }

    res.json({
      sources: statuses,
      monitor: {
        status: monitorStatus,
        lastCheck: new Date().toISOString()
      },
      summary: {
        total: sources.length,
        active: statuses.filter(s => s.status === 'active').length,
        inactive: statuses.filter(s => s.status === 'not_configured').length
      }
    });
  } catch (error) {
    console.error('Error getting sync status:', error);
    res.status(500).json({ error: 'Failed to get sync status' });
  }
});

// Get specific context file content
app.get('/api/admin/context/:filename', authenticate, async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(CONTEXT_DIR, filename);

    const content = await fs.readFile(filePath, 'utf-8');
    res.json({ filename, content });
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

// ==================== CLAUDE CHAT ROUTES ====================

// Chat with Claude
app.post('/api/admin/chat', authenticate, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'Claude API key not configured' });
    }

    // Build messages array
    const messages = [
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: `You are an admin assistant for Caleb Newton's personal context management system.
      You help manage and update context files about Caleb's digital life.

      Available context files:
      - WHO_IS_CALEB.md
      - PERSONAL_STORIES_AND_EXPERIENCES.md
      - AINATECH_EXPERIENCE_AND_LEARNING.md
      - VALUES_AND_PHILOSOPHY.md
      - And 15+ automated context files

      You can help with:
      - Viewing sync status
      - Understanding context data
      - Making updates to files
      - Answering questions about the system`,
      messages
    });

    const assistantMessage = response.content[0].type === 'text' ? response.content[0].text : '';

    res.json({
      message: assistantMessage,
      conversationHistory: [
        ...messages,
        { role: 'assistant', content: assistantMessage }
      ]
    });
  } catch (error) {
    console.error('Claude API error:', error);
    res.status(500).json({ error: 'Failed to chat with Claude' });
  }
});

// ==================== CONTEXT UPDATE ROUTES ====================

// Update context via text command
app.post('/api/admin/update-context', authenticate, async (req, res) => {
  try {
    const { text } = req.body;

    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'Claude API key not configured' });
    }

    // Use Claude to parse the update command
    const parsePrompt = `You are a context management assistant. Parse this update command and return JSON.

User update: "${text}"

Available context files:
- WHO_IS_CALEB.md - Technical profile, skills, goals, projects
- PERSONAL_STORIES_AND_EXPERIENCES.md - Life experiences, stories, achievements
- AINATECH_EXPERIENCE_AND_LEARNING.md - AINATECH work, modules, projects
- VALUES_AND_PHILOSOPHY.md - Core values, beliefs, mission

Return JSON with:
{
    "action": "append",
    "file": "filename.md",
    "content": "markdown to add",
    "section": "section name (if applicable)"
}

Return ONLY valid JSON, nothing else.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: parsePrompt }]
    });

    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(400).json({ error: 'Could not understand update command' });
    }

    const instruction = JSON.parse(jsonMatch[0]);
    const filePath = path.join(CONTEXT_DIR, instruction.file);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({ error: `File not found: ${instruction.file}` });
    }

    // Read file
    let content = await fs.readFile(filePath, 'utf-8');

    // Add update with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const update = `\n\n### Update (${timestamp})\n\n${instruction.content}\n`;

    // Append update (before "Last updated" line if it exists)
    const lastUpdatedIndex = content.lastIndexOf('Last updated:');
    if (lastUpdatedIndex !== -1) {
      content = content.substring(0, lastUpdatedIndex) + update + '\n' + content.substring(lastUpdatedIndex);
    } else {
      content += update;
    }

    // Write back
    await fs.writeFile(filePath, content, 'utf-8');

    // Git commit and push
    try {
      await execAsync(`cd "${CONTEXT_DIR}" && git add "${instruction.file}" && git commit -m "Update from admin dashboard: ${text.substring(0, 50)}" && git push`);
    } catch (gitError) {
      console.error('Git error:', gitError);
    }

    res.json({
      success: true,
      message: `Updated ${instruction.file}`,
      instruction
    });
  } catch (error) {
    console.error('Update context error:', error);
    res.status(500).json({ error: 'Failed to update context' });
  }
});

// Trigger manual extraction
app.post('/api/admin/extract', authenticate, async (req, res) => {
  try {
    const { source } = req.body;

    const scripts = {
      'chrome': 'python3 extract-chrome-context.py',
      'terminal': 'python3 extract-terminal-context.py',
      'vscode': 'python3 extract-vscode-context.py',
      'notes': 'python3 extract-notes-context.py',
      'photos': 'python3 extract-photos-context-v2.py',
      'keychain': 'python3 extract-keychain-context.py',
      'contacts': 'python3 extract-contacts-context.py',
      'all': './extract-all-context.sh'
    };

    const script = scripts[source];
    if (!script) {
      return res.status(400).json({ error: 'Invalid source' });
    }

    // Run extraction in background
    exec(`cd "${CONTEXT_DIR}" && ${script}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Extraction error for ${source}:`, error);
      }
    });

    res.json({ success: true, message: `Extraction started for ${source}` });
  } catch (error) {
    console.error('Extract error:', error);
    res.status(500).json({ error: 'Failed to start extraction' });
  }
});

// ==================== CLOUD CONTEXT STORAGE ====================
// Context storage directory (persisted on Vercel)
const CLOUD_CONTEXT_DIR = path.join(__dirname, '../context-data');

// Ensure context directory exists
(async () => {
  try {
    await fs.mkdir(CLOUD_CONTEXT_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating cloud context directory:', error);
  }
})();

// GET /api/context/:filename - Retrieve any context file (NO AUTH for Claude access)
app.get('/api/context/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(CLOUD_CONTEXT_DIR, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    const stats = await fs.stat(filePath);
    res.json({ filename, content, lastModified: stats.mtime });
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

// GET /api/context/all/files - Get all context files (NO AUTH for Claude access)
app.get('/api/context/all/files', async (req, res) => {
  try {
    const files = await fs.readdir(CLOUD_CONTEXT_DIR);
    const contexts = {};

    for (const file of files) {
      if (file.endsWith('.md') || file.endsWith('.json')) {
        const content = await fs.readFile(path.join(CLOUD_CONTEXT_DIR, file), 'utf-8');
        contexts[file] = content;
      }
    }

    res.json({ contexts, totalFiles: Object.keys(contexts).length, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/context/sync/mac - Receive bulk update from Mac agents (NO AUTH - token in body)
app.post('/api/context/sync/mac', async (req, res) => {
  try {
    const { files, token } = req.body;

    // Simple token auth for Mac sync
    if (token !== process.env.SYNC_TOKEN && token !== 'mac-sync-token-temp') {
      return res.status(401).json({ error: 'Invalid sync token' });
    }

    const results = [];
    for (const [filename, content] of Object.entries(files)) {
      await fs.writeFile(path.join(CLOUD_CONTEXT_DIR, filename), content);
      results.push({ filename, status: 'updated', timestamp: new Date().toISOString() });
    }

    res.json({ success: true, updated: results.length, files: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoints for Make.com/Zapier automation
app.post('/api/context/webhook/:source', async (req, res) => {
  try {
    const { source } = req.params;
    const data = req.body;
    const timestamp = new Date().toISOString();

    const filename = `${source.toUpperCase()}_CONTEXT.md`;
    const filePath = path.join(CLOUD_CONTEXT_DIR, filename);

    // Format entry based on source
    let entry = `## ${timestamp}\n`;

    switch (source) {
      case 'gmail':
        entry += `**From:** ${data.from}\n**Subject:** ${data.subject}\n${data.account ? `**Account:** ${data.account}\n` : ''}\n`;
        break;
      case 'todoist':
        entry += `**Task:** ${data.content}\n**Status:** ${data.completed ? '✅' : '⏳'}\n**Project:** ${data.project}\n`;
        break;
      case 'calendar':
        entry += `**Event:** ${data.summary}\n**Time:** ${data.start} - ${data.end}\n${data.location ? `**Location:** ${data.location}\n` : ''}`;
        break;
      case 'github':
        entry += `**Repo:** ${data.repo}\n**Action:** ${data.action}\n`;
        break;
      default:
        entry += `${JSON.stringify(data, null, 2)}\n`;
    }
    entry += '\n';

    // Append to file
    try {
      const existing = await fs.readFile(filePath, 'utf-8');
      await fs.writeFile(filePath, existing + entry);
    } catch {
      // File doesn't exist, create it
      const header = `# ${filename}\n\nLast updated: ${timestamp}\n\n---\n\n`;
      await fs.writeFile(filePath, header + entry);
    }

    res.json({ success: true, message: `${source} data stored`, timestamp });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== UTILITY FUNCTIONS ====================

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Admin API server running on port ${PORT}`);
  console.log(`📊 Context directory: ${CONTEXT_DIR}`);
  console.log(`🔐 Authentication: enabled`);
  console.log(`🤖 Claude API: ${ANTHROPIC_API_KEY ? 'configured' : 'not configured'}`);
});

module.exports = app;
