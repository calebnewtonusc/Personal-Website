import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Bio } from '../../data/constants';
import ProfileImg from '../../assets/CalebAtUSC.jpg';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  padding: 1rem;
  transform: translateY(${({ $hidden }) => $hidden ? '-200px' : '0'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

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

  @media (max-width: 900px) {
    grid-template-columns: auto 1fr auto;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr auto;
    gap: 0.25rem;
  }

  @media (max-width: 480px) {
    gap: 0.125rem;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.15)'
    : 'rgba(0,0,0,0.08)'};
  box-shadow: 0 4px 12px -2px rgba(0,0,0,0.12),
              inset 0 1px 0 ${({ theme }) => theme.bg === '#0a0a0a'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(255,255,255,0.6)'};
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10001;
  }

  @media (min-width: 769px) and (max-width: 900px) {
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const NavPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 999px;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.06)'
    : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(0,0,0,0.08)'};
  box-shadow: 0 4px 12px -2px rgba(0,0,0,0.12),
              inset 0 1px 0 ${({ theme }) => theme.bg === '#0a0a0a'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(255,255,255,0.6)'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme, $active }) => !$active && (theme.bg === '#0a0a0a'
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.03)')};
  }

  @media (max-width: 900px) {
    padding: 0.5rem 0.75rem;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.5rem;
    font-size: 11px;
  }

  @media (max-width: 480px) {
    padding: 0.35rem 0.4rem;
    font-size: 10px;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 900px) {
    gap: 0.25rem;
  }

  @media (max-width: 768px) {
    gap: 0.125rem;
  }

  @media (max-width: 480px) {
    gap: 0.0625rem;
  }
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
  transition: all 0.2s;
  text-decoration: none;
  flex-shrink: 0;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.06)'
    : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(0,0,0,0.08)'};
  box-shadow: 0 4px 12px -2px rgba(0,0,0,0.12),
              inset 0 1px 0 ${({ theme }) => theme.bg === '#0a0a0a'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(255,255,255,0.6)'};

  &:hover {
    background: ${({ theme }) => theme.bg === '#0a0a0a'
      ? 'rgba(255,255,255,0.12)'
      : 'rgba(0,0,0,0.08)'};
    color: ${({ theme }) => theme.text_primary};
    transform: translateY(-1px);
  }

  @media (max-width: 900px) {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
    font-size: 13px;
    display: ${({ $hideOnMobile }) => $hideOnMobile ? 'none' : 'flex'};
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
`;

const ThemeToggle = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
  opacity: 0.7;
  filter: grayscale(100%);
  flex-shrink: 0;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.06)'
    : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(0,0,0,0.08)'};
  box-shadow: 0 4px 12px -2px rgba(0,0,0,0.12),
              inset 0 1px 0 ${({ theme }) => theme.bg === '#0a0a0a'
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(255,255,255,0.6)'};

  &:hover {
    background: ${({ theme }) => theme.bg === '#0a0a0a'
      ? 'rgba(255,255,255,0.12)'
      : 'rgba(0,0,0,0.08)'};
    opacity: 1;
    transform: translateY(-1px);
  }

  @media (max-width: 900px) {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
`;


const Navbar2 = ({ toggleTheme, isDark }) => {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollThreshold = 50;
      const footerThreshold = documentHeight - windowHeight - 200;

      // Hide at top
      if (currentScrollY < scrollThreshold) {
        setIsHidden(true);
      }
      // Hide near footer
      else if (currentScrollY > footerThreshold) {
        setIsHidden(true);
      }
      // Show when scrolling down after threshold
      else if (currentScrollY > scrollThreshold && currentScrollY < footerThreshold) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Nav $hidden={isHidden}>
      <NavContent>
        <LeftSection>
          <ProfileButton to="/" aria-label="Home">
            <ProfileImage src={ProfileImg} alt="Caleb Newton" />
          </ProfileButton>
        </LeftSection>

        <CenterSection>
          <NavPill>
            <NavLink to="/" $active={location.pathname === '/'}>Home</NavLink>
            <NavLink to="/about" $active={location.pathname === '/about'}>About</NavLink>
            <NavLink to="/education" $active={location.pathname === '/education'}>Education</NavLink>
            <NavLink to="/work" $active={location.pathname === '/work'}>Projects</NavLink>
          </NavPill>
        </CenterSection>

        <RightSection>
          <IconButton href={Bio.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </IconButton>
          <IconButton href={Bio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </IconButton>
          <IconButton $hideOnMobile href="https://open.spotify.com/user/rbfdtme07mst8eft5f4j8k2ll?si=b1124b9dfadf4450" target="_blank" rel="noopener noreferrer" aria-label="Spotify">
            <i className="fab fa-spotify"></i>
          </IconButton>
          <IconButton $hideOnMobile href="https://letterboxd.com/cnewt/" target="_blank" rel="noopener noreferrer" aria-label="Letterboxd">
            <svg width="16" height="16" viewBox="0 0 500 500" fill="currentColor">
              <circle cx="125" cy="250" r="125" fillOpacity="0.5"/>
              <circle cx="375" cy="250" r="125" fillOpacity="0.5"/>
              <circle cx="250" cy="250" r="125" fillOpacity="1"/>
            </svg>
          </IconButton>
          <IconButton $hideOnMobile href="https://rateyourmusic.com/~cnewt" target="_blank" rel="noopener noreferrer" aria-label="RateYourMusic">
            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>RYM</span>
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
