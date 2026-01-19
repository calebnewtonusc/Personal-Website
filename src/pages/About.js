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

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 2.5rem;
`;

const SectionHeading = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
`;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const BulletList = styled.ul`
  list-style: disc;
  margin-left: 1.25rem;
  margin-bottom: 2rem;
`;

const BulletItem = styled.li`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

const PhotoSection = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const PhotoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Photo = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  display: block;
`;

const PhotoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PhotoDate = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const PhotoLocation = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const PhotoCaption = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  opacity: 0.8;
  font-style: italic;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const photos = [
  {
    image: vinylImage,
    date: "Ongoing",
    location: "Los Angeles, CA",
    caption: "vinyl wall growing (stevie to the strokes)"
  },
  {
    image: baseballImage,
    date: "May 2025",
    location: "San Marino, CA",
    caption: "17 consecutive scoreless innings senior year"
  },
  {
    image: hikeImage,
    date: "June 2025",
    location: "Los Angeles, CA",
    caption: "sunrise hikes above the hollywood sign"
  },
  {
    image: dominicanImage,
    date: "July 2024",
    location: "Dominican Republic",
    caption: "mission trip serving communities"
  },
  {
    image: boardGameImage,
    date: "Ongoing",
    location: "Los Angeles, CA",
    caption: "board game nights with friends"
  },
  {
    image: baseballFamilyImage,
    date: "May 2025",
    location: "San Marino, CA",
    caption: "baseball with family"
  }
];

const AboutPage = () => {
  return (
    <Container>
      <Section>
        <Title>About</Title>
        <Subtitle>Who I am.</Subtitle>

        <SectionHeading>more about me...</SectionHeading>
        <Paragraph>
          I'm a machine learning engineer based in Los Angeles, CA, studying Computer Science + Applied Mathematics @ <Link href="https://www.usc.edu" target="_blank" rel="noopener noreferrer">University of Southern California</Link>. I love building software that makes people's lives better.
        </Paragraph>
        <Paragraph>
          My approach to tech is grounded in my Christian faith—I believe the best technology serves people and helps them flourish. Currently working on holographic video systems at <Link href="https://ainatech.com" target="_blank" rel="noopener noreferrer">Aina Tech</Link>.
        </Paragraph>
      </Section>

      <Section>
        <SectionHeading>Aside from work, I'm currently:</SectionHeading>
        <BulletList>
          <BulletItem>Deep diving into PyTorch, transformers, and computer vision</BulletItem>
          <BulletItem>Building holographic video with Gaussian Splatting and NeRFs</BulletItem>
          <BulletItem>Collecting vinyl records (Stevie Wonder, The Strokes, Quadeca)</BulletItem>
          <BulletItem>Hiking trails at sunrise and finding God in creation</BulletItem>
        </BulletList>
      </Section>

      <PhotoSection>
        {photos.map((photo, idx) => (
          <PhotoItem key={idx}>
            <Photo src={photo.image} alt={photo.caption} />
            <PhotoInfo>
              <PhotoDate>{photo.date}</PhotoDate>
              <PhotoLocation>{photo.location}</PhotoLocation>
              <PhotoCaption>{photo.caption}</PhotoCaption>
            </PhotoInfo>
          </PhotoItem>
        ))}
      </PhotoSection>
    </Container>
  );
};

export default AboutPage;
