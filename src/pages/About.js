import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import vinylImage from '../assets/vinyl_collection.jpg';
import baseballImage from '../assets/baseball_pitching.jpg';
import boardGameImage from '../assets/board_game.jpg';
import hikeImage from '../assets/hike.jpg';
import familyImage from '../assets/baseball_with_family.jpg';
import concertImage from '../assets/concert.jpg';
import guitarImage from '../assets/guitar.jpg';
import gymBibleImage from '../assets/gym_bible.jpg';
import agoImage from '../assets/alpha_gamma_omega.jpg';
import premedImage from '../assets/premed_friends.jpg';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  animation: ${fadeInUp} 0.6s ease-out;

  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 3rem;
  opacity: 0.6;
  animation: ${fadeInUp} 0.6s ease-out 0.1s backwards;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  animation: ${fadeInUp} 0.6s ease-out 0.2s backwards;

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
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  flex: 1;
  max-width: 100%;
  padding: 0 2rem;
  align-self: start;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 1rem;
    gap: 0.5rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const FlipCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  perspective: 1000px;
  cursor: pointer;
  transform: rotate(${props => props.$rotation || 0}deg) ${props => props.$translateY ? `translateY(${props.$translateY})` : ''} ${props => props.$scale ? `scale(${props.$scale})` : ''};
  transition: transform 0.3s ease;
  z-index: ${props => props.$zIndex || 1};
  overflow: visible;
  grid-column: ${props => props.$gridColumn || 'span 1'};

  &:hover {
    z-index: 100;
    transform: rotate(0deg) scale(${props => props.$scale ? props.$scale * 1.15 : 1.15}) ${props => props.$translateY ? `translateY(${props.$translateY})` : ''};
  }
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  ${FlipCard}:hover & {
    transform: rotateY(180deg);
  }
`;

const FlipCardFront = styled.div`
  position: relative;
  width: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 0 60px ${({ theme }) => theme.primary}25,
              0 0 30px ${({ theme }) => theme.primary}20;
  border: 1px solid ${({ theme }) => theme.primary}30;
`;

const FlipCardBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: 12px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.65rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  overflow: hidden;

  @media (max-width: 640px) {
    padding: 0.5rem;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const CardDate = styled.div`
  font-size: clamp(9px, 2.5vw, 12px);
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const CardLocation = styled.div`
  font-size: clamp(10px, 2.8vw, 13px);
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.35rem;
`;

const CardCaption = styled.div`
  font-size: clamp(8px, 2.2vw, 10px);
  color: ${({ theme }) => theme.text_primary};
  opacity: 0.8;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MusicSection = styled.div`
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  animation: ${fadeInUp} 0.6s ease-out 0.4s backwards;
`;

const MusicTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 2rem;
`;

const MusicLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;

const NowPlayingSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionLabel = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const NowPlayingEmbed = styled.iframe`
  border-radius: 12px;
  width: 100%;
  height: 352px;
  border: none;
`;

const AlbumsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlbumsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ToggleButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: ${({ $active, theme }) => $active
    ? theme.primary
    : (theme.bg === '#0a0a0a' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')};
  color: ${({ $active }) => $active ? 'white' : 'inherit'};
  border: 1px solid ${({ $active, theme }) => $active
    ? theme.primary
    : theme.border};
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`;

const AlbumsGrid = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-height: 352px;
`;

const AlbumsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: ${({ $visible }) => $visible ? 'relative' : 'absolute'};
  width: 100%;
  pointer-events: ${({ $visible }) => $visible ? 'auto' : 'none'};
`;

const AlbumEmbed = styled.iframe`
  border-radius: 12px;
  width: 100%;
  height: 83px;
  border: none;
`;

const photos = [
  {
    image: vinylImage,
    date: "Ongoing",
    location: "Los Angeles, CA",
    caption: "Vinyl collection growing (Stevie to The Strokes)",
    rotation: -3,
    zIndex: 1,
    scale: 1.2,
    translateY: "35px"
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
    location: "San Marino, CA",
    caption: "I have 3 younger siblings",
    rotation: -1,
    zIndex: 3,
    scale: 1.25,
    translateY: "85px"
  },
  {
    image: hikeImage,
    date: "November 2024",
    location: "Hollywood, CA",
    caption: "Hikes above the Hollywood sign",
    rotation: -2,
    zIndex: 4,
    scale: 1.25,
    translateY: "45px"
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
    image: agoImage,
    date: "November 2025",
    location: "Los Angeles, CA",
    caption: "Alpha Gamma Omega (Christian fraternity) pledge challenge - 4x4 burger and 4 donuts",
    rotation: 1,
    zIndex: 6
  },
  {
    image: concertImage,
    date: "Ongoing",
    location: "Los Angeles, CA",
    caption: "Concert nights with friends",
    rotation: -2,
    zIndex: 7,
    scale: 1.15,
    translateY: "-65px"
  },
  {
    image: guitarImage,
    date: "December 2025",
    location: "Los Angeles, CA",
    caption: "Recently bought guitar - learning worship songs",
    rotation: 2,
    zIndex: 8
  },
  {
    image: premedImage,
    date: "Fall 2025",
    location: "Los Angeles, CA",
    caption: "Premed friends at dinner - one of the few times we're not studying lol",
    rotation: -1,
    zIndex: 9,
    scale: 1.15
  }
];

const newAlbums = [
  "https://open.spotify.com/embed/album/4nOym5RKE8Opauf3rMxPAW?utm_source=generator", // Little Simz
  "https://open.spotify.com/embed/album/7r0oaJO4WR0KLgg1rZu6kg?utm_source=generator", // The Hellp
  "https://open.spotify.com/embed/album/06BotF7CerCXpcm5Km2uX7?utm_source=generator", // Will Reagan
  "https://open.spotify.com/embed/album/6o6VAIetIFOsaOa0qt7w9u?utm_source=generator"  // Quadeca
];

const oldAlbums = [
  "https://open.spotify.com/embed/album/6YUCc2RiXcEKS9ibuZxjt0?utm_source=generator", // Stevie Wonder
  "https://open.spotify.com/embed/album/4q1HNSka8CzuLvC8ydcsD2?utm_source=generator", // Parliament
  "https://open.spotify.com/embed/album/1BZoqf8Zje5nGdwZhOjAtD?utm_source=generator", // Lauryn Hill
  "https://open.spotify.com/embed/album/3JRgE1OqN7A8wrYqFxDfJO?utm_source=generator"  // John Coltrane
];

const nowPlayingEmbed = "https://open.spotify.com/embed/track/7Ee6XgP8EHKDhTMYLIndu9?utm_source=generator"; // Praise

const AboutPage = () => {
  const [cardStates, setCardStates] = useState(photos.map(() => ({ rotateX: 0, rotateY: 0, hover: false })));
  const [showNewAlbums, setShowNewAlbums] = useState(true);

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
            I'm an aspiring machine learning and data engineer based in San Marino, CA, studying Computer Science + Applied Mathematics @ <Link href="https://www.usc.edu" target="_blank" rel="noopener noreferrer">University of Southern California</Link>. I'm driven by continuous learning and building technology that helps people.
          </Paragraph>
          <Paragraph>
            My approach to tech is grounded in my Christian faith. I believe the best technology serves people and helps them flourish. Currently working on holographic video systems at <Link href="https://www.ainatech.ai/" target="_blank" rel="noopener noreferrer">AINA Tech</Link>.
          </Paragraph>
          <AsideHeading>Aside from work, I'm currently:</AsideHeading>
          <BulletList>
            <BulletItem>Expanding and deepening my taste in music and film (Peep my <Link href="https://rateyourmusic.com/~cnewt" target="_blank" rel="noopener noreferrer">RYM</Link> and <Link href="https://letterboxd.com/cnewt/" target="_blank" rel="noopener noreferrer">Letterboxd</Link>!)</BulletItem>
            <BulletItem>Hiking trails and finding God in creation. I don't have social media. I value in-real-life connection and being fully present with people</BulletItem>
            <BulletItem>Playing board games, spikeball, and pickleball with friends</BulletItem>
            <BulletItem>Exploring biohacking and optimizing daily routines (when I'm not cooked lol)</BulletItem>
          </BulletList>
        </TextContent>

        <PhotoGrid>
          {photos.map((photo, idx) => (
            <FlipCard
              key={idx}
              $rotation={photo.rotation}
              $zIndex={photo.zIndex}
              $gridColumn={photo.gridColumn}
              $translateY={photo.translateY}
              $scale={photo.scale}
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

      <MusicSection>
        <MusicTitle>Music</MusicTitle>
        <MusicLayout>
          <NowPlayingSection>
            <SectionLabel>Currently Playing</SectionLabel>
            <NowPlayingEmbed
              src={nowPlayingEmbed}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </NowPlayingSection>

          <AlbumsSection>
            <AlbumsHeader>
              <SectionLabel>Favorite Albums</SectionLabel>
              <ToggleContainer>
                <ToggleButton
                  $active={showNewAlbums}
                  onClick={() => setShowNewAlbums(true)}
                >
                  New
                </ToggleButton>
                <ToggleButton
                  $active={!showNewAlbums}
                  onClick={() => setShowNewAlbums(false)}
                >
                  Old
                </ToggleButton>
              </ToggleContainer>
            </AlbumsHeader>
            <AlbumsGrid>
              <AlbumsList $visible={showNewAlbums}>
                {newAlbums.map((embedUrl, idx) => (
                  <AlbumEmbed
                    key={idx}
                    src={embedUrl}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                ))}
              </AlbumsList>
              <AlbumsList $visible={!showNewAlbums}>
                {oldAlbums.map((embedUrl, idx) => (
                  <AlbumEmbed
                    key={idx}
                    src={embedUrl}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                ))}
              </AlbumsList>
            </AlbumsGrid>
          </AlbumsSection>
        </MusicLayout>
      </MusicSection>
    </Container>
  );
};

export default AboutPage;
