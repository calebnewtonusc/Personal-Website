import React from 'react';
import styled from 'styled-components';
import HeroImg from '../assets/CalebAtBeach.jpg';
import GlassTag from '../components/GlassTag';
import uscLogo from '../assets/logos/usc.png';
import ainaTechLogo from '../assets/logos/learninglyai.png';
import caltechLogo from '../assets/logos/caltech.png';
import impact360Logo from '../assets/logos/impact360.png';
import smslLogo from '../assets/projects/smsl.png';

const Container = styled.div`
  max-width: 672px;
  margin: 0 auto;
  padding: 0 1rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 0 2.5rem;
  }
`;

const ProfileSection = styled.section`
  margin-bottom: 4rem;
`;

const ProfileImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.border};
`;

const Name = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
  line-height: 1.1;

  @media (min-width: 640px) {
    font-size: 3rem;
  }

  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`;

const Location = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.text_secondary};
    opacity: 0.4;
  }
`;

const Skills = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`;

const Skill = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_secondary};
  border-radius: 999px;
  font-size: 12px;
  opacity: 0.6;
`;

const Tagline = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 0.5rem;
  opacity: 0.7;
`;

const Mission = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.7;
`;

const TimelineSection = styled.section`
  margin-top: 4rem;
`;

const TimelineTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 2rem;
  letter-spacing: -0.025em;

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${({ theme }) => theme.border};
  opacity: 0.3;
`;

const TimelineItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const YearBlock = styled.div`
  position: relative;
  padding-left: 2.5rem;
`;

const YearDot = styled.div`
  position: absolute;
  left: 2px;
  top: 14px;
  width: 4px;
  height: 2px;
  background: ${({ theme }) => theme.text_secondary};
  opacity: 0.2;
`;

const YearDotCircle = styled.div`
  position: absolute;
  left: 6px;
  top: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}26;
`;

const YearVerticalLine = styled.div`
  position: absolute;
  left: 10px;
  top: 22px;
  bottom: -12px;
  width: 2px;
  background: ${({ theme }) => theme.border};
  opacity: 0.1;
`;

const Year = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 0.75rem;
  opacity: 0.7;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Item = styled.li`
  position: relative;
  padding-left: 1.25rem;
  color: ${({ theme }) => theme.text_primary};
  font-size: 15px;
  line-height: 1.6;
  opacity: 0.8;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.text_secondary};
    opacity: 0.4;
  }
`;

const NestedList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0.25rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid ${({ theme }) => `${theme.primary}33`};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NestedItem = styled.li`
  position: relative;
  padding-left: 1rem;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.7;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    opacity: 0.6;
  }
`;

const Link = styled.a`
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const timelineData = [
  {
    year: "2026",
    items: [
      {
        text: (
          <>
            research assistant @ <GlassTag logo={uscLogo} href="https://www.usc.edu">USC</GlassTag>
          </>
        ),
        nested: [
          "Coming soon - Machine learning research position at University of Southern California"
        ]
      },
      {
        text: (
          <>
            software engineer @ <GlassTag logo={ainaTechLogo} href="https://www.ainatech.ai/">Aina Tech</GlassTag>
          </>
        ),
        nested: [
          "Assisting in development of Aina's foundational generative 3D model using Gaussian Splatting and Neural Radiance Fields (NeRFs) for photorealistic spatial video and holographic rendering",
          "Supporting day-to-day studio operations by managing volumetric capture workflows and data quality checks to maintain high-fidelity 3D reconstruction across diverse environments",
          "Collaborating across software R&D and business initiatives as Aina builds flexible, AI-driven holographic content creation for industry and entertainment",
          "Have helped set up, operate, and break down a 75-camera volumetric capture rig, supporting calibration, synchronization, and reliable capture runs"
        ]
      }
    ]
  },
  {
    year: "2025",
    items: [
      {
        text: (
          <>
            co-founder @ <GlassTag logo={smslLogo} href="/everything-night">SGV Christian Club Collective</GlassTag>
          </>
        ),
        nested: [
          "Spearheaded formation of a coalition uniting 15+ high school Christian clubs across the San Gabriel Valley",
          "Conceived and executed Everything Night, a first-of-its-kind regional event attracting 200+ students to 20 breakout sessions",
          "Exercised visionary leadership by filtering and curating the strongest student-led ideas into a cohesive program that maximized impact",
          "Pioneered a scalable framework for multi-school collaboration, media, and fundraising that emphasized community-building and created a replicable model for regional impact"
        ]
      }
    ]
  },
  {
    year: "2024",
    items: [
      {
        text: (
          <>
            research assistant @ <GlassTag logo={caltechLogo} href="https://www.caltech.edu">Caltech</GlassTag>
          </>
        ),
        nested: [
          "Built MATLAB and Python simulations to compare Taylan Kargin's control model against three alternatives; produced visualizations to communicate stability, efficiency, and scalability trade-offs",
          "Created system models and plots to distill theory into actionable insights for faculty and peers; supported evaluation for aerospace and robotics control strategies"
        ]
      }
    ]
  },
  {
    year: "2022-2023",
    items: [
      {
        text: (
          <>
            leadership development @ <GlassTag logo={impact360Logo} href="https://impact360institute.org">Impact 360 Institute</GlassTag>
          </>
        ),
        nested: [
          "Completed two summers of Christian leadership training focused on character, servant leadership, and communication",
          "Strengthened my ability to collaborate, make decisions, and lead with empathy and purpose"
        ]
      }
    ]
  }
];

const HomePage = () => {
  return (
    <Container>
      <ProfileSection>
        <ProfileImage src={HeroImg} alt="Caleb Newton" />
        <Name>Hi, I'm Caleb Newton</Name>
        <Location>Los Angeles, CA</Location>
        <Skills>
          <Skill>Machine Learning</Skill>
          <Skill>Computer Vision</Skill>
        </Skills>
        <Tagline>CS + Applied Math @ USC</Tagline>
        <Mission>
          Making software that makes people's lives better.
        </Mission>
      </ProfileSection>

      <TimelineSection>
        <TimelineTitle>Timeline</TimelineTitle>
        <TimelineContainer>
          <TimelineLine />
          <TimelineItems>
            {timelineData.map((yearBlock, idx) => (
              <YearBlock key={idx}>
                <YearDot />
                <YearDotCircle />
                {idx < timelineData.length - 1 && <YearVerticalLine />}
                <Year>{yearBlock.year}</Year>
                <ItemsList>
                  {yearBlock.items.map((item, itemIdx) => (
                    <Item key={itemIdx}>
                      <div>{item.text}</div>
                      {item.nested && item.nested.length > 0 && (
                        <NestedList>
                          {item.nested.map((nestedItem, nestedIdx) => (
                            <NestedItem key={nestedIdx}>{nestedItem}</NestedItem>
                          ))}
                        </NestedList>
                      )}
                    </Item>
                  ))}
                </ItemsList>
              </YearBlock>
            ))}
          </TimelineItems>
        </TimelineContainer>
      </TimelineSection>
    </Container>
  );
};

export default HomePage;
