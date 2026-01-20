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
  &:before {
    content: "✓";
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

const ModelLab = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <BackButton onClick={() => navigate('/')}>
          <ArrowBackIcon /> Back to Home
        </BackButton>

        <Header>
          <Title>ModelLab</Title>
          <Tagline>ML Experiment Command Center</Tagline>
          <ComingSoonBadge>🚀 Launching Spring 2026</ComingSoonBadge>
        </Header>

        <Section>
          <SectionTitle>The Problem</SectionTitle>
          <Text>
            ML experimentation today is messy. Scattered notebooks, forgotten hyperparameters,
            unreproducible results, and no honest way to compare model performance. When you're
            learning ML, you need a system that makes experimentation clean, reproducible, and
            intellectually honest about what works and what doesn't.
          </Text>
        </Section>

        <Section>
          <SectionTitle>The Solution</SectionTitle>
          <Text>
            ModelLab is an ML experiment command center designed for reproducible, honest machine learning.
            It handles the full lifecycle of an ML experiment: dataset versioning, training job orchestration,
            standardized evaluation with EvalHarness, artifact storage, and run comparison.
          </Text>
          <Text>
            Every experiment is tracked, every hyperparameter is logged, and every result is reproducible
            with a single command. No more "it worked on my laptop" or "I forgot what settings I used."
          </Text>
        </Section>

        <Section>
          <SectionTitle>Key Features</SectionTitle>
          <List>
            <ListItem><strong>Dataset Versioning</strong> - Track every dataset version with checksums and provenance</ListItem>
            <ListItem><strong>Training Jobs</strong> - Queue, run, and monitor training jobs with full configuration tracking</ListItem>
            <ListItem><strong>EvalHarness Integration</strong> - Standardized evaluation framework for honest comparisons</ListItem>
            <ListItem><strong>Artifact Storage</strong> - Centralized storage for models, checkpoints, and logs</ListItem>
            <ListItem><strong>Run Comparison</strong> - Side-by-side comparison of experiments with metrics visualization</ListItem>
            <ListItem><strong>One-Command Reproducibility</strong> - Re-run any experiment with identical settings</ListItem>
            <ListItem><strong>Honest Failure Modes</strong> - Track what doesn't work, not just what does</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Tech Stack</SectionTitle>
          <TechStack>
            <TechTag>Python</TechTag>
            <TechTag>PyTorch</TechTag>
            <TechTag>PostgreSQL</TechTag>
            <TechTag>Prisma ORM</TechTag>
            <TechTag>Docker</TechTag>
            <TechTag>GitHub Actions CI</TechTag>
            <TechTag>FastAPI</TechTag>
            <TechTag>React</TechTag>
          </TechStack>
        </Section>

        <Section>
          <SectionTitle>Why I'm Building This</SectionTitle>
          <Text>
            As I dive deeper into ML engineering, I keep hitting the same friction: experimentation
            workflows that don't scale, results I can't reproduce, and no clear history of what I've tried.
            ModelLab is my answer to that problem: a tool that treats ML experiments with the same rigor
            as production code.
          </Text>
          <Text>
            This project will teach me production ML workflows, database design, distributed systems,
            and how to build tools that make machine learning more systematic and honest.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Timeline</SectionTitle>
          <List>
            <ListItem><strong>Weeks 0-2 (Jan 2026)</strong> - v1 foundation: repo setup, dataset versioning, basic training job queue</ListItem>
            <ListItem><strong>February 2026</strong> - EvalHarness integration, artifact storage, run comparison UI</ListItem>
            <ListItem><strong>March 2026</strong> - Polish, documentation, deployment, dogfooding with real projects</ListItem>
          </List>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default ModelLab;
