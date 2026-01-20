import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const GlassShell = styled.a`
  display: inline-flex;
  text-decoration: none;
  cursor: ${({ href }) => href ? 'pointer' : 'default'};
  vertical-align: middle;
`;

const GlassSurface = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 14px;
  padding: 0.375rem 0.75rem;
  border-radius: 999px;
  backdrop-filter: blur(58px) saturate(180%);
  background: ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.08))'
    : 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.2))'};
  border: 1px solid ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.2)'
    : 'rgba(255,255,255,0.5)'};
  box-shadow: ${({ theme }) => theme.bg === '#0a0a0a'
    ? '0 2px 8px -1px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 2px 0 rgba(255,255,255,0.2)'
    : '0 2px 8px -1px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 1px 2px 0 rgba(255,255,255,0.6)'};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  color: ${({ theme }) => theme.text_primary};
  position: relative;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.bg === '#0a0a0a'
      ? '0 4px 12px -1px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 2px 0 rgba(255,255,255,0.2)'
      : '0 4px 12px -1px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 1px 2px 0 rgba(255,255,255,0.6)'};
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.08;
    mix-blend-mode: soft-light;
    pointer-events: none;
  }
`;

const Logo = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  object-fit: contain;
`;

const GlassTag = ({ logo, children, href, internal, ...props }) => {
  const content = (
    <GlassSurface>
      {logo && <Logo src={logo} alt="" />}
      <span>{children}</span>
    </GlassSurface>
  );

  if (href) {
    // If internal is true or href starts with '/', use React Router Link
    if (internal || href.startsWith('/')) {
      return (
        <GlassShell as={RouterLink} to={href} {...props}>
          {content}
        </GlassShell>
      );
    }
    // External link
    return (
      <GlassShell href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </GlassShell>
    );
  }

  return (
    <GlassShell as="span" {...props}>
      {content}
    </GlassShell>
  );
};

export default GlassTag;
