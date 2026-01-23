/**
 * PERSONAL CONTEXT API
 *
 * Provides Joel's personal context (goals, life story, values, plans) to all agents.
 * This is the source of truth for understanding Joel's life, accessible from anywhere.
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

  const contextPath = path.join(process.cwd(), 'context-data', 'personal-context.json');

  try {
    if (req.method === 'GET') {
      // Return personal context
      if (fs.existsSync(contextPath)) {
        const context = JSON.parse(fs.readFileSync(contextPath, 'utf-8'));

        // Add query filtering
        const { category } = req.query;
        if (category) {
          // Filter by category (goals, life_story, values, plans)
          return res.status(200).json({
            success: true,
            category,
            data: context[category] || null,
            last_updated: context.last_updated
          });
        }

        return res.status(200).json({
          success: true,
          context,
          stats: {
            goals_count: Object.values(context.goals || {}).flat().length,
            values_count: (context.values || []).length,
            plans_count: (context.plans || []).length,
            has_life_story: !!context.life_story && Object.keys(context.life_story).length > 0
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          error: 'Personal context not yet built',
          message: 'Run personal_context_agent.py to build initial context'
        });
      }
    } else if (req.method === 'POST') {
      // Update personal context (from local sync)
      const { context } = req.body;

      if (!context) {
        return res.status(400).json({
          success: false,
          error: 'Context data required'
        });
      }

      // Ensure directory exists
      const contextDir = path.join(process.cwd(), 'context-data');
      if (!fs.existsSync(contextDir)) {
        fs.mkdirSync(contextDir, { recursive: true });
      }

      // Save context
      fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));

      return res.status(200).json({
        success: true,
        message: 'Personal context updated',
        last_updated: context.last_updated
      });
    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('Personal context error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
