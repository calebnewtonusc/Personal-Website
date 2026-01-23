/**
 * DASHBOARD UPDATE API
 *
 * Receives dashboard updates from local Mac agents
 * Endpoint: POST /api/dashboard/update
 */

const fs = require('fs');
const path = require('path');

// Dashboard password
const DASHBOARD_PASSWORD = 'Jesusisgoated123';

// Store dashboard data in memory (or use database)
let dashboardData = {
  lastUpdate: null,
  agents: [],
  learnings: [],
  events: [],
  systemHealth: {}
};

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    const { password, data } = req.body;

    // Verify password
    if (password !== DASHBOARD_PASSWORD) {
      return res.status(403).json({
        error: 'Unauthorized',
        message: 'Invalid password'
      });
    }

    // Update dashboard data
    dashboardData = {
      lastUpdate: new Date().toISOString(),
      ...data
    };

    // Save to context-data (optional, for persistence)
    try {
      const contextDataPath = path.join(process.cwd(), 'context-data', 'dashboard-status.json');
      fs.writeFileSync(contextDataPath, JSON.stringify(dashboardData, null, 2));
    } catch (err) {
      console.warn('[Dashboard] Could not save to context-data:', err.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Dashboard updated successfully',
      timestamp: dashboardData.lastUpdate
    });

  } catch (error) {
    console.error('[Dashboard] Update error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
