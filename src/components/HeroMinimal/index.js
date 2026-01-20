import React from 'react';
import styled from 'styled-components';
import { Bio } from '../../data/constants';
import HeroImg from '../../assets/Newton_Caleb_Photo.png';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px 60px 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 60px 20px 40px 20px;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 24px;
  border: 2px solid ${({ theme }) => theme.border};
`;

const Name = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Location = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
`;

const BioText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary};
  opacity: 0.9;
  max-width: 600px;
  margin-bottom: 24px;
`;

const Skills = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Skill = styled.span`
  padding: 6px 14px;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 16px;
  font-size: 13px;
`;

const HeroMinimal = () => {
  return (
    <Container id="home">
      <ProfileImage src={HeroImg} alt="Caleb Newton" />
      <Name>hi, i'm caleb newton</Name>
      <Location>Los Angeles, CA</Location>
      <BioText>
        follower of jesus. cs + applied math @ usc. passionate about building AI systems that serve people,
        grounded in my faith and commitment to human-centered technology. currently diving deep into ML
        foundations: pytorch, transformers, computer vision.
      </BioText>
      <Skills>
        <Skill>machine learning</Skill>
        <Skill>pytorch</Skill>
        <Skill>computer vision</Skill>
        <Skill>python</Skill>
      </Skills>
    </Container>
  );
};

export default HeroMinimal;
