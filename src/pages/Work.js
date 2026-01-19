import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import selfIcon from '../assets/projects/self_icon_2.png';
import frcVision from '../assets/projects/frcvision.png';
import smslImg from '../assets/projects/smsl.png';
import modellabImg from '../assets/projects/modellab.jpg';
import foodvisionImg from '../assets/projects/foodvision.jpg';
import tech16Img from '../assets/projects/tech16personalities.jpg';
import curiosityImg from '../assets/projects/curiosity.jpg';

const Container = styled.div`
  max-width: 800px;
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
  width: 64px;
  height: 64px;
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
    width: 56px;
    height: 56px;
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

const ProjectName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  line-height: 1.3;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const ProjectLink = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
    text-decoration: underline;
  }
`;

const ProjectType = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 0.5rem;
  opacity: 0.8;

  @media (max-width: 640px) {
    font-size: 13px;
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

  p {
    margin-bottom: 0.75rem;
  }

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
  }

  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  padding: 0.375rem 0.875rem;
  background: ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.15)'
    : 'rgba(0,0,0,0.08)'};
  color: ${({ theme }) => theme.text_secondary};
  border-radius: 999px;
  font-size: 12px;
  opacity: 0.8;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    font-size: 11px;
    padding: 0.3rem 0.75rem;
  }
`;

const projects = [
  {
    logo: curiosityImg,
    name: "2026 Learning & Exploration",
    type: "Concepts & Technologies to Explore",
    period: "2026",
    description: "Focus areas for 2026: Building production ML systems with PyTorch, exploring transformer architectures and attention mechanisms, diving into computer vision applications, learning ranking systems and recommendation engines, understanding distributed training and model deployment, experimenting with neural architecture search, and building end-to-end ML pipelines from data collection to production inference.",
    tech: ["PyTorch", "Transformers", "Computer Vision", "Ranking Systems", "Distributed Training", "MLOps", "Neural Architecture Search"],
    link: null,
    isImage: true
  },
  {
    logo: modellabImg,
    name: "ModelLab",
    type: "ML Testing Platform",
    period: "January 2025",
    description: "Built an ML experiment command center with dataset versioning (checksums, schema snapshots), run tracking (seed, commit hash, dataset version), and artifact storage for reproducibility. Implemented EvalHarness: standardized metrics.json, slices.json, failure examples, and compare mode with metric/config/artifact diffs plus p50/p95 latency measurement.",
    tech: ["PyTorch", "Python", "sklearn", "Dataset Versioning", "Reproducibility"],
    link: "/modellab",
    internal: true,
    isImage: true
  },
  {
    logo: tech16Img,
    name: "Tech 16 Personalities",
    type: "Developer Assessment Framework",
    period: "January 2025",
    description: "Implemented a 40-question Likert quiz that scores 5 spectrums and outputs a 4-letter Tech Type plus suffix (-A/-T); stores raw trait percentages and quiz version for integrity. Built CMS-like content + role mapping (trait-weighted RoleScore) and share features (results card, optional compare) using Next.js + TypeScript + Tailwind with Supabase Auth/Postgres.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Postgres"],
    link: "/tech16",
    internal: true,
    isImage: true
  },
  {
    logo: foodvisionImg,
    name: "FoodVision Mini",
    type: "Computer Vision Project",
    period: "December 2025",
    description: "Trained a Food101 image classifier with a fast 3-class mini mode (pizza, steak, sushi); baseline EfficientNetB2 feature extractor with one meaningful improvement via transfer learning. Shipped a defensible eval report (accuracy, top-5, confusion matrix, calibration, failure examples) and measured CPU inference latency (warmup, p50/p95); served via FastAPI with a simple UI.",
    tech: ["PyTorch", "EfficientNet", "FastAPI", "Transfer Learning"],
    link: "/foodvision",
    internal: true,
    isImage: true
  },
  {
    logo: selfIcon,
    name: "The Lines",
    type: "Music Project",
    period: "September 2023 - January 2025",
    description: "Educational calculus music videos combining mathematical concepts with creative songwriting and production. Created engaging content to make calculus more accessible and fun for students.",
    tech: ["Music", "Video Production", "Education", "Calculus"],
    link: "https://www.youtube.com/playlist?list=PLWhbpQ2inj_p13rmaV6mOdpLu3kTIi8XF",
    isImage: true
  }
];

const WorkPage = () => {
  return (
    <Container>
      <PageTitle>Projects</PageTitle>
      <Subtitle>Things I've built.</Subtitle>
      {projects.map((item, idx) => (
        <GlassCard key={idx}>
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
        </GlassCard>
      ))}
    </Container>
  );
};

export default WorkPage;
