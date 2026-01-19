import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  max-width: 672px;
  margin: 0 auto;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const Message = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  line-height: 1.6;
  max-width: 500px;
`;

const ComingSoonPage = () => {
  const location = useLocation();
  const projectName = location.state?.projectName || 'This project';

  return (
    <Container>
      <Title>Coming Soon</Title>
      <Message>
        {projectName} is currently under development. Check back soon for more details!
      </Message>
    </Container>
  );
};

export default ComingSoonPage;
