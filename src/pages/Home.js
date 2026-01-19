import React from 'react';
import styled from 'styled-components';
import HeroImg from '../assets/CalebAtUSC.jpg';
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
            studying @ <GlassTag logo={uscLogo} href="https://www.usc.edu">usc</GlassTag>
          </>
        ),
        nested: [
          "computer science + applied mathematics major",
          "diving deep into ml foundations—pytorch, transformers, computer vision, and ranking systems"
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
            software engineer @ <GlassTag logo={ainaTechLogo} href="https://ainatech.com">aina tech</GlassTag>
          </>
        ),
        nested: [
          "assisting in development of aina's foundational generative 3d model using gaussian splatting and neural radiance fields (nerfs) for photorealistic spatial video and holographic rendering",
          "supporting day-to-day studio operations by managing volumetric capture workflows and data quality checks",
          "collaborating across software r&d and business initiatives as aina builds flexible, ai-driven holographic content creation for industry and entertainment"
        ]
      },
      {
        text: (
          <>
            co-founder @ <GlassTag logo={smslLogo}>sgv christian club collective</GlassTag>
          </>
        ),
        nested: [
          "spearheaded formation of a coalition uniting 15+ high school christian clubs across the san gabriel valley",
          "pioneered a scalable framework for multi-school collaboration, media, and fundraising that emphasized community-building",
          "chosen (4/12/2025): worship night with 100 students serving dinner, leading games, and performing 2 worship music sets",
          "everything night (5/23/2025): first-of-its-kind regional outreach event attracting 200+ students to 20 breakout sessions"
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
            research assistant @ <GlassTag logo={caltechLogo} href="https://www.caltech.edu">caltech</GlassTag>
          </>
        ),
        nested: [
          "collaborated with taylan kargin, ph.d., on control theory research",
          "created simulations and visual models that translated complex engineering concepts into digestible tools for vendors and stakeholders in aerospace, autonomous systems, and robotics"
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
            leadership development @ <GlassTag logo={impact360Logo} href="https://impact360institute.org">impact 360 institute</GlassTag>
          </>
        ),
        nested: [
          "completed two summers of christian leadership training focused on character, servant leadership, and communication",
          "strengthened my ability to collaborate, make decisions, and lead with empathy and purpose"
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
        <Name>hi, i'm caleb newton</Name>
        <Location>los angeles, ca</Location>
        <Skills>
          <Skill>machine learning</Skill>
          <Skill>computer vision</Skill>
        </Skills>
        <Tagline>cs + applied math @ usc</Tagline>
        <Mission>
          making software that makes people's lives better.
        </Mission>
      </ProfileSection>

      <TimelineSection>
        <TimelineTitle>timeline</TimelineTitle>
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
