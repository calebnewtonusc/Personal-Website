import React from 'react';
import styled from 'styled-components';
import vinylImage from '../assets/vinyl_collection.jpg';
import baseballImage from '../assets/baseball_pitching.jpg';
import boardGameImage from '../assets/board_game.jpg';
import hikeImage from '../assets/hike.jpg';
import baseballFamilyImage from '../assets/baseball_with_family.jpg';
import dominicanImage from '../assets/dominican_republic.jpg';

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
  margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
`;

const SectionSubtitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Text = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: disc;
  margin-left: 1.25rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PhotoCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
`;

const Photo = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
`;

const PhotoCaption = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.bgLight};
`;

const PhotoDate = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 0.25rem;
`;

const PhotoDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
`;

const photos = [
  {
    image: vinylImage,
    date: "Ongoing",
    description: "Vinyl collection wall - From Stevie to The Strokes"
  },
  {
    image: baseballImage,
    date: "May 2025",
    description: "17 consecutive scoreless innings senior year"
  },
  {
    image: baseballFamilyImage,
    date: "May 2025",
    description: "Baseball with family - Games and good times"
  },
  {
    image: boardGameImage,
    date: "Ongoing",
    description: "Board game nights - Strategy and storytelling"
  },
  {
    image: hikeImage,
    date: "June 2025",
    description: "Sunrise hikes above the Hollywood sign"
  },
  {
    image: dominicanImage,
    date: "July 2024",
    description: "Dominican Republic mission trip - Service and ministry"
  }
];

const AboutPage = () => {
  return (
    <Container>
      <Section>
        <SectionHeader>
          <SectionTitle>About</SectionTitle>
          <SectionSubtitle>Who I Am</SectionSubtitle>
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
          <SectionTitle>Currently</SectionTitle>
          <SectionSubtitle>What I'm Working On</SectionSubtitle>
        </SectionHeader>
        <List>
          <ListItem>Deep diving into PyTorch, transformers, and computer vision</ListItem>
          <ListItem>Building holographic video systems at Aina Tech</ListItem>
          <ListItem>Exploring ranking systems and neural architectures</ListItem>
          <ListItem>Trying to make learning joyful through ModelLab</ListItem>
        </List>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Beyond Code</SectionTitle>
          <SectionSubtitle>What I'm Into</SectionSubtitle>
        </SectionHeader>
        <List>
          <ListItem>Vinyl records - obsessed with discovering albums</ListItem>
          <ListItem>Baseball - pitched in high school, learned discipline through injury</ListItem>
          <ListItem>Board games - strategy, storytelling, and conversation</ListItem>
          <ListItem>Hiking - sunrise hikes and finding God in creation</ListItem>
          <ListItem>Christian leadership - ACTS, Impact 360, SGV Collective</ListItem>
        </List>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Photos</SectionTitle>
          <SectionSubtitle>Moments That Matter</SectionSubtitle>
        </SectionHeader>
        <PhotoGrid>
          {photos.map((photo, idx) => (
            <PhotoCard key={idx}>
              <Photo src={photo.image} alt={photo.description} />
              <PhotoCaption>
                <PhotoDate>{photo.date}</PhotoDate>
                <PhotoDescription>{photo.description}</PhotoDescription>
              </PhotoCaption>
            </PhotoCard>
          ))}
        </PhotoGrid>
      </Section>
    </Container>
  );
};

export default AboutPage;
