import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 672px;
  margin: 0 auto;
  padding: 0 1rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 0 2.5rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 2rem;
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
  color: ${({ theme }) => theme.text_primary};
  border-radius: 999px;
  font-size: 12px;
`;

const projects = [
  {
    logo: "🤖",
    name: "ModelLab",
    type: "ML Testing Platform",
    period: "2025",
    description: "Interactive machine learning testing platform for comparing model performance across different tasks. Features custom evaluation harnesses, model comparison tools, and performance visualization.",
    tech: ["PyTorch", "Python", "React", "Model Evaluation"]
  },
  {
    logo: "🧠",
    name: "16 Tech Personalities",
    type: "Developer Assessment Framework",
    period: "2025",
    description: "Personality framework for tech professionals with 5 key spectrums: Builder vs Analyzer, Speed vs Precision, Generalist vs Specialist, Solo vs Collaborative, and Practical vs Theoretical. Helps developers understand their working style and optimize team dynamics.",
    tech: ["React", "TypeScript", "Psychology", "UX Design"]
  },
  {
    logo: "🍕",
    name: "FoodVision Mini",
    type: "Computer Vision Project",
    period: "2025",
    description: "Food classification system using Vision Transformers (ViT) and EfficientNet architectures. Achieved high accuracy on the Food101 dataset through transfer learning and fine-tuning techniques.",
    tech: ["PyTorch", "Computer Vision", "ViT", "EfficientNet", "Transfer Learning"]
  },
  {
    logo: "✝️",
    name: "SGV Christian Club Collective",
    type: "Community Platform & Events",
    period: "2024-2025",
    description: (
      <>
        <p>Co-founded coalition uniting 15+ high school Christian clubs across the San Gabriel Valley. Built scalable framework for multi-school collaboration, media production, and fundraising.</p>
        <ul>
          <li><strong>Everything Night:</strong> Regional outreach event with 200+ students, 20 breakout sessions</li>
          <li><strong>Chosen:</strong> Worship night with 100 students, dinner, games, and 2 music sets</li>
        </ul>
      </>
    ),
    tech: ["Event Planning", "Leadership", "Community Building", "Media Production"]
  }
];

const WorkPage = () => {
  return (
    <Container>
      <PageTitle>Projects</PageTitle>
      {projects.map((item, idx) => (
        <TimelineItem key={idx}>
          <ItemHeader>
            <Logo>{item.logo}</Logo>
            <ItemContent>
              <ProjectName>{item.name}</ProjectName>
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
