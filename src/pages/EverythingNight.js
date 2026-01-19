import React from 'react';
import styled from 'styled-components';
import crowdImg from '../assets/everything_night_crowd.jpg';
import dinnerImg from '../assets/everything_night_dinner.jpg';
import bandImg from '../assets/everything_night_band.jpg';
import dodgeballImg from '../assets/everything_night_dodgeball.jpg';
import picnicImg from '../assets/everything_night_picnic.jpg';
import posterImg from '../assets/everything_night_poster.jpg';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem 2.5rem;
  }

  @media (min-width: 768px) {
    padding: 0 2rem 3.5rem;
  }
`;

const Title = styled.h1`
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

const Description = styled.div`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ImageCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.bgLight};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ImageCaption = styled.div`
  padding: 1rem;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const images = [
  {
    src: posterImg,
    caption: "Everything Night Event Poster"
  },
  {
    src: crowdImg,
    caption: "200+ Students Gathered for Community and Faith"
  },
  {
    src: dinnerImg,
    caption: "Students Enjoying Dinner Together"
  },
  {
    src: bandImg,
    caption: "Live Worship Band Performance"
  },
  {
    src: dodgeballImg,
    caption: "Fun and Games - Dodgeball Tournament"
  },
  {
    src: picnicImg,
    caption: "Community Building Through Shared Meals"
  }
];

const EverythingNightPage = () => {
  return (
    <Container>
      <Title>Everything Night</Title>
      <Subtitle>May 23, 2025 - SGV Christian Club Collective</Subtitle>

      <Description>
        <p>
          Everything Night was a first-of-its-kind regional outreach event that brought together 200+ students
          from across the San Gabriel Valley for an evening of community, faith, and discovery.
        </p>
        <p style={{ marginTop: '1rem' }}>
          The event featured 20 breakout sessions covering topics ranging from faith and identity to creativity
          and purpose. It represented months of collaboration between 15+ high school Christian clubs and
          demonstrated the power of unified student leadership.
        </p>
      </Description>

      <ImageGrid>
        {images.map((img, idx) => (
          <ImageCard key={idx}>
            <Image src={img.src} alt={img.caption} />
            <ImageCaption>{img.caption}</ImageCaption>
          </ImageCard>
        ))}
      </ImageGrid>
    </Container>
  );
};

export default EverythingNightPage;
