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
`;

const Company = styled.h2`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.25rem;
`;

const Role = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
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

const workExperience = [
  {
    logo: "🔬",
    company: "Aina Tech, Inc.",
    role: "Software Engineer + Immersive Studio Production Assistant",
    period: "September 2025 - Present",
    href: "https://ainatech.com",
    description: "Building the future of holographic video through Gaussian Splatting, Neural Radiance Fields, and the coolest camera rig on Earth."
  },
  {
    logo: "✝️",
    company: "SGV Christian Club Collective",
    role: "Co-Founder",
    period: "November 2024 - June 2025",
    description: (
      <>
        <p>Spearheaded formation of a coalition uniting 15+ high school Christian clubs across the San Gabriel Valley with Rianna Marquez. Pioneered a scalable framework for multi-school collaboration, media, and fundraising that emphasized community-building.</p>
        <ul>
          <li><strong>Chosen (April 2025):</strong> Worship night with 100 students serving dinner, leading games, and performing 2 worship music sets</li>
          <li><strong>Everything Night (May 2025):</strong> First-of-its-kind regional outreach event attracting 200+ students to 20 breakout sessions (from dodgeball to guest speaker talks to Bible studies)</li>
        </ul>
      </>
    )
  },
  {
    logo: "🔬",
    company: "Caltech",
    role: "Research Assistant",
    period: "August 2024 - June 2025",
    description: "Collaborated with Taylan Kargin, Ph.D., on control theory research, creating simulations and visual models that translated complex engineering concepts into digestible tools for vendors and stakeholders in aerospace, autonomous systems, and robotics."
  },
  {
    logo: "🏔️",
    company: "Impact 360 Institute",
    role: "Leadership Development Program",
    period: "June 2022 - July 2023",
    description: "Completed two summers of Christian leadership training focused on character, servant leadership, and communication, strengthening my ability to collaborate, make decisions, and lead with empathy and purpose."
  }
];

const projects = [
  {
    logo: "🤖",
    company: "ModelLab",
    role: "Personal Project",
    period: "2025",
    description: "Interactive ML testing platform for comparing model performance across tasks. Features custom evaluation harnesses and model comparison tools built with PyTorch."
  },
  {
    logo: "🧠",
    company: "16 Tech Personalities Assessment",
    role: "Personal Project",
    period: "2025",
    description: "Created a personality framework for tech professionals with 5 key spectrums (Builder vs Analyzer, Speed vs Precision, Generalist vs Specialist, Solo vs Collaborative, Practical vs Theoretical). Helps developers understand their working style and team dynamics."
  },
  {
    logo: "🍕",
    company: "FoodVision Mini",
    role: "Computer Vision Project",
    period: "2025",
    description: "Food classification system using Vision Transformers and EfficientNet. Achieved high accuracy on Food101 dataset with transfer learning techniques."
  }
];

const WorkPage = () => {
  return (
    <Container>
      <PageTitle>Work</PageTitle>
      {workExperience.map((item, idx) => (
        <TimelineItem key={idx}>
          <ItemHeader>
            <Logo href={item.href} target="_blank" rel="noopener noreferrer">
              {item.logo}
            </Logo>
            <ItemContent>
              <Company>{item.company}</Company>
              <Role>{item.role}</Role>
              <Period>{item.period}</Period>
            </ItemContent>
          </ItemHeader>
          <Description>{item.description}</Description>
        </TimelineItem>
      ))}

      <PageTitle style={{ marginTop: '3rem' }}>Projects</PageTitle>
      {projects.map((item, idx) => (
        <TimelineItem key={idx}>
          <ItemHeader>
            <Logo>{item.logo}</Logo>
            <ItemContent>
              <Company>{item.company}</Company>
              <Role>{item.role}</Role>
              <Period>{item.period}</Period>
            </ItemContent>
          </ItemHeader>
          <Description>{item.description}</Description>
        </TimelineItem>
      ))}
    </Container>
  );
};

export default WorkPage;
