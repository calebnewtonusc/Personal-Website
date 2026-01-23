/**
 * CLOUD → LOCAL DELEGATION API
 *
 * Cloud agents use this to delegate tasks to local agents.
 * When cloud needs something that requires local computer access (OAuth, credentials, etc.),
 * it creates a delegation that local agents pick up and execute.
 */

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const delegationsPath = path.join(process.cwd(), 'context-data', 'delegations.json');
  const reportsPath = path.join(process.cwd(), 'context-data', 'delegation-reports');

  try {
    if (req.method === 'POST') {
      const { action, task } = req.body;

      if (action === 'delegate') {
        // Cloud agent creating a delegation
        const taskId = `delegation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const delegation = {
          id: taskId,
          ...task,
          delegated_at: new Date().toISOString(),
          delegated_by: 'cloud',
          status: 'pending'
        };

        // Save delegation
        let delegations = [];
        if (fs.existsSync(delegationsPath)) {
          delegations = JSON.parse(fs.readFileSync(delegationsPath, 'utf-8'));
        }

        delegations.push(delegation);

        const contextDir = path.join(process.cwd(), 'context-data');
        if (!fs.existsSync(contextDir)) {
          fs.mkdirSync(contextDir, { recursive: true });
        }

        fs.writeFileSync(delegationsPath, JSON.stringify(delegations, null, 2));

        return res.status(200).json({
          success: true,
          delegation_id: taskId,
          message: 'Task delegated to local agents',
          estimated_pickup: '< 30 seconds'
        });

      } else if (action === 'check_status') {
        // Check delegation status
        const { delegation_id } = req.body;

        // Check if report exists
        const reportFile = path.join(reportsPath, `${delegation_id}.json`);
        if (fs.existsSync(reportFile)) {
          const report = JSON.parse(fs.readFileSync(reportFile, 'utf-8'));
          return res.status(200).json({
            success: true,
            status: report.status || 'completed',
            result: report.result,
            completed_at: report.completed_at
          });
        } else {
          // Check if still pending
          if (fs.existsSync(delegationsPath)) {
            const delegations = JSON.parse(fs.readFileSync(delegationsPath, 'utf-8'));
            const delegation = delegations.find(d => d.id === delegation_id);

            if (delegation) {
              return res.status(200).json({
                success: true,
                status: delegation.status || 'pending',
                message: 'Task still being processed by local agents'
              });
            }
          }

          return res.status(404).json({
            success: false,
            error: 'Delegation not found'
          });
        }
      } else if (action === 'receive_report') {
        // Local agent reporting back
        const { delegation_id, result } = req.body;

        if (!fs.existsSync(reportsPath)) {
          fs.mkdirSync(reportsPath, { recursive: true });
        }

        const report = {
          delegation_id,
          result,
          reported_at: new Date().toISOString()
        };

        fs.writeFileSync(
          path.join(reportsPath, `${delegation_id}.json`),
          JSON.stringify(report, null, 2)
        );

        return res.status(200).json({
          success: true,
          message: 'Report received from local agent'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: 'Unknown action'
        });
      }

    } else if (req.method === 'GET') {
      // Get pending delegations (for local agents to poll)
      if (fs.existsSync(delegationsPath)) {
        const delegations = JSON.parse(fs.readFileSync(delegationsPath, 'utf-8'));
        const pending = delegations.filter(d => d.status === 'pending');

        return res.status(200).json({
          success: true,
          pending_count: pending.length,
          delegations: pending
        });
      } else {
        return res.status(200).json({
          success: true,
          pending_count: 0,
          delegations: []
        });
      }
    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('Delegation error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
