import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { calculateScores, generatePersonalityType, getSpectrumLabel, getSpectrumPercentage } from './scoringSupabase';
import { supabase } from '../../lib/supabase';
import {
  Button,
  Card,
  Badge,
  GradientBackground,
  Container,
  SectionTitle,
  Grid,
  SpectrumDisplay,
  RadarChartComponent,
} from './components/SharedComponents';

const ResultsContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const PersonalityCard = styled(Card)`
  text-align: center;
  padding: 3rem 2rem;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}20, ${({ theme }) => theme.primary}05);
  border: 2px solid ${({ theme }) => theme.primary}40;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const PersonalityCode = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PersonalityName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PersonalityTagline = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.primary};
  font-style: italic;
  margin-bottom: 1.5rem;
`;

const PersonalityDescription = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const SpectrumSection = styled.div`
  margin-bottom: 3rem;
`;

const ChartSection = styled.div`
  margin-bottom: 3rem;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.text_primary + '12'};
`;

const ListSection = styled.div`
  margin-bottom: 2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: ${({ theme }) => theme.text_primary};
  font-size: 1rem;
  line-height: 1.6;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
  }
`;

const RoleCard = styled(Card)`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const RoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`;

const RoleTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const FitBadge = styled(Badge)`
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
`;

const RoleDescription = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const SkillsList = styled.div`
  margin-bottom: 1.5rem;
`;

const SkillsTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.75rem;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled(Badge)`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary + '30'};
`;

const RoadmapSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.text_primary + '20'};
`;

const RoadmapPhase = styled.div`
  margin-bottom: 1rem;
`;

const PhaseTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;

const PhaseDuration = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 0.5rem;
`;

const PhaseItems = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};

  li {
    margin-bottom: 0.25rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const ShareSection = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_primary + '12'};
`;

const Results = ({ responses, questions, onRetake }) => {
  const resultsRef = useRef(null);
  const [personality, setPersonality] = useState(null);
  const [topRoles, setTopRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calculate scores and personality type
  const scores = calculateScores(responses, questions);
  const personalityCode = generatePersonalityType(scores);

  // Build spectrum breakdown for display
  const spectrumBreakdown = [
    {
      spectrum: 'focus',
      name: 'Technical Focus',
      leftPole: 'Builder',
      rightPole: 'Analyzer',
      score: scores.focus_score,
      leftPercent: Math.round(Math.max(0, (50 - scores.focus_score) * 2)),
      rightPercent: Math.round(Math.max(0, (scores.focus_score - 50) * 2)),
      dominantPercent: Math.abs(scores.focus_score - 50) * 2,
    },
    {
      spectrum: 'interface',
      name: 'Interface Preference',
      leftPole: 'User-Facing',
      rightPole: 'Systems-Facing',
      score: scores.interface_score,
      leftPercent: Math.round(Math.max(0, (50 - scores.interface_score) * 2)),
      rightPercent: Math.round(Math.max(0, (scores.interface_score - 50) * 2)),
      dominantPercent: Math.abs(scores.interface_score - 50) * 2,
    },
    {
      spectrum: 'change',
      name: 'Change Orientation',
      leftPole: 'Exploratory',
      rightPole: 'Operational',
      score: scores.change_score,
      leftPercent: Math.round(Math.max(0, (50 - scores.change_score) * 2)),
      rightPercent: Math.round(Math.max(0, (scores.change_score - 50) * 2)),
      dominantPercent: Math.abs(scores.change_score - 50) * 2,
    },
    {
      spectrum: 'decision',
      name: 'Decision Style',
      leftPole: 'Vision-Led',
      rightPole: 'Logic-Led',
      score: scores.decision_score,
      leftPercent: Math.round(Math.max(0, (50 - scores.decision_score) * 2)),
      rightPercent: Math.round(Math.max(0, (scores.decision_score - 50) * 2)),
      dominantPercent: Math.abs(scores.decision_score - 50) * 2,
    },
    {
      spectrum: 'execution',
      name: 'Execution Style',
      leftPole: 'Adaptive',
      rightPole: 'Structured',
      score: scores.execution_score,
      leftPercent: Math.round(Math.max(0, (50 - scores.execution_score) * 2)),
      rightPercent: Math.round(Math.max(0, (scores.execution_score - 50) * 2)),
      dominantPercent: Math.abs(scores.execution_score - 50) * 2,
    },
  ];

  // Prepare data for radar chart
  const radarData = spectrumBreakdown.map((spectrum) => ({
    dimension: spectrum.name,
    value: spectrum.dominantPercent,
  }));

  // Load personality profile from Supabase
  useEffect(() => {
    async function loadPersonality() {
      try {
        const { data, error } = await supabase
          .from('personality_profiles')
          .select('*')
          .eq('type_code', personalityCode)
          .single();

        if (error) throw error;
        setPersonality(data);
      } catch (error) {
        console.error('Error loading personality:', error);
      }
    }

    if (personalityCode) {
      loadPersonality();
    }
  }, [personalityCode]);

  // Load roles and calculate recommendations
  useEffect(() => {
    async function loadRoles() {
      try {
        // Load all roles
        const { data: roles, error: rolesError } = await supabase
          .from('tech_roles')
          .select('*');

        if (rolesError) throw rolesError;

        // Load scoring weights for all roles
        const { data: weights, error: weightsError } = await supabase
          .from('role_scoring_weights')
          .select('*');

        if (weightsError) throw weightsError;

        // Calculate fit scores for each role
        const rolesWithScores = roles.map(role => {
          const roleWeights = weights.filter(w => w.role_id === role.id);

          // Calculate weighted score
          let totalScore = 0;
          let totalWeight = 0;

          roleWeights.forEach(weight => {
            const spectrumScore = scores[`${weight.spectrum}_score`];
            if (spectrumScore !== undefined) {
              // Calculate how well this spectrum score matches the role's preference
              const difference = Math.abs(spectrumScore - weight.preferred_value);
              const matchScore = 100 - difference; // 0-100 scale
              const weightedScore = matchScore * weight.weight;

              totalScore += weightedScore;
              totalWeight += weight.weight;
            }
          });

          const fitScore = totalWeight > 0 ? totalScore / totalWeight / 100 : 0;

          return {
            ...role,
            fitScore,
          };
        });

        // Sort by fit score and take top 3
        const sortedRoles = rolesWithScores.sort((a, b) => b.fitScore - a.fitScore);
        setTopRoles(sortedRoles.slice(0, 3));
      } catch (error) {
        console.error('Error loading roles:', error);
      } finally {
        setLoading(false);
      }
    }

    loadRoles();
  }, [scores]);

  const handleShare = () => {
    if (!personality) return;

    const shareText = `I just discovered my Tech 16 Personality: ${personality.name} (${personalityCode})!\n\nTop roles for me:\n${topRoles.map((r, i) => `${i + 1}. ${r.title} (${Math.round(r.fitScore * 100)}% fit)`).join('\n')}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'My Tech 16 Personality Results',
          text: shareText,
        })
        .catch(() => {});
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Results copied to clipboard!');
      });
    }
  };

  const handleDownload = () => {
    if (!personality) return;

    // Simple download as text file
    const content = `
Tech 16 Personalities Results
==============================

Personality Type: ${personality.name}
Code: ${personalityCode}
Tagline: ${personality.tagline}

Description:
${personality.description}

Spectrum Breakdown:
${spectrumBreakdown.map((s) => `- ${s.name}: ${s.leftPole} (${s.leftPercent}%) ↔ ${s.rightPole} (${s.rightPercent}%)`).join('\n')}

Top Role Recommendations:
${topRoles.map((r, i) => `${i + 1}. ${r.title} (${Math.round(r.fitScore * 100)}% fit)\n   ${r.description}`).join('\n\n')}

Strengths:
${personality.strengths.map((s) => `- ${s}`).join('\n')}

Challenges:
${personality.challenges.map((c) => `- ${c}`).join('\n')}

Work Preferences:
${personality.work_preferences.map((w) => `- ${w}`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tech16-results-${personalityCode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <GradientBackground>
        <ResultsContainer>
          <Container>
            <Header>
              <Title>Loading Your Results...</Title>
              <Subtitle>Analyzing your personality profile</Subtitle>
            </Header>
          </Container>
        </ResultsContainer>
      </GradientBackground>
    );
  }

  if (!personality) {
    return (
      <GradientBackground>
        <ResultsContainer>
          <Container>
            <Header>
              <Title>Error Loading Results</Title>
              <Subtitle>Unable to find personality profile for {personalityCode}</Subtitle>
            </Header>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={onRetake}>Retake Quiz</Button>
            </div>
          </Container>
        </ResultsContainer>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ResultsContainer ref={resultsRef}>
        <Container maxWidth="1200px">
          <Header>
            <Title>Your Results</Title>
            <Subtitle>Discover your tech personality and career path</Subtitle>
          </Header>

          <PersonalityCard>
            <PersonalityCode>{personalityCode}</PersonalityCode>
            <PersonalityName>{personality.name}</PersonalityName>
            <PersonalityTagline>{personality.tagline}</PersonalityTagline>
            <PersonalityDescription>{personality.description}</PersonalityDescription>
          </PersonalityCard>

          <Section>
            <SectionTitle>Your Personality Spectrums</SectionTitle>
            <SpectrumSection>
              {spectrumBreakdown.map((spectrum) => (
                <SpectrumDisplay
                  key={spectrum.spectrum}
                  name={spectrum.name}
                  leftPole={spectrum.leftPole}
                  rightPole={spectrum.rightPole}
                  leftPercent={spectrum.leftPercent}
                  rightPercent={spectrum.rightPercent}
                />
              ))}
            </SpectrumSection>
          </Section>

          <Section>
            <SectionTitle>Personality Radar</SectionTitle>
            <ChartSection>
              <RadarChartComponent data={radarData} height="500px" />
            </ChartSection>
          </Section>

          <Section>
            <Grid columns={2}>
              <Card padding="2rem">
                <SectionTitle style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Strengths</SectionTitle>
                <List>
                  {personality.strengths.map((strength, idx) => (
                    <ListItem key={idx}>{strength}</ListItem>
                  ))}
                </List>
              </Card>

              <Card padding="2rem">
                <SectionTitle style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                  Potential Challenges
                </SectionTitle>
                <List>
                  {personality.challenges.map((challenge, idx) => (
                    <ListItem key={idx}>{challenge}</ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </Section>

          <Section>
            <Card padding="2rem">
              <SectionTitle style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                Work Preferences
              </SectionTitle>
              <List>
                {personality.work_preferences?.map((pref, idx) => (
                  <ListItem key={idx}>{pref}</ListItem>
                ))}
              </List>
            </Card>
          </Section>

          <Section>
            <SectionTitle>Top Role Recommendations</SectionTitle>
            <Grid columns={1}>
              {topRoles.map((role, idx) => (
                <RoleCard key={role.id}>
                  <RoleHeader>
                    <RoleTitle>
                      #{idx + 1} {role.title}
                    </RoleTitle>
                    <FitBadge variant="success">{Math.round(role.fitScore * 100)}% Fit</FitBadge>
                  </RoleHeader>

                  <RoleDescription>{role.description}</RoleDescription>

                  {role.skills && Array.isArray(role.skills) && role.skills.length > 0 && (
                    <SkillsList>
                      <SkillsTitle>Key Skills</SkillsTitle>
                      <Skills>
                        {role.skills.slice(0, 8).map((skill, skillIdx) => (
                          <SkillTag key={skillIdx}>{skill}</SkillTag>
                        ))}
                      </Skills>
                    </SkillsList>
                  )}

                  {role.roadmap && Array.isArray(role.roadmap) && role.roadmap.length > 0 && (
                    <RoadmapSection>
                      <SkillsTitle>Learning Roadmap</SkillsTitle>
                      {role.roadmap.slice(0, 3).map((phase, phaseIdx) => (
                        <RoadmapPhase key={phaseIdx}>
                          <PhaseTitle>{phase.phase}</PhaseTitle>
                          <PhaseDuration>{phase.duration}</PhaseDuration>
                          <PhaseItems>
                            {phase.items.map((item, itemIdx) => (
                              <li key={itemIdx}>{item}</li>
                            ))}
                          </PhaseItems>
                        </RoadmapPhase>
                      ))}
                    </RoadmapSection>
                  )}
                </RoleCard>
              ))}
            </Grid>
          </Section>

          <ShareSection>
            <SectionTitle style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Share Your Results
            </SectionTitle>
            <ActionButtons>
              <Button onClick={handleShare} size="large">
                Share Results
              </Button>
              <Button onClick={handleDownload} variant="outline" size="large">
                Download Results
              </Button>
              <Button onClick={onRetake} variant="secondary" size="large">
                Retake Quiz
              </Button>
            </ActionButtons>
          </ShareSection>
        </Container>
      </ResultsContainer>
    </GradientBackground>
  );
};

export default Results;
