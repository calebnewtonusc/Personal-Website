/**
 * AGENT MONITORING DASHBOARD API
 *
 * Real-time dashboard for monitoring all agents (local + cloud)
 * Endpoints:
 * - GET /api/dashboard/status - Overall system status
 * - GET /api/dashboard/agents - All agent details
 * - GET /api/dashboard/tasks - Task queue status
 * - GET /api/dashboard/health - Health metrics
 * - GET /api/dashboard/alerts - Active alerts
 * - POST /api/dashboard/restart/:agentId - Restart specific agent
 */

const axios = require('axios');

// Cloud database URL (Supabase/Firebase/etc)
const CLOUD_DB_URL = process.env.CLOUD_DB_URL || 'https://api.supabase.io';
const LOCAL_API_URL = process.env.LOCAL_API_URL || 'http://localhost:3000';

// In-memory cache for demo purposes
const cache = {
  agents: new Map(),
  tasks: [],
  health: [],
  alerts: [],
  lastUpdate: null,
};

/**
 * Get overall system status
 */
async function getSystemStatus() {
  try {
    // Fetch from cloud database
    const response = await axios.get(`${CLOUD_DB_URL}/health/status`, {
      timeout: 5000,
    });

    return response.data;
  } catch (error) {
    console.error('[Dashboard] Failed to fetch system status:', error.message);

    // Return cached/fallback data
    return {
      overall: 'unknown',
      timestamp: new Date().toISOString(),
      agents: Array.from(cache.agents.values()),
      alerts: cache.alerts,
      stats: {
        totalAgents: cache.agents.size,
        healthyAgents: 0,
        degradedAgents: 0,
        downAgents: 0,
        totalTasksProcessed: 0,
        avgSuccessRate: 0,
      },
    };
  }
}

/**
 * Get all agents with details
 */
async function getAllAgents() {
  try {
    const response = await axios.get(`${CLOUD_DB_URL}/agents`, {
      timeout: 5000,
    });

    // Update cache
    response.data.forEach((agent) => {
      cache.agents.set(agent.id, agent);
    });

    return response.data;
  } catch (error) {
    console.error('[Dashboard] Failed to fetch agents:', error.message);
    return Array.from(cache.agents.values());
  }
}

/**
 * Get task queue status
 */
async function getTaskQueueStatus() {
  try {
    const response = await axios.get(`${CLOUD_DB_URL}/tasks/stats`, {
      timeout: 5000,
    });

    return response.data;
  } catch (error) {
    console.error('[Dashboard] Failed to fetch task stats:', error.message);
    return {
      total: 0,
      pending: 0,
      running: 0,
      completed: 0,
      failed: 0,
      dead: 0,
    };
  }
}

/**
 * Get health metrics
 */
async function getHealthMetrics() {
  try {
    const response = await axios.get(`${CLOUD_DB_URL}/health/metrics`, {
      timeout: 5000,
    });

    cache.health = response.data;
    return response.data;
  } catch (error) {
    console.error('[Dashboard] Failed to fetch health metrics:', error.message);
    return cache.health;
  }
}

/**
 * Get active alerts
 */
async function getActiveAlerts() {
  try {
    const response = await axios.get(`${CLOUD_DB_URL}/health/alerts`, {
      params: { resolved: false },
      timeout: 5000,
    });

    cache.alerts = response.data;
    return response.data;
  } catch (error) {
    console.error('[Dashboard] Failed to fetch alerts:', error.message);
    return cache.alerts;
  }
}

/**
 * Restart a specific agent
 */
async function restartAgent(agentId) {
  try {
    // Determine if agent is local or cloud
    const agent = cache.agents.get(agentId);

    if (!agent) {
      throw new Error('Agent not found');
    }

    if (agent.location === 'local') {
      // Call local API to restart
      const response = await axios.post(`${LOCAL_API_URL}/agents/restart/${agentId}`);
      return response.data;
    } else {
      // Call cloud API to restart
      const response = await axios.post(`${CLOUD_DB_URL}/agents/restart/${agentId}`);
      return response.data;
    }
  } catch (error) {
    console.error(`[Dashboard] Failed to restart agent ${agentId}:`, error.message);
    throw error;
  }
}

/**
 * Get real-time metrics (last 1 hour)
 */
async function getRealtimeMetrics() {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const response = await axios.get(`${CLOUD_DB_URL}/health/metrics`, {
      params: { since: oneHourAgo },
      timeout: 5000,
    });

    return response.data;
  } catch (error) {
    console.error('[Dashboard] Failed to fetch realtime metrics:', error.message);
    return [];
  }
}

/**
 * Express route handlers
 */
module.exports = (app) => {
  // Get overall system status
  app.get('/api/dashboard/status', async (req, res) => {
    try {
      const status = await getSystemStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all agents
  app.get('/api/dashboard/agents', async (req, res) => {
    try {
      const agents = await getAllAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get specific agent
  app.get('/api/dashboard/agents/:agentId', async (req, res) => {
    try {
      const agent = cache.agents.get(req.params.agentId);

      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      res.json(agent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get task queue status
  app.get('/api/dashboard/tasks', async (req, res) => {
    try {
      const tasks = await getTaskQueueStatus();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get health metrics
  app.get('/api/dashboard/health', async (req, res) => {
    try {
      const health = await getHealthMetrics();
      res.json(health);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get active alerts
  app.get('/api/dashboard/alerts', async (req, res) => {
    try {
      const alerts = await getActiveAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get real-time metrics
  app.get('/api/dashboard/metrics/realtime', async (req, res) => {
    try {
      const metrics = await getRealtimeMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Restart specific agent
  app.post('/api/dashboard/restart/:agentId', async (req, res) => {
    try {
      const result = await restartAgent(req.params.agentId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Dashboard HTML page
  app.get('/dashboard', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Agent Monitoring Dashboard</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0e27;
      color: #e0e0e0;
      padding: 20px;
    }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { color: #00d9ff; margin-bottom: 30px; font-size: 2.5rem; }
    .status-badge {
      display: inline-block;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: bold;
    }
    .status-healthy { background: #10b981; color: white; }
    .status-degraded { background: #f59e0b; color: white; }
    .status-critical { background: #ef4444; color: white; }
    .status-down { background: #dc2626; color: white; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .card {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
    .card h2 { color: #00d9ff; margin-bottom: 15px; font-size: 1.3rem; }
    .stat { margin: 10px 0; font-size: 1.1rem; }
    .stat-label { color: #94a3b8; }
    .stat-value { color: #00d9ff; font-weight: bold; }
    .agent-card {
      background: #1e293b;
      border: 1px solid #334155;
      padding: 15px;
      border-radius: 8px;
      margin: 10px 0;
    }
    .agent-name { font-weight: bold; color: #00d9ff; margin-bottom: 5px; }
    .agent-info { font-size: 0.9rem; color: #94a3b8; }
    .btn {
      background: #00d9ff;
      color: #0a0e27;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 10px;
    }
    .btn:hover { background: #00b8d4; }
    .alert {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 10px 0;
      border-radius: 6px;
      color: #78350f;
    }
    .alert-critical { background: #fee2e2; border-color: #dc2626; color: #991b1b; }
    .refresh-time { color: #64748b; font-size: 0.9rem; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🤖 Agent Monitoring Dashboard</h1>

    <div id="status-section">
      <div class="card">
        <h2>System Status</h2>
        <div id="system-status">Loading...</div>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <h2>Agent Status</h2>
        <div id="agent-status">Loading...</div>
      </div>

      <div class="card">
        <h2>Task Queue</h2>
        <div id="task-status">Loading...</div>
      </div>

      <div class="card">
        <h2>Health Metrics</h2>
        <div id="health-metrics">Loading...</div>
      </div>
    </div>

    <div class="card">
      <h2>Active Agents</h2>
      <div id="agents-list">Loading...</div>
    </div>

    <div class="card">
      <h2>⚠️ Active Alerts</h2>
      <div id="alerts-list">No active alerts</div>
    </div>

    <div class="refresh-time">
      Last updated: <span id="last-update">Never</span> |
      Auto-refresh: <span id="countdown">30</span>s
    </div>
  </div>

  <script>
    let countdown = 30;

    async function fetchData() {
      try {
        // Fetch system status
        const statusRes = await fetch('/api/dashboard/status');
        const status = await statusRes.json();
        updateSystemStatus(status);

        // Fetch agents
        const agentsRes = await fetch('/api/dashboard/agents');
        const agents = await agentsRes.json();
        updateAgentsList(agents);

        // Fetch tasks
        const tasksRes = await fetch('/api/dashboard/tasks');
        const tasks = await tasksRes.json();
        updateTaskStatus(tasks);

        // Fetch alerts
        const alertsRes = await fetch('/api/dashboard/alerts');
        const alerts = await alertsRes.json();
        updateAlerts(alerts);

        document.getElementById('last-update').textContent = new Date().toLocaleTimeString();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    function updateSystemStatus(status) {
      const statusClass = 'status-' + (status.overall || 'healthy');
      const html = \`
        <div class="stat">
          <span class="stat-label">Overall:</span>
          <span class="status-badge \${statusClass}">\${status.overall?.toUpperCase() || 'UNKNOWN'}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Total Agents:</span>
          <span class="stat-value">\${status.stats?.totalAgents || 0}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Healthy:</span>
          <span class="stat-value">\${status.stats?.healthyAgents || 0}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Tasks Processed:</span>
          <span class="stat-value">\${status.stats?.totalTasksProcessed || 0}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Success Rate:</span>
          <span class="stat-value">\${status.stats?.avgSuccessRate?.toFixed(1) || 0}%</span>
        </div>
      \`;
      document.getElementById('system-status').innerHTML = html;
    }

    function updateAgentsList(agents) {
      if (!agents || agents.length === 0) {
        document.getElementById('agents-list').innerHTML = '<p>No agents found</p>';
        return;
      }

      const html = agents.map(agent => \`
        <div class="agent-card">
          <div class="agent-name">\${agent.name || agent.id}</div>
          <div class="agent-info">
            <span class="status-badge status-\${agent.status}">\${agent.status?.toUpperCase()}</span>
            | Location: \${agent.location}
            | Tasks: \${agent.tasksProcessed || 0}
          </div>
          <button class="btn" onclick="restartAgent('\${agent.id}')">Restart</button>
        </div>
      \`).join('');

      document.getElementById('agents-list').innerHTML = html;
    }

    function updateTaskStatus(tasks) {
      const html = \`
        <div class="stat"><span class="stat-label">Pending:</span> <span class="stat-value">\${tasks.pending || 0}</span></div>
        <div class="stat"><span class="stat-label">Running:</span> <span class="stat-value">\${tasks.running || 0}</span></div>
        <div class="stat"><span class="stat-label">Completed:</span> <span class="stat-value">\${tasks.completed || 0}</span></div>
        <div class="stat"><span class="stat-label">Failed:</span> <span class="stat-value">\${tasks.failed || 0}</span></div>
      \`;
      document.getElementById('task-status').innerHTML = html;
    }

    function updateAlerts(alerts) {
      if (!alerts || alerts.length === 0) {
        document.getElementById('alerts-list').innerHTML = '<p>No active alerts</p>';
        return;
      }

      const html = alerts.map(alert => \`
        <div class="alert alert-\${alert.severity}">
          <strong>[\${alert.severity.toUpperCase()}]</strong> \${alert.message}
          <br><small>\${new Date(alert.timestamp).toLocaleString()}</small>
        </div>
      \`).join('');

      document.getElementById('alerts-list').innerHTML = html;
    }

    async function restartAgent(agentId) {
      if (!confirm(\`Restart agent \${agentId}?\`)) return;

      try {
        const res = await fetch(\`/api/dashboard/restart/\${agentId}\`, { method: 'POST' });
        const result = await res.json();
        alert('Agent restart initiated');
        fetchData();
      } catch (error) {
        alert('Failed to restart agent: ' + error.message);
      }
    }

    // Initial load
    fetchData();

    // Auto-refresh every 30 seconds
    setInterval(() => {
      fetchData();
      countdown = 30;
    }, 30000);

    // Countdown timer
    setInterval(() => {
      countdown--;
      if (countdown < 0) countdown = 30;
      document.getElementById('countdown').textContent = countdown;
    }, 1000);
  </script>
</body>
</html>
    `);
  });

  console.log('📊 Agent Dashboard API routes registered');
  console.log('   GET  /dashboard - Web dashboard');
  console.log('   GET  /api/dashboard/status');
  console.log('   GET  /api/dashboard/agents');
  console.log('   GET  /api/dashboard/tasks');
  console.log('   GET  /api/dashboard/health');
  console.log('   GET  /api/dashboard/alerts');
  console.log('   POST /api/dashboard/restart/:agentId');
};
