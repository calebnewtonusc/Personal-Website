import React from 'react';
import styled from 'styled-components';
import { Bio } from '../../data/constants';

const Nav = styled.nav`
  background: ${({ theme }) => theme.bg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: ${({ theme }) => theme.bg}dd;
`;

const NavContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const NavLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 20px;
  transition: color 0.2s;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const NavbarMinimal = ({ toggleTheme, isDark }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Nav>
      <NavContainer>
        <NavLinks>
          <NavLink onClick={() => scrollToSection('home')}>home</NavLink>
          <NavLink onClick={() => scrollToSection('about')}>about</NavLink>
          <NavLink onClick={() => scrollToSection('timeline')}>timeline</NavLink>
        </NavLinks>
        <SocialLinks>
          <SocialIcon href={Bio.github} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </SocialIcon>
          <SocialIcon href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </SocialIcon>
          <ThemeToggle onClick={toggleTheme}>
            {isDark ? '☀️' : '🌙'}
          </ThemeToggle>
        </SocialLinks>
      </NavContainer>
    </Nav>
  );
};

export default NavbarMinimal;
