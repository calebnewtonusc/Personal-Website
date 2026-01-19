import React from 'react';
import styled from 'styled-components';
import HeroImg from '../assets/Newton_Caleb_Photo.png';

const Container = styled.div`
  max-width: 672px;
  margin: 0 auto;
  padding: 0 1rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 0 2.5rem;
  }
`;

const ProfileImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.border};
`;

const Name = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
`;

const Location = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 1rem;
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
  color: ${({ theme }) => theme.text_primary};
  border-radius: 999px;
  font-size: 13px;
`;

const Tagline = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
`;

const Mission = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 3rem;
`;

const YearSection = styled.div`
  margin-bottom: 3rem;
`;

const Year = styled.h2`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TimelineItem = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

const Logo = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 24px;
  text-decoration: none;
  cursor: ${({ href }) => href ? 'pointer' : 'default'};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme, href }) => href ? theme.card : theme.bgLight};
  }
`;

const ItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.h3`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.25rem;
  line-height: 1.4;
`;

const ItemDescription = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};

  ul {
    list-style: disc;
    margin-left: 1.25rem;
    margin-top: 0.5rem;
  }

  li {
    margin-bottom: 0.25rem;
  }
`;

const timelineData = [
  {
    year: "2026",
    items: [
      {
        logo: "🎓",
        title: "Stats & ML @ USC",
        description: "Currently studying Computer Science + Applied Mathematics at USC, diving deep into ML foundations—PyTorch, transformers, computer vision, and ranking systems."
      }
    ]
  },
  {
    year: "2025",
    items: [
      {
        logo: "🔬",
        title: "Aina Tech - Software Engineer",
        href: "https://ainatech.com",
        description: "Building the future of holographic video through Gaussian Splatting and Neural Radiance Fields."
      },
      {
        logo: "✝️",
        title: "SGV Christian Club Collective",
        description: "Co-founded coalition uniting 15+ high school Christian clubs. Organized Everything Night (200+ students, 20 breakout sessions) and Chosen worship night (100 students)."
      },
      {
        logo: "⚾",
        title: "Baseball - Varsity Pitcher",
        description: "17 consecutive scoreless innings senior year. Learned discipline through injury recovery."
      }
    ]
  },
  {
    year: "2024",
    items: [
      {
        logo: "🔬",
        title: "Caltech Research Assistant",
        description: "Control theory research with Dr. Taylan Kargin, creating simulations for aerospace and autonomous systems."
      },
      {
        logo: "💡",
        title: "Projects: ModelLab, Tech16, FoodVision",
        description: (
          <ul>
            <li>ModelLab: Interactive ML testing platform for model comparison</li>
            <li>16 Tech Personalities: Framework for understanding developer working styles</li>
            <li>FoodVision: Food classification using Vision Transformers</li>
          </ul>
        )
      }
    ]
  },
  {
    year: "2022-2023",
    items: [
      {
        logo: "🏔️",
        title: "Impact 360 Institute",
        description: "Two summers of Christian leadership training focused on character, servant leadership, and communication."
      }
    ]
  }
];

const HomePage = () => {
  return (
    <Container>
      <ProfileImage src={HeroImg} alt="Caleb Newton" />
      <Name>Caleb Newton</Name>
      <Location>Los Angeles, CA</Location>
      <Skills>
        <Skill>machine learning</Skill>
        <Skill>statistics</Skill>
      </Skills>
      <Tagline>stats & ml @ usc</Tagline>
      <Mission>
        Making software that makes people's lives better.
      </Mission>

      {timelineData.map((yearSection, idx) => (
        <YearSection key={idx}>
          <Year>{yearSection.year}</Year>
          {yearSection.items.map((item, itemIdx) => (
            <TimelineItem key={itemIdx}>
              <ItemHeader>
                <Logo href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.logo}
                </Logo>
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </ItemContent>
              </ItemHeader>
            </TimelineItem>
          ))}
        </YearSection>
      ))}
    </Container>
  );
};

export default HomePage;
