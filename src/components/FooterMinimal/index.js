import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const Copyright = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Tech = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const FooterMinimal = () => {
  return (
    <Container>
      <Content>
        <Copyright>© {new Date().getFullYear()} caleb newton</Copyright>
        <Tech>built with react + styled-components</Tech>
      </Content>
    </Container>
  );
};

export default FooterMinimal;
