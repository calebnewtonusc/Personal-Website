/**
 * CLOUD STRATEGIST
 *
 * Makes strategic decisions in the cloud - works 24/7 even when computer is off.
 * Integrates with Anthropic API for AI-powered decision making.
 */

const fs = require('fs');
const path = require('path');

// Initialize Anthropic client
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
let Anthropic;
try {
  Anthropic = require('@anthropic-ai/sdk');
} catch (e) {
  console.log('Anthropic SDK not available');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const decisionsPath = path.join(process.cwd(), 'context-data', 'cloud-decisions.json');

  try {
    if (req.method === 'GET') {
      // Return recent decisions
      if (fs.existsSync(decisionsPath)) {
        const decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf-8'));
        return res.status(200).json({
          success: true,
          decisions: decisions.slice(-20), // Last 20 decisions
          count: decisions.length
        });
      } else {
        return res.status(200).json({
          success: true,
          decisions: [],
          count: 0
        });
      }
    } else if (req.method === 'POST') {
      const { action, context } = req.body;

      if (action === 'make_decision') {
        // Use AI to make a strategic decision
        if (!Anthropic || !ANTHROPIC_API_KEY) {
          return res.status(503).json({
            success: false,
            error: 'AI not configured',
            decision: {
              action: 'wait',
              reason: 'Anthropic API not available',
              confidence: 0
            }
          });
        }

        try {
          const anthropic = new Anthropic({
            apiKey: ANTHROPIC_API_KEY
          });

          const prompt = `You are the CLOUD STRATEGIST for the Mega Brain system.

You run 24/7 in the cloud, making strategic decisions even when Joel's computer is off.

Context: ${JSON.stringify(context || {}, null, 2)}

What should the Mega Brain do RIGHT NOW?

Options:
- execute_cloud_task: Run a task that doesn't need local computer
- sync_data: Ensure all data is synced
- analyze_patterns: Analyze recent activity patterns
- optimize_cloud: Optimize cloud resource usage
- learn_from_logs: Process and learn from recent logs
- prepare_insights: Prepare insights for when Joel checks in
- wait: Nothing urgent

Respond in JSON:
{
  "action": "action_name",
  "reason": "strategic reasoning",
  "priority": "high/medium/low",
  "cloud_executable": true/false
}`;

          const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 1000,
            messages: [{ role: 'user', content: prompt }]
          });

          const responseText = message.content[0].text;
          const start = responseText.indexOf('{');
          const end = responseText.lastIndexOf('}') + 1;

          let decision;
          if (start >= 0 && end > start) {
            decision = JSON.parse(responseText.substring(start, end));
          } else {
            decision = {
              action: 'wait',
              reason: 'Could not parse AI response',
              priority: 'low'
            };
          }

          decision.timestamp = new Date().toISOString();
          decision.executed_in = 'cloud';

          // Save decision
          let decisions = [];
          if (fs.existsSync(decisionsPath)) {
            decisions = JSON.parse(fs.readFileSync(decisionsPath, 'utf-8'));
          }
          decisions.push(decision);

          const contextDir = path.join(process.cwd(), 'context-data');
          if (!fs.existsSync(contextDir)) {
            fs.mkdirSync(contextDir, { recursive: true });
          }

          fs.writeFileSync(decisionsPath, JSON.stringify(decisions, null, 2));

          return res.status(200).json({
            success: true,
            decision,
            message: 'Decision made in cloud'
          });

        } catch (error) {
          console.error('AI decision error:', error);
          return res.status(500).json({
            success: false,
            error: error.message,
            decision: {
              action: 'wait',
              reason: 'AI error: ' + error.message,
              priority: 'low'
            }
          });
        }
      } else if (action === 'sync_decisions') {
        // Sync decisions from local
        const { decisions } = req.body;

        if (decisions && Array.isArray(decisions)) {
          const contextDir = path.join(process.cwd(), 'context-data');
          if (!fs.existsSync(contextDir)) {
            fs.mkdirSync(contextDir, { recursive: true });
          }

          fs.writeFileSync(decisionsPath, JSON.stringify(decisions, null, 2));

          return res.status(200).json({
            success: true,
            message: 'Decisions synced',
            count: decisions.length
          });
        } else {
          return res.status(400).json({
            success: false,
            error: 'Invalid decisions data'
          });
        }
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
    console.error('Cloud strategist error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
