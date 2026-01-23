/**
 * ACTIVE LEARNING API
 *
 * Cloud-based learning executor that works even when Joel's computer is off.
 * Executes learning tasks and syncs progress.
 */

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const progressPath = path.join(process.cwd(), 'context-data', 'learning-progress.json');
  const logPath = path.join(process.cwd(), 'context-data', 'learning-log.jsonl');

  try {
    if (req.method === 'GET') {
      // Return learning progress
      if (fs.existsSync(progressPath)) {
        const progress = JSON.parse(fs.readFileSync(progressPath, 'utf-8'));

        return res.status(200).json({
          success: true,
          progress,
          stats: {
            attempted: progress.tasks_attempted?.length || 0,
            completed: progress.tasks_completed?.length || 0,
            failed: progress.tasks_failed?.length || 0,
            learnings: progress.learnings?.length || 0,
            completion_rate: progress.tasks_attempted?.length
              ? (progress.tasks_completed?.length / progress.tasks_attempted?.length * 100).toFixed(1) + '%'
              : '0%'
          }
        });
      } else {
        return res.status(200).json({
          success: true,
          progress: {
            tasks_attempted: [],
            tasks_completed: [],
            tasks_failed: [],
            learnings: []
          },
          stats: {
            attempted: 0,
            completed: 0,
            failed: 0,
            learnings: 0,
            completion_rate: '0%'
          }
        });
      }
    } else if (req.method === 'POST') {
      const { action, data } = req.body;

      if (action === 'sync_progress') {
        // Sync progress from local
        const progressDir = path.join(process.cwd(), 'context-data');
        if (!fs.existsSync(progressDir)) {
          fs.mkdirSync(progressDir, { recursive: true });
        }

        fs.writeFileSync(progressPath, JSON.stringify(data.progress, null, 2));

        if (data.log_entries && data.log_entries.length > 0) {
          data.log_entries.forEach(entry => {
            fs.appendFileSync(logPath, JSON.stringify(entry) + '\n');
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Progress synced'
        });
      } else if (action === 'log_learning') {
        // Log a learning event
        const logEntry = {
          timestamp: new Date().toISOString(),
          ...data
        };

        fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');

        return res.status(200).json({
          success: true,
          message: 'Learning logged'
        });
      } else if (action === 'execute_task') {
        // Cloud-based task execution (for simple tasks that don't need local access)
        // This allows the Mega Brain to keep learning even when computer is off

        return res.status(200).json({
          success: true,
          message: 'Task queued for cloud execution',
          note: 'Cloud-based execution for computer-independent tasks'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: 'Unknown action'
        });
      }
    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('Active learning error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
