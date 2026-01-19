import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Bio } from '../../data/constants';

const Nav = styled.nav`
  padding: 2.5rem 1rem;
  max-width: 672px;
  margin: 0 auto;

  @media (min-width: 640px) {
    padding: 2.5rem 0;
  }

  @media (min-width: 768px) {
    padding: 3.5rem 0;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme, $active }) => $active ? theme.text_primary : theme.text_secondary};
  text-decoration: none;
  transition: color 0.2s;
  font-weight: ${({ $active }) => $active ? '500' : '400'};

  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 18px;
  transition: color 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Navbar2 = ({ toggleTheme, isDark }) => {
  const location = useLocation();

  return (
    <Nav>
      <NavContent>
        <NavLinks>
          <NavLink to="/" $active={location.pathname === '/'}>home</NavLink>
          <NavLink to="/about" $active={location.pathname === '/about'}>about</NavLink>
          <NavLink to="/education" $active={location.pathname === '/education'}>education</NavLink>
          <NavLink to="/work" $active={location.pathname === '/work'}>work</NavLink>
        </NavLinks>
        <RightSection>
          <SocialIcon href={Bio.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </SocialIcon>
          <SocialIcon href={Bio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </SocialIcon>
          <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? '☀️' : '🌙'}
          </ThemeToggle>
        </RightSection>
      </NavContent>
    </Nav>
  );
};

export default Navbar2;
