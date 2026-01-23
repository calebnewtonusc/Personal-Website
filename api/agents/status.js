/**
 * CLOUD AGENT: Mega Brain Status API
 * 
 * Smart cloud agent that provides AI-powered insights
 */

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const statusPath = path.join(process.cwd(), 'context-data', 'dashboard-status.json');
    
    if (fs.existsSync(statusPath)) {
      const status = JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
      
      return res.status(200).json({
        success: true,
        data: status,
        timestamp: new Date().toISOString(),
        source: 'cloud-agent'
      });
    }
    
    return res.status(200).json({
      success: false,
      error: 'No status data available',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Cloud Agent] Error:', error);
    return res.status(500).json({
      error: 'Internal error',
      message: error.message
    });
  }
};
