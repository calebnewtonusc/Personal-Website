import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 672px;
  margin: 0 auto;
  padding: 0 1rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 0 2.5rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 2rem;
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
    logo: "🎓",
    institution: "University of Southern California",
    degree: "Bachelor of Science - Computer Science + Applied Mathematics",
    period: "August 2025 - May 2029",
    description: (
      <ul>
        <li>Viterbi School of Engineering</li>
        <li>Focus: Machine Learning, Statistics, Neural Architectures</li>
        <li>Spring 2026 Courses: CSCI 170 (Discrete Methods), MATH 225 (Linear Algebra), CSCI 104 (Data Structures)</li>
      </ul>
    )
  },
  {
    logo: "🐻",
    institution: "UC Berkeley College of Engineering",
    degree: "Summer Program - Computer Science",
    period: "June 2024 - June 2024",
    description: "Intensive computer science program focusing on algorithms and data structures."
  },
  {
    logo: "🔬",
    institution: "California NanoSystems Institute at UCLA",
    degree: "Summer Program - Nanotechnology",
    period: "July 2023 - July 2023",
    description: "Hands-on nanotechnology research and laboratory experience."
  },
  {
    logo: "🏫",
    institution: "San Marino High School",
    degree: "High School Diploma",
    period: "August 2021 - June 2025",
    description: (
      <ul>
        <li>AP Scholar with Distinction</li>
        <li>National Merit Commended Student</li>
        <li>Varsity Baseball - Pitcher (17 consecutive scoreless innings senior year)</li>
        <li>ACTS Leadership Team</li>
      </ul>
    )
  }
];

const EducationPage = () => {
  return (
    <Container>
      <PageTitle>Education</PageTitle>
      {education.map((item, idx) => (
        <TimelineItem key={idx}>
          <ItemHeader>
            <Logo>{item.logo}</Logo>
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
