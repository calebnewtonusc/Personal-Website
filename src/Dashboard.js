import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const correctPassword = 'Jesusisgoated123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setAuthenticated(true);
      setError(null);
      fetchDashboardData();
    } else {
      setError('Invalid password');
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dashboard/status');
      const data = await response.json();
      setDashboardData(data.data || data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) {
      // Fetch every 10 seconds
      const interval = setInterval(fetchDashboardData, 10000);
      return () => clearInterval(interval);
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.loginBox}>
          <h1 style={styles.title}>🧠 Mega Brain Dashboard</h1>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
            {error && <p style={styles.error}>{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  if (loading && !dashboardData) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Loading...</h1>
      </div>
    );
  }

  const agents = dashboardData?.agents || {};
  const agentsList = agents.local_agents || [];
  const learnings = dashboardData?.learnings || { recent: [] };
  const events = dashboardData?.events || { recent: [] };
  const systemHealth = dashboardData?.system_health || {};
  const collectiveMemory = dashboardData?.collective_memory || {};
  const autonomousStrategist = dashboardData?.autonomous_strategist || {};

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <header style={styles.header}>
          <h1 style={styles.title}>🧠 Mega Brain Dashboard</h1>
          <p style={styles.subtitle}>
            Last updated: {dashboardData?.lastUpdate ? new Date(dashboardData.lastUpdate).toLocaleString() : 'Never'}
          </p>
          <button onClick={fetchDashboardData} style={styles.refreshButton}>
            🔄 Refresh
          </button>
        </header>

        <div style={styles.grid}>
          {/* Agents Status */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🤖 Agents ({agents.total || agentsList.length})</h2>
            <div style={styles.agentsList}>
              {agentsList.map((agent, i) => (
                <div key={i} style={styles.agentItem}>
                  <span style={agent.pid !== '-' ? styles.statusRunning : styles.statusStopped}>
                    {agent.pid !== '-' ? '✅' : '⏸️'}
                  </span>
                  <span style={styles.agentName}>{agent.name}</span>
                  {agent.pid !== '-' && (
                    <span style={styles.agentPid}>PID: {agent.pid}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>💚 System Health</h2>
            <div style={styles.healthMetrics}>
              {systemHealth.cpu_percent !== undefined && (
                <div style={styles.metric}>
                  <span>CPU:</span>
                  <span style={styles.metricValue}>{systemHealth.cpu_percent}%</span>
                </div>
              )}
              {systemHealth.memory_percent !== undefined && (
                <div style={styles.metric}>
                  <span>Memory:</span>
                  <span style={styles.metricValue}>{systemHealth.memory_percent}%</span>
                </div>
              )}
              {systemHealth.disk_percent !== undefined && (
                <div style={styles.metric}>
                  <span>Disk:</span>
                  <span style={styles.metricValue}>{systemHealth.disk_percent}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Collective Memory */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🧠 Collective Memory</h2>
            <div style={styles.healthMetrics}>
              <div style={styles.metric}>
                <span>Essays:</span>
                <span style={styles.metricValue}>{collectiveMemory.essays_count || 0}</span>
              </div>
              <div style={styles.metric}>
                <span>Total Items:</span>
                <span style={styles.metricValue}>{collectiveMemory.total_items || 0}</span>
              </div>
              <div style={styles.metric}>
                <span>Size:</span>
                <span style={styles.metricValue}>{collectiveMemory.size_mb || 0} MB</span>
              </div>
            </div>
          </div>

          {/* Autonomous Strategist */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🎯 Autonomous Strategist</h2>
            <div style={styles.healthMetrics}>
              <div style={styles.metric}>
                <span>Decisions:</span>
                <span style={styles.metricValue}>{autonomousStrategist.total_decisions || 0}</span>
              </div>
              <div style={styles.metric}>
                <span>Actions:</span>
                <span style={styles.metricValue}>{autonomousStrategist.total_actions || 0}</span>
              </div>
              {autonomousStrategist.priorities && autonomousStrategist.priorities.length > 0 && (
                <div style={{marginTop: '10px', fontSize: '12px'}}>
                  <strong>Current Priorities:</strong>
                  <ul style={{marginTop: '5px', paddingLeft: '20px'}}>
                    {autonomousStrategist.priorities.slice(0, 3).map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Recent Learnings */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🧠 Recent Learnings ({learnings.count || learnings.recent.length})</h2>
            <div style={styles.list}>
              {learnings.recent.slice(0, 5).map((learning, i) => (
                <div key={i} style={styles.listItem}>
                  <span style={styles.timestamp}>
                    {new Date(learning.timestamp).toLocaleTimeString()}
                  </span>
                  <span style={styles.content}>{learning.learning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Events */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📊 Recent Events ({events.count || events.recent.length})</h2>
            <div style={styles.list}>
              {events.recent.slice(0, 5).map((event, i) => (
                <div key={i} style={styles.listItem}>
                  <span style={styles.timestamp}>
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                  <span style={styles.content}>
                    {event.event_type}: {event.details || event.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
  },
  loginBox: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    maxWidth: '400px',
    width: '100%',
  },
  dashboard: {
    width: '100%',
    maxWidth: '1400px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  header: {
    borderBottom: '2px solid #667eea',
    paddingBottom: '20px',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '32px',
    color: '#667eea',
    flex: '1',
  },
  subtitle: {
    margin: '0',
    color: '#666',
    fontSize: '14px',
  },
  refreshButton: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '15px',
    borderRadius: '10px',
    border: '2px solid #ddd',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '15px',
    borderRadius: '10px',
    border: 'none',
    background: '#667eea',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    color: '#e74c3c',
    margin: '0',
    fontSize: '14px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    margin: '0 0 20px 0',
    fontSize: '20px',
    color: '#333',
    borderBottom: '2px solid #667eea',
    paddingBottom: '10px',
  },
  agentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  agentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    background: '#f8f9fa',
    borderRadius: '8px',
  },
  agentName: {
    flex: '1',
    fontSize: '14px',
    fontWeight: '500',
  },
  agentPid: {
    fontSize: '12px',
    color: '#666',
  },
  statusRunning: {
    fontSize: '18px',
  },
  statusStopped: {
    fontSize: '18px',
    opacity: '0.5',
  },
  healthMetrics: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  metric: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    background: '#f8f9fa',
    borderRadius: '8px',
  },
  metricValue: {
    fontWeight: '600',
    fontSize: '18px',
    color: '#667eea',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  listItem: {
    padding: '12px',
    background: '#f8f9fa',
    borderRadius: '8px',
    fontSize: '13px',
  },
  timestamp: {
    display: 'block',
    color: '#666',
    fontSize: '11px',
    marginBottom: '5px',
  },
  content: {
    display: 'block',
    color: '#333',
  },
};

export default Dashboard;
