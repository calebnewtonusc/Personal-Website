import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
  padding: 100px 20px 80px 20px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
`;

const BackButton = styled.button`
  background: transparent;
  border: 1.8px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Tagline = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 24px;
`;

const ComingSoonBadge = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const Section = styled.div`
  background: ${({ theme }) => theme.card};
  border: 0.1px solid ${({ theme }) => theme.primary};
  box-shadow: rgba(34, 139, 34, 0.4) 0px 4px 24px;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`;

const ListItem = styled.li`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary + 99};
  padding: 8px 0 8px 20px;
  position: relative;
  line-height: 1.6;
  &:before {
    content: "→";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const SpectrumCard = styled.div`
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => theme.primary + 40};
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
`;

const SpectrumTitle = styled.h4`
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  margin-bottom: 8px;
`;

const SpectrumRange = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 4px;
`;

const Tech16 = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <BackButton onClick={() => navigate('/')}>
          <ArrowBackIcon /> Back to Home
        </BackButton>

        <Header>
          <Title>16 Tech Personalities</Title>
          <Tagline>Find Your Tech Career Identity</Tagline>
          <ComingSoonBadge>🚀 Launching Spring 2026</ComingSoonBadge>
        </Header>

        <Section>
          <SectionTitle>The Problem</SectionTitle>
          <Text>
            Students interested in tech careers face overwhelming options: frontend, backend, ML, DevOps,
            product, design, data science... How do you know what role actually fits your working style,
            interests, and strengths? Career advice is often generic or based on superficial interests
            rather than genuine cognitive and temperamental fit.
          </Text>
        </Section>

        <Section>
          <SectionTitle>The Solution</SectionTitle>
          <Text>
            16 Tech Personalities is a 16Personalities-style assessment that maps your working preferences
            across 5 key spectrums to reveal your Tech Personality Type. Based on your results, you get:
          </Text>
          <List>
            <ListItem>Your unique Tech Personality (e.g., "Architect-Builder", "User Champion", "Systems Strategist")</ListItem>
            <ListItem>Recommended tech roles that align with how you actually work and think</ListItem>
            <ListItem>Personalized skill roadmaps for your career path</ListItem>
            <ListItem>Curated resources, courses, and projects tailored to your personality</ListItem>
          </List>
          <Text>
            It's not about what languages you know—it's about discovering the role where you'll genuinely thrive.
          </Text>
        </Section>

        <Section>
          <SectionTitle>The 5 Spectrums</SectionTitle>

          <SpectrumCard>
            <SpectrumTitle>1. Focus Dimension</SpectrumTitle>
            <SpectrumRange>
              <span>Builder ←</span>
              <span>→ Analyzer</span>
            </SpectrumRange>
            <Text style={{ fontSize: '14px', marginTop: '8px' }}>
              Do you love shipping features fast, or meticulously understanding systems before you build?
            </Text>
          </SpectrumCard>

          <SpectrumCard>
            <SpectrumTitle>2. Interface Preference</SpectrumTitle>
            <SpectrumRange>
              <span>User-Facing ←</span>
              <span>→ Systems-Facing</span>
            </SpectrumRange>
            <Text style={{ fontSize: '14px', marginTop: '8px' }}>
              Are you energized by user interactions and UI, or by infrastructure and backend systems?
            </Text>
          </SpectrumCard>

          <SpectrumCard>
            <SpectrumTitle>3. Change Style</SpectrumTitle>
            <SpectrumRange>
              <span>Exploratory ←</span>
              <span>→ Operational</span>
            </SpectrumRange>
            <Text style={{ fontSize: '14px', marginTop: '8px' }}>
              Do you thrive in 0-to-1 innovation, or in scaling and optimizing existing systems?
            </Text>
          </SpectrumCard>

          <SpectrumCard>
            <SpectrumTitle>4. Decision Driver</SpectrumTitle>
            <SpectrumRange>
              <span>Vision-Led ←</span>
              <span>→ Logic-Led</span>
            </SpectrumRange>
            <Text style={{ fontSize: '14px', marginTop: '8px' }}>
              Are you driven by intuition and user impact, or by data, metrics, and first principles?
            </Text>
          </SpectrumCard>

          <SpectrumCard>
            <SpectrumTitle>5. Execution Temperament</SpectrumTitle>
            <SpectrumRange>
              <span>Adaptive ←</span>
              <span>→ Structured</span>
            </SpectrumRange>
            <Text style={{ fontSize: '14px', marginTop: '8px' }}>
              Do you prefer flexibility and pivoting, or defined processes and systematic execution?
            </Text>
          </SpectrumCard>
        </Section>

        <Section>
          <SectionTitle>Key Features</SectionTitle>
          <List>
            <ListItem>Thoughtfully designed quiz with scenario-based questions (not just "do you like design?")</ListItem>
            <ListItem>16 distinct Tech Personality types with detailed profiles</ListItem>
            <ListItem>Role recommendations: Frontend, Backend, ML/AI, DevOps, Product, Design, Data, etc.</ListItem>
            <ListItem>Personalized skill roadmaps showing what to learn next for your path</ListItem>
            <ListItem>Curated resources: courses, projects, books, and communities</ListItem>
            <ListItem>Shareable results with beautiful visuals</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Tech Stack</SectionTitle>
          <TechStack>
            <TechTag>Next.js (App Router)</TechTag>
            <TechTag>TypeScript</TechTag>
            <TechTag>Tailwind CSS</TechTag>
            <TechTag>FastAPI</TechTag>
            <TechTag>Supabase</TechTag>
            <TechTag>Vercel</TechTag>
            <TechTag>Chart.js</TechTag>
          </TechStack>
        </Section>

        <Section>
          <SectionTitle>Why I'm Building This</SectionTitle>
          <Text>
            I spent months figuring out what kind of tech work I actually enjoy. I tried entrepreneurship,
            product thinking, and design before realizing I'm most alive when I'm going deep on the technical
            side—ML systems, algorithms, infrastructure. This tool would have saved me time and confusion.
          </Text>
          <Text>
            Plus, it's a chance to build a full-stack app with personality assessment logic, data visualization,
            recommendation algorithms, and a polished user experience—all skills I want to develop.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Timeline</SectionTitle>
          <List>
            <ListItem><strong>Week 1-2 (Jan 2026)</strong> - Quiz logic, spectrum scoring, database schema</ListItem>
            <ListItem><strong>February 2026</strong> - 16 personality profiles, role recommendations, roadmap generation</ListItem>
            <ListItem><strong>March 2026</strong> - UI polish, resource curation, deployment and beta testing</ListItem>
          </List>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Tech16;
