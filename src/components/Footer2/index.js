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

const FooterContent = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.6;
`;

const Footer2 = () => {
  return (
    <FooterContainer>
      <FooterContent>
        © {new Date().getFullYear()} caleb newton. built with react + styled-components.
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer2;
