import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Bio } from '../../data/constants';
import ProfileImg from '../../assets/CalebAtUSC.jpg';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 40;
  padding: 1rem;
  background: transparent;

  @media (min-width: 640px) {
    padding: 1.5rem 1rem;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ProfileButton = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CenterSection = styled.div`
  display: none;

  @media (min-width: 640px) {
    display: flex;
  }
`;

const NavPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 999px;
  backdrop-filter: blur(16px) saturate(180%);
  background: ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(255,255,255,0.3)'};
  border: 1px solid ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.1)'
    : 'rgba(0,0,0,0.05)'};
  box-shadow: 0 2px 8px -1px rgba(0,0,0,0.1);
`;

const NavLink = styled(Link)`
  position: relative;
  padding: 0.5rem 1rem;
  font-size: 14px;
  color: ${({ theme, $active }) => $active ? theme.text_primary : theme.text_secondary};
  text-decoration: none;
  transition: color 0.2s;
  font-weight: ${({ $active }) => $active ? '500' : '400'};
  border-radius: 999px;
  background: ${({ theme, $active }) => $active
    ? (theme.bg === '#0a0a0a'
      ? 'rgba(255,255,255,0.15)'
      : 'rgba(0,0,0,0.05)')
    : 'transparent'};

  &:hover {
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme, $active }) => !$active && (theme.bg === '#0a0a0a'
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.03)')};
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`;

const IconButton = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.bg === '#0a0a0a'
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(0,0,0,0.05)'};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ThemeToggle = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.bg === '#0a0a0a'
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(0,0,0,0.05)'};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Navbar2 = ({ toggleTheme, isDark }) => {
  const location = useLocation();

  return (
    <Nav>
      <NavContent>
        <LeftSection>
          <ProfileButton to="/" aria-label="Home">
            <ProfileImage src={ProfileImg} alt="Caleb Newton" />
          </ProfileButton>
        </LeftSection>

        <CenterSection>
          <NavPill>
            <NavLink to="/" $active={location.pathname === '/'}>home</NavLink>
            <NavLink to="/about" $active={location.pathname === '/about'}>about</NavLink>
            <NavLink to="/education" $active={location.pathname === '/education'}>education</NavLink>
            <NavLink to="/work" $active={location.pathname === '/work'}>work</NavLink>
          </NavPill>
        </CenterSection>

        <RightSection>
          <IconButton href={Bio.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </IconButton>
          <IconButton href={Bio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </IconButton>
          <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? '☀️' : '🌙'}
          </ThemeToggle>
        </RightSection>
      </NavContent>
    </Nav>
  );
};

export default Navbar2;
