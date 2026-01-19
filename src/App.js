import './App.css';
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './utils/Themes';
import NavbarMinimal from './components/NavbarMinimal';
import HeroMinimal from './components/HeroMinimal';
import Timeline from './components/Timeline';
import FooterMinimal from './components/FooterMinimal';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  transition: background-color 0.3s ease;
`;

const Gradient = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  height: 400px;
  background: radial-gradient(circle at 50% 0%, ${({ theme }) => theme.primary}15, transparent 50%);
  pointer-events: none;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

function App() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Body>
        <Gradient />
        <NavbarMinimal toggleTheme={toggleTheme} isDark={isDark} />
        <Content>
          <HeroMinimal />
          <div id="timeline">
            <Timeline />
          </div>
          <FooterMinimal />
        </Content>
      </Body>
    </ThemeProvider>
  );
}

export default App;
