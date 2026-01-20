import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import crowdImg from '../assets/everything_night_crowd.jpg';
import dinnerImg from '../assets/everything_night_dinner.jpg';
import bandImg from '../assets/everything_night_band.jpg';
import dodgeballImg from '../assets/everything_night_dodgeball.jpg';
import picnicImg from '../assets/everything_night_picnic.jpg';
import posterImg from '../assets/everything_night_poster.jpg';
import chosenDabImg from '../assets/chosen_dab.jpg';
import chosenCrowdImg from '../assets/chosen_crowd.jpg';
import chosenTeamImg from '../assets/chosen_team.jpg';

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

const HeaderSection = styled.div`
  animation: ${fadeInUp} 0.6s ease-out;
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

const ContentSection = styled.div`
  opacity: 0;
  transform: translateY(60px) scale(0.95);
  transition: opacity 1s ease-out, transform 1s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const EventSection = styled.div`
  margin-bottom: 4rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  opacity: 0;
  transform: translateY(60px) scale(0.95);
  transition: opacity 1s ease-out, transform 1s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

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
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const EverythingNightGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const GridColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FlipCard = styled.div`
  position: relative;
  width: 100%;
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
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const ImageCaption = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  opacity: 0.8;
  line-height: 1.5;
`;

const everythingNightImages = {
  column1: [
    {
      src: posterImg,
      caption: "Everything Night Event Poster",
      rotation: -2,
      zIndex: 1
    }
  ],
  column2: [
    {
      src: crowdImg,
      caption: "200+ Students Gathered for Community and Faith",
      rotation: 1,
      zIndex: 2
    },
    {
      src: dinnerImg,
      caption: "Students Enjoying Dinner Together",
      rotation: -1,
      zIndex: 3
    }
  ],
  column3: [
    {
      src: dodgeballImg,
      caption: "Fun and Games - Dodgeball Tournament",
      rotation: -2,
      zIndex: 4
    },
    {
      src: picnicImg,
      caption: "Community Building Through Shared Meals",
      rotation: 1,
      zIndex: 5
    }
  ],
  column4: [
    {
      src: bandImg,
      caption: "Live Worship Band Performance",
      rotation: 2,
      zIndex: 6
    }
  ]
};

const chosenImages = [
  {
    src: chosenDabImg,
    caption: "Celebrating Community at Chosen Event",
    rotation: -1,
    zIndex: 1
  },
  {
    src: chosenCrowdImg,
    caption: "100+ Students Gathered for Worship and Community",
    rotation: 2,
    zIndex: 2
  },
  {
    src: chosenTeamImg,
    caption: "Planning Team - Student Leaders from Across the SGV",
    rotation: -2,
    zIndex: 3
  }
];

const SGVCCCPage = () => {
  const contentSectionRef = useRef(null);
  const eventSectionRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      if (contentSectionRef.current) {
        observer.observe(contentSectionRef.current);
      }

      eventSectionRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <HeaderSection>
        <Title>SGV Christian Club Collective</Title>
        <Subtitle>November 2024 - June 2025</Subtitle>
      </HeaderSection>

      <ContentSection ref={contentSectionRef}>
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

      <EventSection ref={(el) => (eventSectionRefs.current[0] = el)}>
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
            <FlipCard key={idx} $rotation={img.rotation} $zIndex={img.zIndex}>
              <FlipCardInner>
                <FlipCardFront>
                  <Image src={img.src} alt={img.caption} />
                </FlipCardFront>
                <FlipCardBack>
                  <ImageCaption>{img.caption}</ImageCaption>
                </FlipCardBack>
              </FlipCardInner>
            </FlipCard>
          ))}
        </ImageGrid>
      </EventSection>

      <EventSection ref={(el) => (eventSectionRefs.current[1] = el)}>
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
        <EverythingNightGrid>
          <GridColumn>
            {everythingNightImages.column1.map((img, idx) => (
              <FlipCard key={idx} $rotation={img.rotation} $zIndex={img.zIndex}>
                <FlipCardInner>
                  <FlipCardFront>
                    <Image src={img.src} alt={img.caption} />
                  </FlipCardFront>
                  <FlipCardBack>
                    <ImageCaption>{img.caption}</ImageCaption>
                  </FlipCardBack>
                </FlipCardInner>
              </FlipCard>
            ))}
          </GridColumn>
          <GridColumn>
            {everythingNightImages.column2.map((img, idx) => (
              <FlipCard key={idx} $rotation={img.rotation} $zIndex={img.zIndex}>
                <FlipCardInner>
                  <FlipCardFront>
                    <Image src={img.src} alt={img.caption} />
                  </FlipCardFront>
                  <FlipCardBack>
                    <ImageCaption>{img.caption}</ImageCaption>
                  </FlipCardBack>
                </FlipCardInner>
              </FlipCard>
            ))}
          </GridColumn>
          <GridColumn>
            {everythingNightImages.column3.map((img, idx) => (
              <FlipCard key={idx} $rotation={img.rotation} $zIndex={img.zIndex}>
                <FlipCardInner>
                  <FlipCardFront>
                    <Image src={img.src} alt={img.caption} />
                  </FlipCardFront>
                  <FlipCardBack>
                    <ImageCaption>{img.caption}</ImageCaption>
                  </FlipCardBack>
                </FlipCardInner>
              </FlipCard>
            ))}
          </GridColumn>
          <GridColumn>
            {everythingNightImages.column4.map((img, idx) => (
              <FlipCard key={idx} $rotation={img.rotation} $zIndex={img.zIndex}>
                <FlipCardInner>
                  <FlipCardFront>
                    <Image src={img.src} alt={img.caption} />
                  </FlipCardFront>
                  <FlipCardBack>
                    <ImageCaption>{img.caption}</ImageCaption>
                  </FlipCardBack>
                </FlipCardInner>
              </FlipCard>
            ))}
          </GridColumn>
        </EverythingNightGrid>
      </EventSection>
      </ContentSection>
    </Container>
  );
};

export default SGVCCCPage;
