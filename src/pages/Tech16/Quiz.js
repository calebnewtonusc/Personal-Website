import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getQuizProgress } from './scoringSupabase';
import { Button, Card, ProgressBar, GradientBackground, Container } from './components/SharedComponents';
import { supabase } from '../../lib/supabase';

const QuizContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.text_primary}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 2rem;
`;

const ProgressSection = styled.div`
  margin-bottom: 2rem;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const QuestionCard = styled(Card)`
  margin-bottom: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const QuestionNumber = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const QuestionText = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 2rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const LikertScale = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const LikertOption = styled.button`
  flex: 1;
  min-width: 120px;
  padding: 1rem;
  background: ${({ selected, theme }) => (selected ? theme.primary : theme.bg)};
  color: ${({ selected, theme }) => (selected ? 'white' : theme.text_primary)};
  border: 2px solid ${({ selected, theme }) => (selected ? theme.primary : theme.text_primary + '30')};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ selected, theme }) => (selected ? theme.primary : theme.primary + '20')};
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const OptionNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const OptionLabel = styled.div`
  font-size: 0.75rem;
  opacity: 0.9;
`;

const ScaleLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const QuestionDot = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ answered, current, theme }) => {
    if (current) return theme.primary;
    if (answered) return theme.primary + '40';
    return theme.text_primary + '20';
  }};
  border: 2px solid ${({ current, theme }) => (current ? theme.primary : 'transparent')};
  color: ${({ answered, current, theme }) => {
    if (current || answered) return theme.text_primary;
    return theme.text_secondary;
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.75rem;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.primary};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 0.7rem;
  }
`;

const SaveIndicator = styled.div`
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text_secondary};
  font-style: italic;
`;

const Quiz = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [savedIndicator, setSavedIndicator] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizVersionId, setQuizVersionId] = useState(null);

  // Load questions from Supabase
  useEffect(() => {
    async function loadQuestions() {
      try {
        const { data: quizVersion, error } = await supabase
          .from('quiz_versions')
          .select('*')
          .eq('is_active', true)
          .order('version', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;

        if (quizVersion && quizVersion.questions) {
          const quizQuestions = quizVersion.questions.questions || [];
          setQuestions(quizQuestions);
          setQuizVersionId(quizVersion.id);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  // Load saved responses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tech16_quiz_responses');
    if (saved) {
      try {
        setResponses(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved responses');
      }
    }
  }, []);

  // Save responses to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      localStorage.setItem('tech16_quiz_responses', JSON.stringify(responses));
      setSavedIndicator(true);
      const timer = setTimeout(() => setSavedIndicator(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [responses]);

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;
  const progress = questions.length > 0 ? getQuizProgress(responses, questions.length) : 0;
  const answeredCount = Object.keys(responses).length;

  const handleAnswer = (questionId, optionIndex) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (answeredCount === questions.length) {
      // Clear saved data
      localStorage.removeItem('tech16_quiz_responses');
      onComplete({ responses, questions });
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canSubmit = answeredCount === questions.length;

  if (loading) {
    return (
      <GradientBackground>
        <QuizContainer>
          <Container maxWidth="900px">
            <Header>
              <Title>Loading Quiz...</Title>
              <Subtitle>Please wait while we load the questions</Subtitle>
            </Header>
          </Container>
        </QuizContainer>
      </GradientBackground>
    );
  }

  if (!currentQuestion) {
    return (
      <GradientBackground>
        <QuizContainer>
          <Container maxWidth="900px">
            <Header>
              <Title>Error Loading Quiz</Title>
              <Subtitle>Please refresh the page to try again</Subtitle>
            </Header>
          </Container>
        </QuizContainer>
      </GradientBackground>
    );
  }

  // Get options for current question
  const questionOptions = currentQuestion.options || [];

  return (
    <GradientBackground>
      <QuizContainer>
        <Container maxWidth="900px">
          <Header>
            <Title>Tech 16 Personalities Quiz</Title>
            <Subtitle>Answer 40 questions to discover your tech personality type</Subtitle>
          </Header>

          <ProgressSection>
            <ProgressLabel>
              <span>Progress: {answeredCount} / {questions.length}</span>
              <span>{progress}%</span>
            </ProgressLabel>
            <ProgressBar progress={progress} variant="gradient" animated />
          </ProgressSection>

          <QuestionGrid>
            {questions.map((q, idx) => (
              <QuestionDot
                key={q.id}
                answered={responses[q.id] !== undefined}
                current={idx === currentQuestionIndex}
                onClick={() => handleJumpToQuestion(idx)}
                title={`Question ${idx + 1}${responses[q.id] !== undefined ? ' (answered)' : ''}`}
              >
                {idx + 1}
              </QuestionDot>
            ))}
          </QuestionGrid>

          <QuestionCard>
            <QuestionNumber>
              Question {currentQuestionIndex + 1} of {questions.length}
            </QuestionNumber>
            <QuestionText>{currentQuestion.text}</QuestionText>

            <LikertScale>
              {questionOptions.map((option, index) => (
                <LikertOption
                  key={index}
                  selected={responses[currentQuestion.id] === index}
                  onClick={() => handleAnswer(currentQuestion.id, index)}
                >
                  <OptionLabel>{typeof option === 'string' ? option : option.text}</OptionLabel>
                </LikertOption>
              ))}
            </LikertScale>

            <NavigationButtons>
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                size="large"
              >
                Previous
              </Button>

              {!isLastQuestion && (
                <Button onClick={handleNext} size="large">
                  Next
                </Button>
              )}

              {isLastQuestion && (
                <Button onClick={handleSubmit} disabled={!canSubmit} size="large">
                  {canSubmit ? 'View Results' : `Answer All Questions (${answeredCount}/${questions.length})`}
                </Button>
              )}
            </NavigationButtons>
          </QuestionCard>

          {savedIndicator && <SaveIndicator>Progress saved automatically</SaveIndicator>}
        </Container>
      </QuizContainer>
    </GradientBackground>
  );
};

export default Quiz;
