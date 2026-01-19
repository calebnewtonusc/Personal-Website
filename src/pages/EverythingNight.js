import React from 'react';
import styled from 'styled-components';
import crowdImg from '../assets/everything_night_crowd.jpg';
import dinnerImg from '../assets/everything_night_dinner.jpg';
import bandImg from '../assets/everything_night_band.jpg';
import dodgeballImg from '../assets/everything_night_dodgeball.jpg';
import picnicImg from '../assets/everything_night_picnic.jpg';
import posterImg from '../assets/everything_night_poster.jpg';
import chosenDabImg from '../assets/chosen_dab.jpg';

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

const EventSection = styled.div`
  margin-bottom: 4rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const EventTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
`;

const EventDate = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 1.5rem;
  opacity: 0.8;
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

const everythingNightImages = [
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

const chosenImages = [
  {
    src: chosenDabImg,
    caption: "Celebrating Community at Chosen Event"
  }
];

const SGVCCCPage = () => {
  return (
    <Container>
      <Title>SGV Christian Club Collective</Title>
      <Subtitle>November 2024 - June 2025</Subtitle>

      <Description>
        <p>
          The SGV Christian Club Collective was a coalition uniting 15+ high school Christian clubs
          across the San Gabriel Valley. Through collaborative events, media initiatives, and fundraising,
          we created a scalable framework for multi-school partnerships that emphasized community-building
          and regional impact.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Our mission was to bring students together across school boundaries to experience faith,
          fellowship, and discovery. We organized two major events that brought hundreds of students
          together in meaningful ways.
        </p>
      </Description>

      <EventSection>
        <EventTitle>Chosen</EventTitle>
        <EventDate>April 12, 2025</EventDate>
        <Description>
          <p>
            Chosen was a worship night that brought together 100+ students for an evening of community,
            faith, and celebration. The event featured dinner service, interactive games, and two worship
            music sets performed by student musicians.
          </p>
          <p style={{ marginTop: '1rem' }}>
            This event laid the foundation for our larger vision and demonstrated the appetite for
            cross-school collaboration in the San Gabriel Valley. Students from multiple high schools
            came together to serve, lead, and worship as one community.
          </p>
        </Description>
        <ImageGrid>
          {chosenImages.map((img, idx) => (
            <ImageCard key={idx}>
              <Image src={img.src} alt={img.caption} />
              <ImageCaption>{img.caption}</ImageCaption>
            </ImageCard>
          ))}
        </ImageGrid>
      </EventSection>

      <EventSection>
        <EventTitle>Everything Night</EventTitle>
        <EventDate>May 23, 2025</EventDate>
        <Description>
          <p>
            Everything Night was a first-of-its-kind regional outreach event that brought together 200+
            students from across the San Gabriel Valley for an evening of community, faith, and discovery.
          </p>
          <p style={{ marginTop: '1rem' }}>
            The event featured 20 breakout sessions covering topics ranging from faith and identity to
            creativity and purpose. It represented months of collaboration between 15+ high school Christian
            clubs and demonstrated the power of unified student leadership.
          </p>
        </Description>
        <ImageGrid>
          {everythingNightImages.map((img, idx) => (
            <ImageCard key={idx}>
              <Image src={img.src} alt={img.caption} />
              <ImageCaption>{img.caption}</ImageCaption>
            </ImageCard>
          ))}
        </ImageGrid>
      </EventSection>
    </Container>
  );
};

export default SGVCCCPage;
