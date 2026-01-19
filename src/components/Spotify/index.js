import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 0px;
  background: linear-gradient(343.07deg, rgba(34, 139, 34, 0.06) 5.71%, rgba(60, 179, 113, 0.06) 64.83%);
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 700px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const AlbumsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1000px;
  padding: 0 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const AlbumCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 0.1px solid ${({ theme }) => theme.primary};
  box-shadow: rgba(34, 139, 34, 0.4) 0px 4px 24px;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 0px 20px rgba(34, 139, 34, 0.6);
  }
`;

const AlbumArt = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  margin-bottom: 12px;
  object-fit: cover;
`;

const AlbumTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin-bottom: 6px;
  line-height: 1.3;
`;

const ArtistName = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
`;

const favoriteAlbums = [
  {
    title: "Songs in the Key of Life",
    artist: "Stevie Wonder",
    year: "1976",
    spotifyUrl: "https://open.spotify.com/album/6YUCc2RiXcEKS9ibuZxjt0",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2732e3136c8e1e978603f70c044"
  },
  {
    title: "Is This It",
    artist: "The Strokes",
    year: "2001",
    spotifyUrl: "https://open.spotify.com/album/2yNaksHgeMQM9Quse463b5",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2734735b89bcb372f8f91ef8c24"
  },
  {
    title: "Vanisher",
    artist: "Quadeca",
    year: "2024",
    spotifyUrl: "https://open.spotify.com/album/0tCk5FJuU0pZwFbS3FNdXm",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273e1ca873eb7f39f0d5debc7f5"
  },
  {
    title: "The Miseducation of Lauryn Hill",
    artist: "Lauryn Hill",
    year: "1998",
    spotifyUrl: "https://open.spotify.com/album/1BZkJ3hgvlJr2VpRYYqaC1",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2964"
  },
  {
    title: "A Love Supreme",
    artist: "John Coltrane",
    year: "1965",
    spotifyUrl: "https://open.spotify.com/album/7CeofaBHP3B0nr07cu9s8L",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273cfc23e27227a16e6e4c85d7e"
  },
  {
    title: "LL",
    artist: "The Hellp",
    year: "2023",
    spotifyUrl: "https://open.spotify.com/album/3jz7L0qKVDKHVVCWlr6qCd",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b2739abeb89a6fb9d5e18bfe3d95"
  },
  {
    title: "Plastic Beach",
    artist: "Gorillaz",
    year: "2010",
    spotifyUrl: "https://open.spotify.com/album/2dM662IqdSdLCiVBLYLCeF",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273f6e6e4a95b5f41c2b6b8e7b3"
  },
  {
    title: "Sometimes I Might Be Introvert",
    artist: "Little Simz",
    year: "2021",
    spotifyUrl: "https://open.spotify.com/album/0DqYn9h0rXqRw3D8nqJuHN",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273ce0dc4349c1e20e0f5a81da3"
  },
  {
    title: "Live at the Banks House",
    artist: "Will Reagan",
    year: "2014",
    spotifyUrl: "https://open.spotify.com/album/2N4yjMYKVJLRxcGKLEZ3nC",
    coverUrl: "https://i.scdn.co/image/ab67616d0000b273b8e8e39d6b5e0d5f2c1d6d5a"
  }
];

const Spotify = () => {
  return (
    <Container id="spotify">
      <Wrapper>
        <Title>🎵 Albums That Shape My World</Title>
        <Desc>
          Music shapes how I think and create. From Stevie's soul to Quadeca's storytelling,
          these albums are on constant rotation. My vinyl wall is basically a museum.
        </Desc>

        <AlbumsGrid>
          {favoriteAlbums.map((album, index) => (
            <AlbumCard
              key={index}
              as="a"
              href={album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <AlbumArt src={album.coverUrl} alt={`${album.title} by ${album.artist}`} />
              <AlbumTitle>{album.title}</AlbumTitle>
              <ArtistName>{album.artist} • {album.year}</ArtistName>
            </AlbumCard>
          ))}
        </AlbumsGrid>
      </Wrapper>
    </Container>
  );
};

export default Spotify;
