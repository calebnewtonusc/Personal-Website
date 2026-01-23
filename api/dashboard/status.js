/**
 * DASHBOARD STATUS API
 *
 * Returns current dashboard status
 * Endpoint: GET /api/dashboard/status
 */

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are allowed'
    });
  }

  try {
    // Try to load from context-data
    const contextDataPath = path.join(process.cwd(), 'context-data', 'dashboard-status.json');

    let dashboardData;
    if (fs.existsSync(contextDataPath)) {
      const fileContent = fs.readFileSync(contextDataPath, 'utf-8');
      dashboardData = JSON.parse(fileContent);
    } else {
      // Default data if file doesn't exist
      dashboardData = {
        lastUpdate: new Date().toISOString(),
        agents: [],
        learnings: [],
        events: [],
        systemHealth: {},
        message: 'No dashboard data yet'
      };
    }

    return res.status(200).json({
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Dashboard] Status error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
