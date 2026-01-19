import React from 'react';
import styled from 'styled-components';
import vinylImage from '../../assets/vinyl_collection.jpg';
import baseballImage from '../../assets/baseball_pitching.jpg';
import boardGameImage from '../../assets/board_game.jpg';
import hikeImage from '../../assets/hike.jpg';
import baseballFamilyImage from '../../assets/baseball_with_family.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 0px 80px 0px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
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
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const InterestsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`;

const InterestCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid ${({ theme }) => theme.primary};
  box-shadow: rgba(34, 139, 34, 0.4) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 0px 20px rgba(34, 139, 34, 0.6);
  }
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }
`;

const InterestTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 12px;
  text-align: center;
`;

const InterestDesc = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary + 99};
  text-align: center;
  line-height: 1.6;
`;

const InterestImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const interests = [
  {
    title: "Vinyl & Music",
    description: "Obsessed with discovering albums and building a vinyl collection. From Kendrick to The Strokes, music shapes how I think and create. My wall is basically a museum.",
    image: vinylImage
  },
  {
    title: "Baseball",
    description: "Pitcher who fell in love with the curveball. Learned discipline through injury recovery and threw 17 consecutive scoreless innings senior year. Baseball taught me to trust the process.",
    image: baseballImage
  },
  {
    title: "Board Games",
    description: "Strategy, storytelling, and good conversation. Board games bring people together in ways that screens can't. Always down for a new game night.",
    image: boardGameImage
  },
  {
    title: "Hiking & Outdoors",
    description: "Sunrise hikes above the Hollywood sign, beach bonfires, and finding God in creation. The outdoors clears my head and reminds me there's more to life than code.",
    image: hikeImage
  }
];

const BeyondCode = () => {
  return (
    <Container id="beyond-code">
      <Wrapper>
        <Title>Beyond Code</Title>
        <Desc>
          When I'm not building ML models, you'll find me here
        </Desc>
        <InterestsContainer>
          {interests.map((interest, index) => (
            <InterestCard key={index}>
              <InterestImage src={interest.image} alt={interest.title} />
              <InterestTitle>{interest.title}</InterestTitle>
              <InterestDesc>{interest.description}</InterestDesc>
            </InterestCard>
          ))}
        </InterestsContainer>
      </Wrapper>
    </Container>
  );
};

export default BeyondCode;
