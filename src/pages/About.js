import React, { useState } from 'react';
import styled from 'styled-components';
import vinylImage from '../assets/vinyl_collection.jpg';
import baseballImage from '../assets/baseball_pitching.jpg';
import boardGameImage from '../assets/board_game.jpg';
import hikeImage from '../assets/hike.jpg';
import familyImage from '../assets/baseball_with_family.jpg';

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
  gap: 3rem;

  @media (min-width: 968px) {
    grid-template-columns: 45% 1fr;
    gap: 4rem;
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

  /* Make the middle photo span 2 columns on larger screens */
  & > div:nth-child(3) {
    @media (min-width: 640px) {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FlipCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  perspective: 1000px;
  cursor: pointer;
  transform: rotate(${props => props.$rotation || 0}deg) ${props => props.$hover ? `perspective(1000px) rotateX(${props.$rotateX}deg) rotateY(${props.$rotateY}deg)` : ''};
  transition: transform 0.3s ease, z-index 0s;
  z-index: ${props => props.$zIndex || 1};

  &:hover {
    z-index: 10;
    transform: rotate(0deg) scale(1.05) perspective(1000px) rotateX(${props => props.$rotateX || 0}deg) rotateY(${props => props.$rotateY || 0}deg);
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

const photos = [
  {
    image: vinylImage,
    date: "ongoing",
    location: "los angeles, ca",
    caption: "vinyl wall growing (stevie to the strokes)",
    rotation: -3,
    zIndex: 1
  },
  {
    image: baseballImage,
    date: "may 2025",
    location: "san marino, ca",
    caption: "pitched in high school - loved the competition and strategy",
    rotation: 2,
    zIndex: 2
  },
  {
    image: familyImage,
    date: "ongoing",
    location: "los angeles, ca",
    caption: "i have 3 younger siblings",
    rotation: -1,
    zIndex: 3
  },
  {
    image: hikeImage,
    date: "june 2025",
    location: "los angeles, ca",
    caption: "sunrise hikes above the hollywood sign",
    rotation: -2,
    zIndex: 4
  },
  {
    image: boardGameImage,
    date: "ongoing",
    location: "los angeles, ca",
    caption: "board game nights with friends",
    rotation: 3,
    zIndex: 5
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
      <Title>about</Title>
      <Subtitle>who i am.</Subtitle>

      <ContentWrapper>
        <TextContent>
          <SectionHeading>more about me...</SectionHeading>
          <Paragraph>
            i'm a machine learning engineer based in los angeles, ca, studying computer science + applied mathematics @ <Link href="https://www.usc.edu" target="_blank" rel="noopener noreferrer">university of southern california</Link>. i love building software that makes people's lives better.
          </Paragraph>
          <Paragraph>
            my approach to tech is grounded in my christian faith—i believe the best technology serves people and helps them flourish. currently working on holographic video systems at <Link href="https://ainatech.com" target="_blank" rel="noopener noreferrer">aina tech</Link>.
          </Paragraph>

          <AsideHeading>aside from work, i'm currently:</AsideHeading>
          <BulletList>
            <BulletItem>collecting vinyl records (stevie wonder, the strokes, quadeca)</BulletItem>
            <BulletItem>hiking trails at sunrise and finding god in creation</BulletItem>
            <BulletItem>playing board games with friends (settlers, ticket to ride, catan)</BulletItem>
            <BulletItem>exploring biohacking and optimizing daily routines</BulletItem>
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
    </Container>
  );
};

export default AboutPage;
