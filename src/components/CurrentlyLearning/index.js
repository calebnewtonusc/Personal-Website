import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(343.07deg, rgba(34, 139, 34, 0.06) 5.71%, rgba(60, 179, 113, 0.06) 64.83%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 0px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 98%, 0 100%);
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 700px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 900px;
`;

const Section = styled.div`
  background: ${({ theme }) => theme.card};
  border: 0.1px solid ${({ theme }) => theme.primary};
  box-shadow: rgba(34, 139, 34, 0.4) 0px 4px 24px;
  border-radius: 16px;
  padding: 24px 32px;
  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListItem = styled.li`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary + 99};
  padding-left: 20px;
  position: relative;
  &:before {
    content: "→";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const CurrentlyLearning = () => {
  return (
    <Container id="currently-learning">
      <Wrapper>
        <Title>Currently Learning (Spring 2026)</Title>
        <Desc>
          I'm prioritizing technical depth in AI/ML this semester. Here's what I'm focused on right now.
        </Desc>
        <Content>
          <Section>
            <SectionTitle>USC Courses</SectionTitle>
            <List>
              <ListItem><Highlight>Multivariable Calculus</Highlight> - Building mathematical foundations for ML</ListItem>
              <ListItem><Highlight>Linear Algebra</Highlight> - Core to understanding neural networks and transformers</ListItem>
              <ListItem><Highlight>C++ Programming</Highlight> - Systems-level understanding and performance optimization</ListItem>
              <ListItem><Highlight>Discrete Methods</Highlight> - Logic, proofs, and computational thinking</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Self-Directed ML Learning</SectionTitle>
            <List>
              <ListItem>PyTorch deep learning workflows and model training pipelines</ListItem>
              <ListItem>Transformer architectures and attention mechanisms</ListItem>
              <ListItem>Computer vision with EfficientNet and ViT</ListItem>
              <ListItem>Ranking and retrieval systems for recommendation engines</ListItem>
              <ListItem>Production ML: Docker, evaluation harnesses, reproducible experiments</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Spring 2026 Project Goals</SectionTitle>
            <List>
              <ListItem><Highlight>ModelLab v1</Highlight> - ML experiment command center with dataset versioning and EvalHarness</ListItem>
              <ListItem><Highlight>Tech 16 Personalities v1</Highlight> - Full-stack quiz app with personality-driven career guidance</ListItem>
              <ListItem><Highlight>FoodVisionMini v1</Highlight> - End-to-end computer vision project with deployed Gradio demo</ListItem>
            </List>
          </Section>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default CurrentlyLearning;
