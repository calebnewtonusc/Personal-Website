/**
 * Admin Dashboard Page
 * Real-time context sync monitoring, Claude chat interface, and system management
 */

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.bg} 0%, ${({ theme }) => theme.bgLight} 100%);
  padding: 2rem;
`;

const LoginCard = styled.div`
  max-width: 400px;
  margin: 10rem auto;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.primary + '30'};
  border-radius: 8px;
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px ${({ theme }) => theme.primary + '40'};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Dashboard = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.primary + '20'};
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${props => props.status === 'active' ? '#10b981' : '#6b7280'};
  color: white;
  animation: ${props => props.status === 'active' ? pulse : 'none'} 2s ease-in-out infinite;
`;

const SourceCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const SourceInfo = styled.div`
  flex: 1;
`;

const SourceName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.25rem;
`;

const SourceDetail = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0.25rem 0;
`;

const ChatContainer = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 1.5rem;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 8px;
`;

const Message = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.role === 'user' ? props.theme.primary + '20' : props.theme.card};
  border: 1px solid ${props => props.role === 'user' ? props.theme.primary : props.theme.text_secondary + '20'};
`;

const MessageRole = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const MessageContent = styled.div`
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.5;
  white-space: pre-wrap;
`;

const ChatInput = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.primary + '30'};
  border-radius: 8px;
  background: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  font-size: 1rem;
  resize: none;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SummaryCard = styled(Card)`
  text-align: center;
`;

const SummaryValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin: 0.5rem 0;
`;

const SummaryLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ErrorMessage = styled.div`
  background: #ef4444;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dashboard state
  const [syncStatus, setSyncStatus] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check for existing token
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch sync status every 10 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/sync-status`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSyncStatus(response.data);
      } catch (error) {
        console.error('Error fetching sync status:', error);
        if (error.response?.status === 401) {
          handleLogout();
        }
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, { password });
      const { token } = response.data;

      setToken(token);
      localStorage.setItem('admin_token', token);
      setIsAuthenticated(true);
    } catch (error) {
      setError('Invalid password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setIsAuthenticated(false);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || chatLoading) return;

    const userMessage = { role: 'user', content: currentMessage };
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setChatLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/chat`,
        {
          message: currentMessage,
          conversationHistory: messages
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const assistantMessage = { role: 'assistant', content: response.data.message };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '❌ Error communicating with Claude. Please try again.' }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleQuickUpdate = async () => {
    if (!currentMessage.trim()) return;

    setChatLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/update-context`,
        { text: currentMessage },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessages(prev => [
        ...prev,
        { role: 'user', content: currentMessage },
        { role: 'assistant', content: `✅ ${response.data.message}\n\nUpdated: ${response.data.instruction.file}` }
      ]);
      setCurrentMessage('');
    } catch (error) {
      console.error('Update error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '❌ Failed to update context. ' + (error.response?.data?.error || '') }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <LoginCard>
          <Title>🔐 Admin Access</Title>
          <Subtitle>Context Sync Dashboard</Subtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={handleLogin}>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Authenticating...' : 'Login'}
            </Button>
          </form>
        </LoginCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Dashboard>
        <DashboardHeader>
          <Title>📊 Context Sync Dashboard</Title>
          <Button onClick={handleLogout} style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
            Logout
          </Button>
        </DashboardHeader>

        {/* Summary Cards */}
        {syncStatus && (
          <Grid>
            <SummaryCard>
              <SummaryLabel>Total Sources</SummaryLabel>
              <SummaryValue>{syncStatus.summary.total}</SummaryValue>
            </SummaryCard>
            <SummaryCard>
              <SummaryLabel>Active</SummaryLabel>
              <SummaryValue style={{ color: '#10b981' }}>{syncStatus.summary.active}</SummaryValue>
            </SummaryCard>
            <SummaryCard>
              <SummaryLabel>Monitor Status</SummaryLabel>
              <StatusBadge status={syncStatus.monitor.status}>
                {syncStatus.monitor.status}
              </StatusBadge>
            </SummaryCard>
          </Grid>
        )}

        {/* Data Sources */}
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>📁 Data Sources</h2>
        <Grid>
          {syncStatus?.sources.map((source, index) => (
            <SourceCard key={index}>
              <SourceInfo>
                <SourceName>{source.name}</SourceName>
                <SourceDetail>Last Sync: {source.lastSync ? new Date(source.lastSync).toLocaleString() : 'Never'}</SourceDetail>
                <SourceDetail>Size: {source.size}</SourceDetail>
              </SourceInfo>
              <StatusBadge status={source.status}>
                {source.status}
              </StatusBadge>
            </SourceCard>
          ))}
        </Grid>

        {/* Claude Chat Interface */}
        <h2 style={{ color: '#fff', marginBottom: '1rem', marginTop: '2rem' }}>💬 Chat with Claude</h2>
        <ChatContainer>
          <ChatMessages>
            {messages.length === 0 && (
              <Message role="assistant">
                <MessageRole>Assistant</MessageRole>
                <MessageContent>
                  👋 Hi! I'm your context management assistant. I can help you:
                  {'\n\n'}• View sync status and statistics
                  {'\n'}• Update context files
                  {'\n'}• Answer questions about your system
                  {'\n'}• Manage your digital life data
                  {'\n\n'}Try saying "Show me my latest sync status" or "Add new skill: React"
                </MessageContent>
              </Message>
            )}
            {messages.map((msg, index) => (
              <Message key={index} role={msg.role}>
                <MessageRole>{msg.role}</MessageRole>
                <MessageContent>{msg.content}</MessageContent>
              </Message>
            ))}
            {chatLoading && (
              <Message role="assistant">
                <MessageRole>Assistant</MessageRole>
                <MessageContent>Thinking...</MessageContent>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInput>
            <TextArea
              placeholder="Type a message or update command..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              rows={3}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Button onClick={handleSendMessage} disabled={chatLoading || !currentMessage.trim()}>
                Send
              </Button>
              <Button
                onClick={handleQuickUpdate}
                disabled={chatLoading || !currentMessage.trim()}
                style={{ background: '#10b981' }}
              >
                Update
              </Button>
            </div>
          </ChatInput>
        </ChatContainer>
      </Dashboard>
    </PageContainer>
  );
}

export default Admin;
