import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  max-width: 672px;
  margin: 4rem auto 0;
  padding: 2.5rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};

  @media (min-width: 640px) {
    padding: 2.5rem 0;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Copyright = styled.div`
  opacity: 0.6;
`;

const Tech = styled.div`
  opacity: 0.6;
`;

const Footer2 = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>© {new Date().getFullYear()} caleb newton</Copyright>
        <Tech>built with react + styled-components</Tech>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer2;
