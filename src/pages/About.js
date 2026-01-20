import React, { useState } from 'react';
import styled from 'styled-components';
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
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  flex: 1;
  max-width: 100%;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

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
  overflow: hidden;

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
  box-shadow: inset 0 0 60px ${({ theme }) => theme.primary}15,
              0 0 30px ${({ theme }) => theme.primary}10;
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

const MusicSection = styled.div`
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const MusicHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const MusicTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem;
  border-radius: 999px;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.06)'
    : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${({ theme }) => theme.bg === '#0a0a0a'
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(0,0,0,0.08)'};
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $active, theme }) => $active
    ? (theme.bg === '#0a0a0a' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)')
    : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.text_primary : theme.text_secondary};

  &:hover {
    color: ${({ theme }) => theme.text_primary};
    background: ${({ $active, theme }) => !$active && (theme.bg === '#0a0a0a'
      ? 'rgba(255,255,255,0.08)'
      : 'rgba(0,0,0,0.03)')};
  }
`;

const AlbumsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const AlbumCard = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const AlbumArt = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const AlbumArtImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const AlbumName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;
`;

const AlbumArtist = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const NowPlayingSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const NowPlayingTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
`;

const SpotifyEmbed = styled.iframe`
  border-radius: 12px;
  width: 100%;
  height: 152px;
  border: none;
`;

const photos = [
  {
    image: vinylImage,
    date: "Ongoing",
    location: "Los Angeles, CA",
    caption: "Vinyl collection growing (Stevie to The Strokes)",
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
    location: "San Marino, CA",
    caption: "I have 3 younger siblings",
    rotation: -1,
    zIndex: 3
  },
  {
    image: hikeImage,
    date: "November 2024",
    location: "Hollywood, CA",
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
    image: agoImage,
    date: "November 2025",
    location: "Los Angeles, CA",
    caption: "Alpha Gamma Omega pledge challenge - 4x4 burger and 4 donuts",
    rotation: 1,
    zIndex: 6
  },
  {
    image: concertImage,
    date: "Ongoing",
    location: "Los Angeles, CA",
    caption: "Concert nights with friends",
    rotation: -2,
    zIndex: 7
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
    zIndex: 9
  }
];

const oldAlbums = [
  {
    name: "Songs in the Key of Life",
    artist: "Stevie Wonder",
    spotify: "https://open.spotify.com/album/6YUCc2RiXcEKS9ibuZxjt0",
    image: "https://i.scdn.co/image/ab67616d0000b2732aa04b29ecd22d1389d1b925"
  },
  {
    name: "The Miseducation of Lauryn Hill",
    artist: "Lauryn Hill",
    spotify: "https://open.spotify.com/album/1BZoqf8Zje5nGdwZhOjAtD",
    image: "https://i.scdn.co/image/ab67616d0000b273390a5d4f71c9519c3e94acd9"
  },
  {
    name: "Mothership Connection",
    artist: "Parliament",
    spotify: "https://open.spotify.com/album/36ltakMWOJ7FUjfmG0vOtJ",
    image: "https://i.scdn.co/image/ab67616d0000b273b9b66d3f7e19f48e68e25ee0"
  },
  {
    name: "A Love Supreme",
    artist: "John Coltrane",
    spotify: "https://open.spotify.com/album/7FWR41OwYX3vvRXOrREJHG",
    image: "https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf"
  }
];

const newAlbums = [
  {
    name: "LL",
    artist: "The Hellp",
    spotify: "https://open.spotify.com/album/0Oc2i2rRn7fxVPYiM8n7pL",
    image: "https://i.scdn.co/image/ab67616d0000b27333b929789076b07b1ca9bbaf"
  },
  {
    name: "Live at the Banks House",
    artist: "Will Reagan",
    spotify: "https://open.spotify.com/album/37CrDTv7KN6jL4Nz2X6Kke",
    image: "https://i.scdn.co/image/ab67616d0000b2732e27e66e5e87f0d01c328c5b"
  },
  {
    name: "Vanisher",
    artist: "Quadeca",
    spotify: "https://open.spotify.com/album/1WJj3jDgUFJpHb5xGz3Q6r",
    image: "https://i.scdn.co/image/ab67616d0000b2732de68eb707cc400f908a6ec5"
  },
  {
    name: "Sometimes I Might Be Introvert",
    artist: "Little Simz",
    spotify: "https://open.spotify.com/album/0DBoWQ52XUHtrZQdfAqOVj",
    image: "https://i.scdn.co/image/ab67616d0000b2733ae914c69f8afa479c300501"
  }
];

const AboutPage = () => {
  const [cardStates, setCardStates] = useState(photos.map(() => ({ rotateX: 0, rotateY: 0, hover: false })));
  const [activeTab, setActiveTab] = useState('old');

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

  const currentAlbums = activeTab === 'old' ? oldAlbums : newAlbums;

  return (
    <Container>
      <Title>About</Title>
      <Subtitle>Who I am.</Subtitle>

      <ContentWrapper>
        <TextContent>
          <SectionHeading>More About Me...</SectionHeading>
          <Paragraph>
            I'm an aspiring machine learning and data engineer based in San Marino, CA, studying Computer Science + Applied Mathematics @ <Link href="https://www.usc.edu" target="_blank" rel="noopener noreferrer">University of Southern California</Link>. I love building cool things and learning constantly.
          </Paragraph>
          <Paragraph>
            My approach to tech is grounded in my Christian faith—I believe the best technology serves people and helps them flourish. Currently working on holographic video systems at <Link href="https://www.ainatech.ai/" target="_blank" rel="noopener noreferrer">AINA Tech</Link>.
          </Paragraph>
          <Paragraph>
            I love exploring artists' discographies in depth and have been getting into more movies lately. Outside of tech, you'll find me playing spikeball, pickleball, or trying new things.
          </Paragraph>
          <Paragraph>
            I don't have social media—kind of ironic for someone going into tech. I value in-real-life connection and being fully present with people.
          </Paragraph>

          <AsideHeading>Aside from work, I'm currently:</AsideHeading>
          <BulletList>
            <BulletItem>Collecting vinyl records and exploring artists' discographies (Stevie Wonder, The Strokes, Quadeca)</BulletItem>
            <BulletItem>Getting into more movies and tracking them on <Link href="https://letterboxd.com/cnewt/" target="_blank" rel="noopener noreferrer">Letterboxd</Link></BulletItem>
            <BulletItem>Rating and cataloging music on <Link href="https://rateyourmusic.com/~cnewt" target="_blank" rel="noopener noreferrer">RateYourMusic</Link></BulletItem>
            <BulletItem>Hiking trails at sunrise and finding God in creation</BulletItem>
            <BulletItem>Playing board games, spikeball, and pickleball with friends</BulletItem>
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

      <MusicSection>
        <MusicHeader>
          <MusicTitle>Music</MusicTitle>
          <TabContainer>
            <Tab $active={activeTab === 'old'} onClick={() => setActiveTab('old')}>
              Favorite Old Albums
            </Tab>
            <Tab $active={activeTab === 'new'} onClick={() => setActiveTab('new')}>
              Favorite New Albums
            </Tab>
          </TabContainer>
        </MusicHeader>

        <AlbumsGrid>
          {currentAlbums.map((album, idx) => (
            <AlbumCard key={idx} href={album.spotify} target="_blank" rel="noopener noreferrer">
              <AlbumArt>
                <AlbumArtImage src={album.image} alt={`${album.name} by ${album.artist}`} />
              </AlbumArt>
              <AlbumInfo>
                <AlbumName>{album.name}</AlbumName>
                <AlbumArtist>{album.artist}</AlbumArtist>
              </AlbumInfo>
            </AlbumCard>
          ))}
        </AlbumsGrid>

        <NowPlayingSection>
          <NowPlayingTitle>Now Playing</NowPlayingTitle>
          <SpotifyEmbed
            src="https://open.spotify.com/embed/track/37f17hCX9Slu0HwHI6k9tE?utm_source=generator"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </NowPlayingSection>
      </MusicSection>
    </Container>
  );
};

export default AboutPage;
