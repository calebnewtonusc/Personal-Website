import React from 'react';
import styled from 'styled-components';
import { Bio } from '../../data/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
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
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
`;

const ContactItem = styled.a`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  padding: 10px 20px;
  border: 1.8px solid ${({ theme }) => theme.primary};
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;

const Contact = () => {
  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out - I'd love to connect!
        </Desc>
        <ContactInfo>
          <ContactItem href={`mailto:${Bio.email}`}>
            {Bio.email}
          </ContactItem>
        </ContactInfo>
        <SocialLinks>
          <SocialLink href={Bio.github} target="_blank">
            GitHub
          </SocialLink>
          <SocialLink href={Bio.linkedin} target="_blank">
            LinkedIn
          </SocialLink>
        </SocialLinks>
      </Wrapper>
    </Container>
  );
};

export default Contact;
