import './App.css';
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { darkTheme, lightTheme } from './utils/Themes';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar2';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import EducationPage from './pages/EducationPage';
import WorkPage from './pages/Work';
import EverythingNightPage from './pages/EverythingNight';
import ComingSoonPage from './pages/ComingSoon';
import Footer from './components/Footer2';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Gradient = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1400px;
  height: 100vh;
  min-height: 1200px;
  background: radial-gradient(circle at 50% 0%, ${({ theme }) => theme.primary}25 0%, ${({ theme }) => theme.primary}10 30%, ${({ theme }) => theme.primary}05 50%, ${({ theme }) => theme.primary}02 70%, transparent 100%);
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
  transition: background 0.3s ease;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const PageWrapper = styled.div`
  animation: ${fadeIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Router>
        <Body>
          <Gradient />
          <Content>
            <Navbar toggleTheme={toggleTheme} isDark={isDark} />
            <PageWrapper key={window.location.pathname}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/sgchristianclubcollective" element={<EverythingNightPage />} />
                <Route path="/modellab" element={<ComingSoonPage />} />
                <Route path="/tech16" element={<ComingSoonPage />} />
                <Route path="/foodvision" element={<ComingSoonPage />} />
              </Routes>
            </PageWrapper>
            <Footer />
          </Content>
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
