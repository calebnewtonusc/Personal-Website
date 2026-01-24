import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Button
export const Button = styled.button`
  padding: ${({ size }) => {
    if (size === 'small') return '0.5rem 1rem';
    if (size === 'large') return '1rem 2rem';
    return '0.75rem 1.5rem';
  }};
  background: ${({ variant, theme }) => {
    if (variant === 'secondary') return 'transparent';
    if (variant === 'outline') return 'transparent';
    return theme.primary;
  }};
  color: ${({ variant, theme }) => {
    if (variant === 'secondary' || variant === 'outline') return theme.text_primary;
    return 'white';
  }};
  border: ${({ variant, theme }) => {
    if (variant === 'outline') return `2px solid ${theme.primary}`;
    if (variant === 'secondary') return `1px solid ${theme.text_primary + '30'}`;
    return 'none';
  }};
  border-radius: 8px;
  font-weight: 600;
  font-size: ${({ size }) => {
    if (size === 'small') return '0.875rem';
    if (size === 'large') return '1.125rem';
    return '1rem';
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ variant, theme }) => {
      if (variant === 'secondary') return theme.text_primary + '10';
      if (variant === 'outline') return theme.primary + '20';
      return theme.primary + 'dd';
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary + '40'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Card
export const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_primary + '12'};
  border-radius: 12px;
  padding: ${({ padding }) => padding || '1.5rem'};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease;

  ${({ clickable }) =>
    clickable &&
    `
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
  `}

  ${({ gradient, theme }) =>
    gradient &&
    `
    background: linear-gradient(135deg, ${theme.primary}20, ${theme.primary}05);
    border: 1px solid ${theme.primary}30;
  `}
`;

// Badge
export const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ variant, theme }) => {
    if (variant === 'success') return theme.primary + '20';
    if (variant === 'primary') return theme.primary + '20';
    return theme.text_secondary + '20';
  }};
  color: ${({ variant, theme }) => {
    if (variant === 'success' || variant === 'primary') return theme.primary;
    return theme.text_secondary;
  }};
  display: inline-block;
`;

// Progress Bar
const ProgressBarContainer = styled.div`
  width: 100%;
  height: ${({ height }) => height || '8px'};
  background: ${({ theme }) => theme.text_primary + '20'};
  border-radius: ${({ height }) => (height ? `calc(${height} / 2)` : '4px')};
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme, variant }) => {
    if (variant === 'gradient') {
      return `linear-gradient(90deg, ${theme.primary}, ${theme.primary}aa)`;
    }
    return theme.primary;
  }};
  width: ${({ progress }) => Math.min(100, Math.max(0, progress))}%;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: inherit;
  position: relative;
  overflow: hidden;

  ${({ animated }) =>
    animated &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: ${pulse} 2s ease-in-out infinite;
    }
  `}
`;

export const ProgressBar = ({ progress, height, variant, animated, showLabel }) => {
  return (
    <div style={{ width: '100%' }}>
      <ProgressBarContainer height={height}>
        <ProgressFill progress={progress} variant={variant} animated={animated} />
      </ProgressBarContainer>
      {showLabel && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'inherit' }}>
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

// Modal
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 2rem;
  max-width: ${({ maxWidth }) => maxWidth || '600px'};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease;
  border: 1px solid ${({ theme }) => theme.text_primary + '20'};

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ModalTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

export const ModalClose = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.text_primary + '10'};
    color: ${({ theme }) => theme.text_primary};
  }
`;

// Tooltip
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.div`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  position: absolute;
  z-index: 1000;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.875rem;
  border: 1px solid ${({ theme }) => theme.text_primary + '20'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.card} transparent transparent transparent;
  }
`;

export const Tooltip = ({ children, text }) => {
  const [show, setShow] = React.useState(false);

  return (
    <TooltipContainer onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <TooltipText show={show}>{text}</TooltipText>
    </TooltipContainer>
  );
};

// Radar Chart Component
const ChartContainer = styled.div`
  width: 100%;
  height: ${({ height }) => height || '400px'};
  animation: ${fadeIn} 0.6s ease;
`;

export const RadarChartComponent = ({ data, height }) => {
  return (
    <ChartContainer height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#ffffff30" />
          <PolarAngleAxis dataKey="dimension" stroke="#ffffff" tick={{ fill: '#ffffff', fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#ffffff50" tick={{ fill: '#ffffff80', fontSize: 10 }} />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#2ecc40"
            fill="#2ecc40"
            fillOpacity={0.6}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// Spectrum Slider (for displaying scores)
const SpectrumContainer = styled.div`
  margin: 1.5rem 0;
`;

const SpectrumHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SpectrumName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SpectrumPoles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const Pole = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme, dominant }) => (dominant ? theme.primary : theme.text_secondary)};
  transition: all 0.3s ease;
`;

const SpectrumBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => `linear-gradient(90deg, ${theme.primary}40, ${theme.text_primary}20, ${theme.primary}40)`};
  border-radius: 6px;
  position: relative;
  overflow: hidden;
`;

const SpectrumMarker = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ position }) => position}%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.primary};
  border: 3px solid ${({ theme }) => theme.card};
  border-radius: 50%;
  box-shadow: 0 0 12px ${({ theme }) => theme.primary}80;
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const SpectrumDisplay = ({ name, leftPole, rightPole, leftPercent, rightPercent }) => {
  const markerPosition = leftPercent;
  const dominantSide = leftPercent >= 50 ? 'left' : 'right';

  return (
    <SpectrumContainer>
      <SpectrumName>{name}</SpectrumName>
      <SpectrumPoles>
        <Pole dominant={dominantSide === 'left'}>
          {leftPole} ({leftPercent}%)
        </Pole>
        <Pole dominant={dominantSide === 'right'}>
          {rightPole} ({rightPercent}%)
        </Pole>
      </SpectrumPoles>
      <SpectrumBar>
        <SpectrumMarker position={markerPosition} />
      </SpectrumBar>
    </SpectrumContainer>
  );
};

// Gradient Background
export const GradientBackground = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.bg}, ${({ theme }) => theme.bgLight});
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, ${({ theme }) => theme.primary}15, transparent 70%);
    animation: ${gradientShift} 15s ease infinite;
    background-size: 200% 200%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, ${({ theme }) => theme.primary}10, transparent 70%);
    animation: ${gradientShift} 20s ease infinite reverse;
    background-size: 200% 200%;
  }
`;

// Content Container
export const Container = styled.div`
  max-width: ${({ maxWidth }) => maxWidth || '1200px'};
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Section Title
export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Grid Layout
export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns || 3}, 1fr)`};
  gap: ${({ gap }) => gap || '1.5rem'};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Loading Spinner
const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.text_primary + '20'};
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

// Empty State
const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

export const EmptyState = ({ icon, message }) => (
  <EmptyStateContainer>
    {icon && <EmptyStateIcon>{icon}</EmptyStateIcon>}
    <EmptyStateText>{message}</EmptyStateText>
  </EmptyStateContainer>
);
