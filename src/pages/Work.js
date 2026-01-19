import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import selfIcon from '../assets/projects/self_icon_2.png';
import frcVision from '../assets/projects/frcvision.png';
import smslImg from '../assets/projects/smsl.png';
import modellabImg from '../assets/projects/modellab.jpg';
import foodvisionImg from '../assets/projects/foodvision.jpg';
import tech16Img from '../assets/projects/tech16personalities.jpg';

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
    name: "2026 Learning & Exploration",
    type: "Concepts & Technologies to Explore",
    period: "2026",
    description: "Focus areas for 2026: Building production ML systems with PyTorch, exploring transformer architectures and attention mechanisms, diving into computer vision applications, learning ranking systems and recommendation engines, understanding distributed training and model deployment, experimenting with neural architecture search, and building end-to-end ML pipelines from data collection to production inference.",
    tech: ["PyTorch", "Transformers", "Computer Vision", "Ranking Systems", "Distributed Training", "MLOps", "Neural Architecture Search"],
    link: null
  },
  {
    logo: modellabImg,
    name: "ModelLab",
    type: "ML Testing Platform",
    period: "January 2025",
    description: "Built an ML experiment command center with dataset versioning (checksums, schema snapshots), run tracking (seed, commit hash, dataset version), and artifact storage for reproducibility. Implemented EvalHarness: standardized metrics.json, slices.json, failure examples, and compare mode with metric/config/artifact diffs plus p50/p95 latency measurement.",
    tech: ["PyTorch", "Python", "sklearn", "Dataset Versioning", "Reproducibility"],
    link: "/modellab",
    internal: true
  },
  {
    logo: tech16Img,
    name: "Tech 16 Personalities",
    type: "Developer Assessment Framework",
    period: "January 2025",
    description: "Implemented a 40-question Likert quiz that scores 5 spectrums and outputs a 4-letter Tech Type plus suffix (-A/-T); stores raw trait percentages and quiz version for integrity. Built CMS-like content + role mapping (trait-weighted RoleScore) and share features (results card, optional compare) using Next.js + TypeScript + Tailwind with Supabase Auth/Postgres.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Postgres"],
    link: "/tech16",
    internal: true
  },
  {
    logo: selfIcon,
    name: "The Lines",
    type: "Music Project",
    period: "September 2023 - January 2025",
    description: "Educational calculus music videos combining mathematical concepts with creative songwriting and production. Created engaging content to make calculus more accessible and fun for students.",
    tech: ["Music", "Video Production", "Education", "Calculus"],
    link: "https://www.youtube.com/playlist?list=PLWhbpQ2inj_p13rmaV6mOdpLu3kTIi8XF"
  },
  {
    logo: foodvisionImg,
    name: "FoodVision Mini",
    type: "Computer Vision Project",
    period: "December 2025",
    description: "Trained a Food101 image classifier with a fast 3-class mini mode (pizza, steak, sushi); baseline EfficientNetB2 feature extractor with one meaningful improvement via transfer learning. Shipped a defensible eval report (accuracy, top-5, confusion matrix, calibration, failure examples) and measured CPU inference latency (warmup, p50/p95); served via FastAPI with a simple UI.",
    tech: ["PyTorch", "EfficientNet", "FastAPI", "Transfer Learning"],
    link: "/foodvision",
    internal: true
  }
];

const WorkPage = () => {
  return (
    <Container>
      <PageTitle>Projects</PageTitle>
      <Subtitle>Things I've built.</Subtitle>
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
                  item.internal ? (
                    <ProjectLink as={RouterLink} to={item.link}>
                      {item.name}
                    </ProjectLink>
                  ) : (
                    <ProjectLink href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </ProjectLink>
                  )
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
