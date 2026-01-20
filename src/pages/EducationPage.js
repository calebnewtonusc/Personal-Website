import React from 'react';
import styled from 'styled-components';
import uscLogo from '../assets/logos/usc.png';
import berkeleyLogo from '../assets/education/berkeley.png';
import uclaLogo from '../assets/education/ucla_logo.png';
import smhsLogo from '../assets/education/smhs.png';
import cnsiImg from '../assets/cnsi_ucla.jpg';
import stjohnsImg from '../assets/stjohns.jpg';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem 2.5rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
  line-height: 1.1;

  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 3rem;
  opacity: 0.8;
`;

const GlassCard = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)'};
  border: 1px solid ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(0,0,0,0.08)'};
  box-shadow: ${({ theme }) => theme.bg === '#0a0a0a'
    ? '0 8px 32px -4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
    : '0 8px 32px -4px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)'};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.bg === '#0a0a0a'
      ? '0 12px 40px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)'
      : '0 12px 40px -4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)'};
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.04;
    mix-blend-mode: soft-light;
    pointer-events: none;
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(255,255,255,0.95)'};
  border: 1px solid ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.15)'
    : 'rgba(0,0,0,0.08)'};
  box-shadow: ${({ theme }) => theme.bg === '#0a0a0a'
    ? '0 4px 12px rgba(0,0,0,0.3)'
    : '0 4px 12px rgba(0,0,0,0.08)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  padding: 0.75rem;

  @media (max-width: 640px) {
    width: 72px;
    height: 72px;
    padding: 0.625rem;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const Institution = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  line-height: 1.3;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const Degree = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  opacity: 0.9;
  line-height: 1.4;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const Period = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.7;

  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 0.75rem;
  opacity: 0.9;

  ul {
    list-style: disc;
    margin-left: 1.25rem;
    margin-top: 0.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

const LearnMore = styled.a`
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }

  &::after {
    content: ' →';
  }
`;

const education = [
  {
    logo: uscLogo,
    isImage: true,
    institution: "University of Southern California",
    degree: "Bachelor of Science - Mathematics and Computer Science",
    period: "2025 - May 2029",
    url: "https://www.usc.edu",
    description: (
      <ul>
        <li>Viterbi School of Engineering</li>
        <li>Focus: Machine Learning Systems + Data/ML Engineering</li>
        <li>Spring 2026 Courses: Multivariable Calculus, Linear Algebra & Differential Equations, C++, Discrete Methods in CS</li>
        <li><strong>Learning Interests:</strong> Building production ML systems with PyTorch, exploring transformer architectures and attention mechanisms, diving into computer vision applications, learning ranking systems and recommendation engines, understanding distributed training and model deployment, experimenting with neural architecture search, and building end-to-end ML pipelines</li>
      </ul>
    )
  },
  {
    logo: smhsLogo,
    isImage: true,
    institution: "San Marino High School",
    degree: "High School Diploma",
    period: "August 2021 - June 2025",
    url: "https://www.sanmarinohs.org",
    description: (
      <ul>
        <li>Promethean: Highest honor for a graduating student at San Marino High School</li>
        <li>Person Who Made Calculus Fun, Most Likely to Star in a Calculus Video</li>
        <li>AP Scholar with Distinction</li>
        <li>National Merit Commended Student</li>
        <li>ACTS Christian Club Vice President (11th) and President (12th)</li>
        <li>Baseball, Wrestling, Football</li>
      </ul>
    )
  },
  {
    logo: berkeleyLogo,
    isImage: true,
    institution: "UC Berkeley College of Engineering",
    degree: "Summer Program - Computer Science",
    period: "June 2024 - June 2024",
    url: "https://precollege.berkeley.edu/summer-computer-science-academy",
    description: "Completed intensive BJC-based course in abstraction, recursion, algorithms, and introductory ML through Snap! and Python."
  },
  {
    logo: cnsiImg,
    isImage: true,
    institution: "California Nanosystems Institute at UCLA",
    degree: "Summer Program - Nanotechnology + Entrepreneurship",
    period: "July 2023",
    url: "https://cnsi.ucla.edu/applications-of-nanoscience-summer-program/",
    description: "Developed AquaShield (hydrophobic water bottle) in a two-week STEM + entrepreneurship program, pitching to investors and applying MATLAB for analysis."
  },
  {
    logo: stjohnsImg,
    isImage: true,
    institution: "St. John's Nursery School",
    degree: "Certified Juice Box Connoisseur",
    period: "August 2010 - June 2011",
    url: "https://www.stjohnsnurseryla.com",
    description: (
      <div>
        <p>Fundamentals of Sharing, Naptime Negotiation, and Sandbox Engineering</p>
        <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>Activities: Block Tower Construction Club, Tricycle Racing League, Story Time Enthusiasts</p>
        <p style={{ marginTop: '0.5rem' }}>Built early STEM skills by testing gravity with block towers, racing tricycles, and asking "why?" 47 times a day.</p>
      </div>
    )
  }
];

const EducationPage = () => {
  return (
    <Container>
      <PageTitle>Education</PageTitle>
      <Subtitle>Where I've learned.</Subtitle>
      {education.map((item, idx) => (
        <GlassCard key={idx}>
          <ItemHeader>
            <Logo>
              {item.isImage ? (
                <LogoImage src={item.logo} alt={item.institution} />
              ) : (
                item.logo
              )}
            </Logo>
            <ItemContent>
              <Institution>{item.institution}</Institution>
              <Degree>{item.degree}</Degree>
              <Period>{item.period}</Period>
            </ItemContent>
          </ItemHeader>
          <Description>{item.description}</Description>
          {item.url && (
            <LearnMore href={item.url} target="_blank" rel="noopener noreferrer">
              Learn more
            </LearnMore>
          )}
        </GlassCard>
      ))}
    </Container>
  );
};

export default EducationPage;
