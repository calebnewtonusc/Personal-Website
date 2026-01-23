/**
 * CLOUD AGENT: Mega Brain Command API
 * 
 * Accepts commands and queues them for execution
 */

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { command, params } = req.body;
    
    if (!command) {
      return res.status(400).json({ error: 'Command required' });
    }

    // Queue command for local agent to pick up
    const commandsPath = path.join(process.cwd(), 'context-data', 'command-queue.json');
    
    let queue = [];
    if (fs.existsSync(commandsPath)) {
      queue = JSON.parse(fs.readFileSync(commandsPath, 'utf-8'));
    }
    
    queue.push({
      id: Date.now(),
      command,
      params,
      timestamp: new Date().toISOString(),
      status: 'queued'
    });
    
    fs.writeFileSync(commandsPath, JSON.stringify(queue, null, 2));
    
    return res.status(200).json({
      success: true,
      message: 'Command queued',
      command_id: queue[queue.length - 1].id
    });

  } catch (error) {
    console.error('[Cloud Agent] Command error:', error);
    return res.status(500).json({
      error: 'Internal error',
      message: error.message
    });
  }
};
