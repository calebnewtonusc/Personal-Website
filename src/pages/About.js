import React, { useState } from 'react';
import styled from 'styled-components';
import vinylImage from '../assets/vinyl_collection.jpg';
import baseballImage from '../assets/baseball_pitching.jpg';
import boardGameImage from '../assets/board_game.jpg';
import hikeImage from '../assets/hike.jpg';
import familyImage from '../assets/baseball_with_family.jpg';
import dominicanImage from '../assets/dominican_republic.jpg';
import impact360Image from '../assets/impact360_leadership.jpg';

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
  opacity: 0.6;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 968px) {
    grid-template-columns: 45% 1fr;
    gap: 3rem;
  }
`;

const TextContent = styled.div`
  flex: 1;
`;

const SectionHeading = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const AsideHeading = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 2rem 0 1rem 0;
  font-style: italic;
`;

const BulletList = styled.ul`
  list-style: disc;
  margin-left: 1.25rem;
  margin-bottom: 1rem;
`;

const BulletItem = styled.li`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  flex: 1;
  max-width: 100%;
  padding: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FlipCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 3 / 2;
  perspective: 1000px;
  cursor: pointer;
  transform: rotate(${props => props.$rotation || 0}deg);
  transition: transform 0.3s ease;
  z-index: ${props => props.$zIndex || 1};
  overflow: visible;

  &:hover {
    z-index: 10;
    transform: rotate(0deg) scale(1.05);
  }
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  ${FlipCard}:hover & {
    transform: rotateY(180deg);
  }
`;

const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
`;

const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: 12px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const CardDate = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const CardLocation = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
`;

const CardCaption = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  opacity: 0.8;
  line-height: 1.5;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SpotifySection = styled.div`
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const SpotifyTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1.5rem;
`;

const SpotifyEmbed = styled.iframe`
  border-radius: 12px;
  width: 100%;
  height: 352px;
  border: none;
`;

const photos = [
  {
    image: vinylImage,
    date: "Ongoing",
    location: "Los Angeles, CA",
    caption: "Vinyl wall growing (Stevie to The Strokes)",
    rotation: -3,
    zIndex: 1
  },
  {
    image: baseballImage,
    date: "May 2025",
    location: "San Marino, CA",
    caption: "Pitched in high school - loved the competition and strategy",
    rotation: 2,
    zIndex: 2
  },
  {
    image: familyImage,
    date: "Ongoing",
    location: "Los Angeles, CA",
    caption: "I have 3 younger siblings",
    rotation: -1,
    zIndex: 3
  },
  {
    image: hikeImage,
    date: "June 2025",
    location: "Los Angeles, CA",
    caption: "Sunrise hikes above the Hollywood sign",
    rotation: -2,
    zIndex: 4
  },
  {
    image: boardGameImage,
    date: "Ongoing",
    location: "Los Angeles, CA",
    caption: "Board game nights with friends",
    rotation: 3,
    zIndex: 5
  },
  {
    image: impact360Image,
    date: "Summer 2022-2023",
    location: "Pine Mountain, GA",
    caption: "Leadership training at Impact 360 Institute",
    rotation: -2,
    zIndex: 6
  },
  {
    image: dominicanImage,
    date: "March 2023",
    location: "Dominican Republic",
    caption: "Mission trip serving communities",
    rotation: 1,
    zIndex: 7
  }
];

const AboutPage = () => {
  const [cardStates, setCardStates] = useState(photos.map(() => ({ rotateX: 0, rotateY: 0, hover: false })));

  const handleMouseMove = (idx, e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setCardStates(prev => {
      const newStates = [...prev];
      newStates[idx] = { rotateX, rotateY, hover: true };
      return newStates;
    });
  };

  const handleMouseLeave = (idx) => {
    setCardStates(prev => {
      const newStates = [...prev];
      newStates[idx] = { rotateX: 0, rotateY: 0, hover: false };
      return newStates;
    });
  };

  return (
    <Container>
      <Title>About</Title>
      <Subtitle>Who I am.</Subtitle>

      <ContentWrapper>
        <TextContent>
          <SectionHeading>More About Me...</SectionHeading>
          <Paragraph>
            I'm a machine learning engineer based in Los Angeles, CA, studying Computer Science + Applied Mathematics @ <Link href="https://www.usc.edu" target="_blank" rel="noopener noreferrer">University of Southern California</Link>. I love building software that makes people's lives better.
          </Paragraph>
          <Paragraph>
            My approach to tech is grounded in my Christian faith—I believe the best technology serves people and helps them flourish. Currently working on holographic video systems at <Link href="https://www.ainatech.ai/" target="_blank" rel="noopener noreferrer">Aina Tech</Link>.
          </Paragraph>

          <AsideHeading>Aside from work, I'm currently:</AsideHeading>
          <BulletList>
            <BulletItem>Collecting vinyl records (Stevie Wonder, The Strokes, Quadeca)</BulletItem>
            <BulletItem>Hiking trails at sunrise and finding God in creation</BulletItem>
            <BulletItem>Playing board games with friends (Settlers, Ticket to Ride, Catan)</BulletItem>
            <BulletItem>Exploring biohacking and optimizing daily routines</BulletItem>
          </BulletList>
        </TextContent>

        <PhotoGrid>
          {photos.map((photo, idx) => (
            <FlipCard
              key={idx}
              $rotation={photo.rotation}
              $zIndex={photo.zIndex}
              $rotateX={cardStates[idx].rotateX}
              $rotateY={cardStates[idx].rotateY}
              $hover={cardStates[idx].hover}
              onMouseMove={(e) => handleMouseMove(idx, e)}
              onMouseLeave={() => handleMouseLeave(idx)}
            >
              <FlipCardInner>
                <FlipCardFront>
                  <Photo src={photo.image} alt={photo.caption} />
                </FlipCardFront>
                <FlipCardBack>
                  <CardDate>{photo.date}</CardDate>
                  <CardLocation>{photo.location}</CardLocation>
                  <CardCaption>{photo.caption}</CardCaption>
                </FlipCardBack>
              </FlipCardInner>
            </FlipCard>
          ))}
        </PhotoGrid>
      </ContentWrapper>

      <SpotifySection>
        <SpotifyTitle>Now Playing</SpotifyTitle>
        <SpotifyEmbed
          src="https://open.spotify.com/embed/playlist/37i9dQZF1EpseloNqbLMWJ?utm_source=generator&theme=0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </SpotifySection>
    </Container>
  );
};

export default AboutPage;
