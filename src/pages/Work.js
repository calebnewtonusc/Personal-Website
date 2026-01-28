import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import modellabImg from '../assets/projects/modellab.jpg';
import foodvisionImg from '../assets/projects/foodvision.jpg';
import tech16Img from '../assets/projects/tech16personalities.jpg';
import thelinesImg from '../assets/projects/thelines.jpg';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem 2.5rem;
  }
`;

const HeaderSection = styled.div`
  animation: ${fadeInUp} 0.6s ease-out;
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

const ProjectsSection = styled.div`
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ProjectCard = styled.div`
  position: relative;
  margin-bottom: 4rem;
  padding: 2.5rem;
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
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
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

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ProjectContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: ${({ $reverse }) => $reverse ? '1fr 1.2fr' : '1.2fr 1fr'};
    gap: 3rem;
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.primary}30;
  box-shadow: inset 0 0 60px ${({ theme }) => theme.primary}25,
              0 0 30px ${({ theme }) => theme.primary}20;
  order: ${({ $reverse }) => $reverse ? 2 : 1};

  @media (max-width: 767px) {
    order: 1;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ProjectInfo = styled.div`
  order: ${({ $reverse }) => $reverse ? 1 : 2};

  @media (max-width: 767px) {
    order: 2;
  }
`;


const ProjectName = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.75rem;
  line-height: 1.2;

  @media (max-width: 640px) {
    font-size: 22px;
  }
`;

const ViewProject = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
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
    image: modellabImg,
    name: "ModelLab",
    type: "ML Testing Platform",
    description: "Built and deployed an ML experiment command center (React + Express + PostgreSQL) with dataset versioning (checksums, schema snapshots), run tracking (seed, commit hash, dataset version), and artifact storage for reproducibility. Implemented EvalHarness: standardized metrics.json, slices.json, failure examples with ROC-AUC/PR-AUC/calibration metrics, and compare mode with metric/config/artifact diffs plus p50/p95 latency measurement.",
    tech: ["React", "Express", "PostgreSQL", "Python", "EvalHarness", "Docker"],
    link: "https://modellab.studio",
    internal: false
  },
  {
    image: tech16Img,
    name: "16 Tech Personalities",
    type: "Developer Assessment Framework",
    description: "Designed full-stack personality assessment platform (React + Supabase + PostgreSQL) serving Myers-Briggs style psychometric analysis across 5 behavioral spectrums, generating 16 unique personality types with shareable result URLs and version-locked quiz integrity. Engineered Euclidean distance-based matching algorithm with category-specific flexibility profiles, improving role recommendation coverage by 13% (39%→52%) and reducing over-representation by 55% across 42+ curated engineering positions.",
    tech: ["React", "styled-components", "Supabase", "PostgreSQL", "Recharts", "Vercel"],
    link: "https://16techpersonalities.com",
    internal: false
  },
  {
    image: foodvisionImg,
    name: "Food Vision",
    type: "Computer Vision Project",
    description: "Built and deployed 97.20% accurate computer vision classifier (PyTorch + FastAPI + React) for multi-class food recognition (pizza, steak, sushi) using transfer learning with EfficientNetB2. Implemented complete ML pipeline: data augmentation, progressive fine-tuning, comprehensive evaluation harness with calibration metrics, and full-stack production deployment with FastAPI backend on Hugging Face Spaces and React frontend on Vercel.",
    tech: ["PyTorch", "EfficientNetB2", "FastAPI", "React", "Hugging Face", "Vercel"],
    link: "https://foodvis.in",
    internal: false
  },
  {
    image: thelinesImg,
    name: "The Lines",
    type: "STEM Music Project",
    period: "September 2023 - January 2025",
    description: "Educational STEM music videos combining mathematical concepts with creative songwriting and production. Created engaging content to make calculus and science more accessible and fun for students.",
    tech: ["Music", "Video Production", "Education", "STEM"],
    link: "https://www.youtube.com/playlist?list=PLWhbpQ2inj_p13rmaV6mOdpLu3kTIi8XF",
    internal: false
  }
];

const WorkPage = () => {
  const projectsSectionRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      if (projectsSectionRef.current) {
        observer.observe(projectsSectionRef.current);
      }

      projectRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <HeaderSection>
        <PageTitle>Projects</PageTitle>
        <Subtitle>Things I've built.</Subtitle>
      </HeaderSection>
      <ProjectsSection ref={projectsSectionRef}>
        {projects.map((item, idx) => (
        <ProjectCard key={idx} ref={(el) => (projectRefs.current[idx] = el)}>
          <ProjectContent $reverse={idx % 2 === 1}>
            <ProjectImage $reverse={idx % 2 === 1}>
              <Img src={item.image} alt={item.name} />
            </ProjectImage>
            <ProjectInfo $reverse={idx % 2 === 1}>
              <ProjectName>{item.name}</ProjectName>
              <ProjectType>{item.type}</ProjectType>
              <Period>{item.period}</Period>
              <Description>{item.description}</Description>
              <TechStack>
                {item.tech.map((tech, techIdx) => (
                  <TechTag key={techIdx}>{tech}</TechTag>
                ))}
              </TechStack>
              {item.link && (
                item.internal ? (
                  <ViewProject as={RouterLink} to={item.link}>
                    View this project
                  </ViewProject>
                ) : (
                  <ViewProject href={item.link} target="_blank" rel="noopener noreferrer">
                    View this project
                  </ViewProject>
                )
              )}
            </ProjectInfo>
          </ProjectContent>
        </ProjectCard>
        ))}
      </ProjectsSection>
    </Container>
  );
};

export default WorkPage;
