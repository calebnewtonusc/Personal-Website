import React from 'react';
import styled from 'styled-components';
import vinylImage from '../assets/vinyl_collection.jpg';
import baseballImage from '../assets/baseball_pitching.jpg';
import boardGameImage from '../assets/board_game.jpg';
import hikeImage from '../assets/hike.jpg';

const Container = styled.div`
  max-width: 672px;
  margin: 0 auto;
  padding: 0 1rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 0 2.5rem;
  }

  @media (min-width: 768px) {
    padding: 0 0 3.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.25rem;
`;

const SectionSubtitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.8;
`;

const Text = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1.25rem;
  opacity: 0.95;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.75rem;
  opacity: 0.95;
  padding-left: 1.25rem;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PhotoCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  aspect-ratio: 4 / 3;
  border: 1px solid ${({ theme }) => theme.border};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PhotoCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
  color: white;
`;

const PhotoLocation = styled.div`
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 0.125rem;
`;

const PhotoDate = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const photos = [
  {
    image: vinylImage,
    location: "Los Angeles, CA",
    date: "Ongoing"
  },
  {
    image: baseballImage,
    location: "San Marino, CA",
    date: "May 2025"
  },
  {
    image: hikeImage,
    location: "Los Angeles, CA",
    date: "June 2025"
  },
  {
    image: boardGameImage,
    location: "Los Angeles, CA",
    date: "Ongoing"
  }
];

const AboutPage = () => {
  return (
    <Container>
      <Section>
        <SectionHeader>
          <SectionTitle>About</SectionTitle>
          <SectionSubtitle>Who I am</SectionSubtitle>
        </SectionHeader>
        <Text>
          I'm a machine learning engineer based in Los Angeles, CA, studying Statistics and Machine
          Learning @ University of Southern California.
        </Text>
        <Text>
          I love building software that makes people's lives better. My approach to technology is
          grounded in my Christian faith—I believe the best tech serves people and helps them flourish.
        </Text>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Aside from work</SectionTitle>
        </SectionHeader>
        <List>
          <ListItem>Deep diving into PyTorch, transformers, and computer vision</ListItem>
          <ListItem>Building holographic video systems with Gaussian Splatting</ListItem>
          <ListItem>Vinyl collecting (from Stevie Wonder to The Strokes)</ListItem>
          <ListItem>Hiking sunrise trails and finding God in creation</ListItem>
        </List>
      </Section>

      <Section>
        <PhotoGrid>
          {photos.map((photo, idx) => (
            <PhotoCard key={idx}>
              <Photo src={photo.image} alt={photo.location} />
              <PhotoCaption>
                <PhotoLocation>{photo.location}</PhotoLocation>
                <PhotoDate>{photo.date}</PhotoDate>
              </PhotoCaption>
            </PhotoCard>
          ))}
        </PhotoGrid>
      </Section>
    </Container>
  );
};

export default AboutPage;
