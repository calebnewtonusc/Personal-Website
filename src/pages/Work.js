import React from 'react';
import styled from 'styled-components';
import selfIcon from '../assets/projects/self_icon_2.png';
import frcVision from '../assets/projects/frcvision.png';
import smslImg from '../assets/projects/smsl.png';

const Container = styled.div`
  max-width: 672px;
  margin: 0 auto;
  padding: 0 1rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 0 2.5rem;
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

const TimelineItem = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Logo = styled.div`
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
  overflow: hidden;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemContent = styled.div`
  flex: 1;
`;

const ProjectName = styled.h2`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.25rem;
`;

const ProjectLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ProjectType = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 0.25rem;
`;

const Period = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 0.75rem;

  ul {
    list-style: disc;
    margin-left: 1.25rem;
    margin-top: 0.5rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 0.75rem;
  }

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const TechTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_secondary};
  border-radius: 999px;
  font-size: 12px;
  opacity: 0.6;
`;

const projects = [
  {
    logo: selfIcon,
    name: "modellab",
    type: "ml testing platform",
    period: "2025",
    description: "interactive machine learning testing platform for comparing model performance across different tasks. features custom evaluation harnesses, model comparison tools, and performance visualization.",
    tech: ["pytorch", "python", "react", "model evaluation"],
    link: null
  },
  {
    logo: selfIcon,
    name: "16 tech personalities",
    type: "developer assessment framework",
    period: "2025",
    description: "personality framework for tech professionals with 5 key spectrums: builder vs analyzer, speed vs precision, generalist vs specialist, solo vs collaborative, and practical vs theoretical. helps developers understand their working style and optimize team dynamics.",
    tech: ["react", "typescript", "psychology", "ux design"],
    link: null
  },
  {
    logo: selfIcon,
    name: "the lines",
    type: "music project",
    period: "september 2023 - january 2025",
    description: "educational calculus music videos combining mathematical concepts with creative songwriting and production. created engaging content to make calculus more accessible and fun for students.",
    tech: ["music", "video production", "education", "calculus"],
    link: "https://www.youtube.com/playlist?list=PLWhbpQ2inj_p13rmaV6mOdpLu3kTIi8XF"
  },
  {
    logo: selfIcon,
    name: "foodvision mini",
    type: "computer vision project",
    period: "2025",
    description: "food classification system using vision transformers (vit) and efficientnet architectures. achieved high accuracy on the food101 dataset through transfer learning and fine-tuning techniques.",
    tech: ["pytorch", "computer vision", "vit", "efficientnet", "transfer learning"],
    link: null
  }
];

const WorkPage = () => {
  return (
    <Container>
      <PageTitle>projects</PageTitle>
      <Subtitle>things i've built.</Subtitle>
      {projects.map((item, idx) => (
        <TimelineItem key={idx}>
          <ItemHeader>
            <Logo>
              {typeof item.logo === 'string' && item.logo.match(/\.(png|jpg|jpeg)$/) ? (
                <LogoImage src={item.logo} alt={item.name} />
              ) : (
                item.logo
              )}
            </Logo>
            <ItemContent>
              <ProjectName>
                {item.link ? (
                  <ProjectLink href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </ProjectLink>
                ) : (
                  item.name
                )}
              </ProjectName>
              <ProjectType>{item.type}</ProjectType>
              <Period>{item.period}</Period>
            </ItemContent>
          </ItemHeader>
          <Description>{item.description}</Description>
          <TechStack>
            {item.tech.map((tech, techIdx) => (
              <TechTag key={techIdx}>{tech}</TechTag>
            ))}
          </TechStack>
        </TimelineItem>
      ))}
    </Container>
  );
};

export default WorkPage;
