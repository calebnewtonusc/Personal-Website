import React from 'react';
import styled from 'styled-components';
import uscLogo from '../assets/logos/usc.png';
import berkeleyLogo from '../assets/education/berkeley.png';
import uclaLogo from '../assets/education/ucla_logo.png';
import smhsLogo from '../assets/education/smhs.png';

const Container = styled.div`
  max-width: 672px;
  margin: 0 auto;
  padding: 0 1rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 0 2.5rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
  line-height: 1.1;

  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 3rem;
  opacity: 0.8;
`;

const TimelineItem = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Logo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 24px;
  overflow: hidden;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemContent = styled.div`
  flex: 1;
`;

const Institution = styled.h2`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.25rem;
`;

const Degree = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.25rem;
`;

const Period = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 0.75rem;

  ul {
    list-style: disc;
    margin-left: 1.25rem;
    margin-top: 0.5rem;
  }

  li {
    margin-bottom: 0.25rem;
  }
`;

const education = [
  {
    logo: uscLogo,
    isImage: true,
    institution: "university of southern california",
    degree: "bachelor of science - mathematics and computer science",
    period: "2025 - may 2029",
    description: (
      <ul>
        <li>viterbi school of engineering</li>
        <li>focus: machine learning, statistics, neural architectures</li>
        <li>spring 2026 courses: csci 170 (discrete methods), math 225 (linear algebra), csci 104 (data structures)</li>
      </ul>
    )
  },
  {
    logo: berkeleyLogo,
    isImage: true,
    institution: "uc berkeley college of engineering",
    degree: "summer program - computer science",
    period: "june 2024 - june 2024",
    description: "completed intensive bjc-based course in abstraction, recursion, algorithms, and introductory ml through snap! and python."
  },
  {
    logo: uclaLogo,
    isImage: true,
    institution: "california nanosystems institute at ucla",
    degree: "summer program - nanotechnology",
    period: "july 2023 - july 2023",
    description: "developed aquashield (hydrophobic water bottle) in a two-week stem + entrepreneurship program, pitching to investors and applying matlab for analysis."
  },
  {
    logo: smhsLogo,
    isImage: true,
    institution: "san marino high school",
    degree: "high school diploma",
    period: "august 2021 - june 2025",
    description: (
      <ul>
        <li>promethean: highest honor for a graduating student at san marino high school</li>
        <li>person who made calculus fun, most likely to star in a calculus video</li>
        <li>ap scholar with distinction</li>
        <li>national merit commended student</li>
        <li>acts christian club vice president (11th) and president (12th)</li>
      </ul>
    )
  }
];

const EducationPage = () => {
  return (
    <Container>
      <PageTitle>education</PageTitle>
      <Subtitle>where i've learned.</Subtitle>
      {education.map((item, idx) => (
        <TimelineItem key={idx}>
          <ItemHeader>
            <Logo>
              {item.isImage ? (
                <LogoImage src={item.logo} alt={item.institution} />
              ) : (
                item.logo
              )}
            </Logo>
            <ItemContent>
              <Institution>{item.institution}</Institution>
              <Degree>{item.degree}</Degree>
              <Period>{item.period}</Period>
            </ItemContent>
          </ItemHeader>
          <Description>{item.description}</Description>
        </TimelineItem>
      ))}
    </Container>
  );
};

export default EducationPage;
