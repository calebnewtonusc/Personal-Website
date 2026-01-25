import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Quiz from './Quiz';
import Results from './Results';
import { spectrums } from './data/questions';
import { getAllPersonalityCodes } from './data/personalities';
import { Button, Card, Badge, GradientBackground, Container, Grid } from './components/SharedComponents';

const LandingContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
`;

const Logo = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.1em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const CTASection = styled.div`
  text-align: center;
  margin: 3rem 0;
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const SpectrumCard = styled(Card)`
  padding: 2rem;
  text-align: center;
  height: 100%;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SpectrumName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`;

const SpectrumPoles = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1.5rem 0;
  gap: 1rem;
`;

const Pole = styled.div`
  flex: 1;
`;

const PoleCode = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
`;

const PoleName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Divider = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 300;
`;

const SpectrumDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  margin-top: 1rem;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 3rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}20, ${({ theme }) => theme.primary}05);
  border: 2px solid ${({ theme }) => theme.primary}40;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 600;
`;

const FeaturesList = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_primary + '12'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
  min-width: 40px;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  margin: 0;
`;

const ExampleTypes = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TypeCard = styled(Card)`
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TypeCode = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
`;

const TypeName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.875rem;
`;

const Tech16 = () => {
  const [view, setView] = useState('landing'); // 'landing', 'quiz', 'results'
  const [quizData, setQuizData] = useState(null); // { responses, questions }

  // Check for saved progress on mount
  useEffect(() => {
    const savedResponses = localStorage.getItem('tech16_quiz_responses');
    if (savedResponses && view === 'landing') {
      // Could prompt user to resume
      console.log('Found saved quiz progress');
    }
  }, [view]);

  const handleStartQuiz = () => {
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeQuiz = () => {
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (data) => {
    setQuizData(data);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeQuiz = () => {
    setQuizData(null);
    localStorage.removeItem('tech16_quiz_responses');
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'quiz') {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  if (view === 'results' && quizData) {
    return <Results responses={quizData.responses} questions={quizData.questions} onRetake={handleRetakeQuiz} />;
  }

  // Landing page
  const spectrumArray = Object.keys(spectrums).map((key) => ({
    key,
    ...spectrums[key],
  }));

  const exampleTypes = [
    { code: 'B-U-E-V', name: 'The Innovator' },
    { code: 'B-S-O-L', name: 'The SRE' },
    { code: 'A-S-E-L', name: 'The ML Engineer' },
    { code: 'A-U-O-V', name: 'The Product Designer' },
  ];

  const features = [
    {
      icon: '📊',
      title: '40 Thoughtful Questions',
      description: 'Scenario-based questions that reveal your natural working style and preferences.',
    },
    {
      icon: '🎯',
      title: '5 Personality Dimensions',
      description:
        'Measure your position on Focus, Interface, Change Style, Decision Driver, and Execution spectrums.',
    },
    {
      icon: '💼',
      title: 'Role Recommendations',
      description:
        'Get your top 3 tech roles from 16 career paths, with fit percentages and learning roadmaps.',
    },
    {
      icon: '🗺️',
      title: 'Personalized Learning Paths',
      description:
        'Comprehensive skill roadmaps with resources, courses, and recommended learning sequences.',
    },
  ];

  return (
    <GradientBackground>
      <LandingContainer>
        <Container maxWidth="1200px">
          <Hero>
            <Logo>TECH 16</Logo>
            <Title>Discover Your Tech Personality</Title>
            <Tagline>
              Take the quiz to find your developer personality type and get personalized career recommendations
            </Tagline>

            <CTASection>
              <Button onClick={handleStartQuiz} size="large">
                Start Quiz (40 Questions)
              </Button>
              {localStorage.getItem('tech16_quiz_responses') && (
                <div style={{ marginTop: '1rem' }}>
                  <Button onClick={handleResumeQuiz} variant="outline" size="large">
                    Resume Saved Progress
                  </Button>
                </div>
              )}
            </CTASection>
          </Hero>

          <StatsSection>
            <StatCard>
              <StatNumber>16</StatNumber>
              <StatLabel>Personality Types</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>5</StatNumber>
              <StatLabel>Core Dimensions</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>16</StatNumber>
              <StatLabel>Tech Roles</StatLabel>
            </StatCard>
          </StatsSection>

          <Section>
            <SectionTitle>How It Works</SectionTitle>
            <FeaturesList>
              {features.map((feature, idx) => (
                <FeatureItem key={idx}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureContent>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>
              ))}
            </FeaturesList>
          </Section>

          <Section>
            <SectionTitle>The 5 Personality Dimensions</SectionTitle>
            <SectionDescription>
              Your personality is measured across 5 independent spectrums, creating a unique 4-letter code plus
              execution style suffix.
            </SectionDescription>
            <Grid columns={1}>
              {spectrumArray.map((spectrum) => (
                <SpectrumCard key={spectrum.key}>
                  <SpectrumName>{spectrum.name}</SpectrumName>
                  <SpectrumPoles>
                    <Pole>
                      <PoleCode>{spectrum.poles.leftCode}</PoleCode>
                      <PoleName>{spectrum.poles.left}</PoleName>
                    </Pole>
                    <Divider>↔</Divider>
                    <Pole>
                      <PoleCode>{spectrum.poles.rightCode}</PoleCode>
                      <PoleName>{spectrum.poles.right}</PoleName>
                    </Pole>
                  </SpectrumPoles>
                  <SpectrumDescription>{spectrum.description}</SpectrumDescription>
                </SpectrumCard>
              ))}
            </Grid>
          </Section>

          <Section>
            <SectionTitle>Example Personality Types</SectionTitle>
            <SectionDescription>
              Discover one of 16 unique tech personalities, each with distinct strengths and ideal career paths.
            </SectionDescription>
            <ExampleTypes>
              {exampleTypes.map((type) => (
                <TypeCard key={type.code} clickable>
                  <TypeCode>{type.code}</TypeCode>
                  <TypeName>{type.name}</TypeName>
                </TypeCard>
              ))}
            </ExampleTypes>
          </Section>

          <CTASection style={{ marginTop: '4rem' }}>
            <Card padding="3rem">
              <SectionTitle>Ready to Discover Your Type?</SectionTitle>
              <SectionDescription>
                Take the 40-question quiz to get your personalized results, role recommendations, and learning
                roadmap.
              </SectionDescription>
              <Button onClick={handleStartQuiz} size="large">
                Take the Quiz Now
              </Button>
            </Card>
          </CTASection>

          <Footer>
            <p>
              Tech 16 Personalities - Discover your developer personality type and ideal career path
              <br />
              Built with React, styled-components, and Recharts
            </p>
          </Footer>
        </Container>
      </LandingContainer>
    </GradientBackground>
  );
};

export default Tech16;
