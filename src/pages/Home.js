import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import HeroImg from '../assets/CalebAtBeachUSCHoodie.jpg';
import GlassTag from '../components/GlassTag';
import uscLogo from '../assets/logos/usc.png';
import ainaTechLogo from '../assets/logos/learninglyai.png';
import caltechLogo from '../assets/logos/caltech.png';
import impact360Logo from '../assets/logos/impact360.png';
import sgvLogo from '../assets/logos/sgv.png';
import uscResearchImg from '../assets/usc_research.jpg';
import caltechResearchImg from '../assets/caltech_research.jpg';
import ainaTechSetupImg from '../assets/AinatechImages/Ainatechsetup.jpg';
import ainaTechGoatsImg from '../assets/AinatechImages/Ainatechgoats.jpg';
import everythingNightImg from '../assets/everything_night_main.jpg';
import everythingNightPlanningImg from '../assets/everythingnightplanning.jpg';
import impact360LeadershipImg from '../assets/impact360_leadership.jpg';
import dominicanRepublicImg from '../assets/dominican_republic.jpg';
import fleursetselLogo from '../assets/fleursetsel_logo.png';

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
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem 2.5rem;

  @media (min-width: 640px) {
    padding: 0 2rem 2.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2.5rem 3rem;
  }
`;

const ProfileSection = styled.section`
  margin-bottom: 4rem;
  opacity: 1;
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 16px;
  margin-bottom: 2rem;
  border: 1px solid ${({ theme }) => theme.border};
  display: block;
  margin-left: 0;
  margin-right: auto;
  box-shadow: inset 0 0 60px ${({ theme }) => theme.primary}25,
              0 0 30px ${({ theme }) => theme.primary}20;
  border: 1px solid ${({ theme }) => theme.primary}30;
`;

const Name = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
  line-height: 1.1;

  @media (min-width: 640px) {
    font-size: 3rem;
  }

  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`;

const Location = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.text_secondary};
    opacity: 0.4;
  }
`;

const Skills = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`;

const Skill = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_secondary};
  border-radius: 999px;
  font-size: 12px;
  opacity: 0.6;
`;

const TaglineWrapper = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Mission = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.7;
`;

const TimelineSection = styled.section`
  margin-top: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TimelineTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 2rem;
  letter-spacing: -0.025em;

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${({ theme }) => theme.border};
  opacity: 0.3;
`;

const TimelineItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const YearBlock = styled.div`
  position: relative;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const YearDot = styled.div`
  position: absolute;
  left: 2px;
  top: 14px;
  width: 4px;
  height: 2px;
  background: ${({ theme }) => theme.text_secondary};
  opacity: 0.2;
`;

const YearDotCircle = styled.div`
  position: absolute;
  left: 6px;
  top: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}26;
`;

const YearVerticalLine = styled.div`
  position: absolute;
  left: 10px;
  top: 22px;
  bottom: -12px;
  width: 2px;
  background: ${({ theme }) => theme.border};
  opacity: 0.1;
`;

const Year = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 0.75rem;
  opacity: 0.7;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Item = styled.li`
  position: relative;
  padding-left: 1.25rem;
  color: ${({ theme }) => theme.text_primary};
  font-size: 15px;
  line-height: 1.6;
  opacity: 0.8;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.45em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.text_secondary};
    opacity: 0.4;
  }
`;

const NestedList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0.25rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid ${({ theme }) => `${theme.primary}33`};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NestedItem = styled.li`
  position: relative;
  padding-left: 1rem;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.7;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    opacity: 0.6;
  }
`;

const Link = styled.a`
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const YearContent = styled.div`
  flex: 1;
`;

const ImagesColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 968px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FlipCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  perspective: 1000px;
  cursor: pointer;
  transform: rotate(${props => props.$rotation || 0}deg);
  transition: transform 0.3s ease;
  z-index: ${props => props.$zIndex || 1};
  overflow: visible;

  @media (min-width: 640px) {
    max-width: 300px;
  }

  &:hover {
    z-index: 1000;
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
  box-shadow: inset 0 0 60px ${({ theme }) => theme.primary}25,
              0 0 30px ${({ theme }) => theme.primary}20;
  border: 1px solid ${({ theme }) => theme.primary}30;
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
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;

  @media (min-width: 640px) {
    padding: 1rem;
    gap: 0.5rem;
  }

  @media (min-width: 968px) {
    padding: 1.5rem;
  }
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
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};

  @media (min-width: 640px) {
    font-size: 12px;
  }

  @media (min-width: 968px) {
    font-size: 13px;
  }
`;

const CardLocation = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.25rem;

  @media (min-width: 640px) {
    font-size: 13px;
    margin-bottom: 0.5rem;
  }

  @media (min-width: 968px) {
    font-size: 14px;
  }
`;

const CardCaption = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.text_primary};
  opacity: 0.8;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  @media (min-width: 640px) {
    font-size: 11px;
    -webkit-line-clamp: 4;
  }

  @media (min-width: 968px) {
    line-height: 1.3;
  }
`;

const timelineData = [
  {
    year: "2026",
    items: [
      {
        text: (
          <>
            Research Assistant @ <GlassTag logo={uscLogo} href="https://www.usc.edu">USC</GlassTag>
          </>
        ),
        nested: [
          "Coming soon: Machine Learning Research Assistant"
        ],
        images: [
          {
            image: uscResearchImg,
            date: "2026",
            location: "University of Southern California",
            caption: "Machine learning research at USC",
            rotation: -2,
            zIndex: 1
          }
        ]
      },
      {
        text: (
          <>
            Software Engineer & Immersive Studio Production Assistant @ <GlassTag logo={ainaTechLogo} href="https://www.ainatech.ai/">AINA Tech</GlassTag>
          </>
        ),
        nested: [
          "Developing AlgRun GUI automating volumetric pipeline (RED R3D decode, COLMAP, depth estimation, 4DGS) with Python/FastAPI backend, React/TypeScript frontend, WebSocket monitoring, and gscripts orchestration processing 75-camera RED Komodo captures",
          "Building COLMAP validation tools with automated diagnostics, tiered storage (10TB cache + AWS S3), and WebGPU rendering enabling non-technical operators to process multi-terabyte volumetric datasets",
          "Optimizing 4D Gaussian Splatting through GPU load balancing across 4 GPUs, CUDA profiling (nvprof, Nsight Compute), and training convergence debugging for real-time XR rendering",
          "Supporting 75-camera volumetric rig operations including setup, calibration, synchronization, on-set troubleshooting, and AWS cloud deployment for distributed processing"
        ],
        images: [
          {
            image: ainaTechSetupImg,
            date: "January 2026",
            location: "Aina Tech Studio",
            caption: "75-camera volumetric capture rig setup",
            rotation: 2,
            zIndex: 2
          },
          {
            image: ainaTechGoatsImg,
            date: "January 2026",
            location: "Aina Tech - On Location",
            caption: "Grateful for this incredible team - pushing the boundaries of holographic video together",
            rotation: 1,
            zIndex: 3
          }
        ]
      }
    ]
  },
  {
    year: "2025",
    items: [
      {
        text: (
          <>
            Strategic Business Consultant @ <GlassTag logo={fleursetselLogo} href="https://www.fleursetsel.com/">Fleurs et Sel Cookies</GlassTag>
          </>
        ),
        nested: [
          "Produced a scaling strategy for a founder-led premium bakery without losing brand identity; delivered social media feed and packaging mockups plus an implementation roadmap",
          "Built partnership and marketing recommendations using case studies (Sprinkles, Glossier) and corporate partnership research (Marriott, Delta), including QR-driven acquisition concepts"
        ]
      },
      {
        text: (
          <>
            Co-Founder @ <GlassTag logo={sgvLogo} href="/sgchristianclubcollective">SGV Christian Club Collective</GlassTag>
          </>
        ),
        nested: [
          "Spearheaded formation of a coalition uniting 15+ high school Christian clubs across the San Gabriel Valley",
          "Conceived and executed Everything Night, a first-of-its-kind regional event attracting 200+ students to 20 breakout sessions",
          "Exercised visionary leadership by filtering and curating the strongest student-led ideas into a cohesive program that maximized impact",
          "Pioneered a scalable framework for multi-school collaboration, media, and fundraising that emphasized community-building and created a replicable model for regional impact"
        ],
        images: [
          {
            image: everythingNightImg,
            date: "May 2025",
            location: "San Gabriel Valley, CA",
            caption: "Everything Night - 200+ students, 20 breakout sessions",
            rotation: -2,
            zIndex: 1
          },
          {
            image: everythingNightPlanningImg,
            date: "November 2024",
            location: "San Gabriel Valley, CA",
            caption: "Year-long planning process behind Everything Night",
            rotation: 2,
            zIndex: 2
          }
        ]
      }
    ]
  },
  {
    year: "2024",
    items: [
      {
        text: (
          <>
            Research Assistant @ <GlassTag logo={caltechLogo} href="https://www.caltech.edu">Caltech</GlassTag>
          </>
        ),
        nested: [
          "Built MATLAB and Python simulations to compare Taylan Kargin's control model against three alternatives; produced visualizations to communicate stability, efficiency, and scalability trade-offs",
          "Created system models and plots to distill theory into actionable insights for faculty and peers; supported evaluation for aerospace and robotics control strategies"
        ],
        images: [
          {
            image: caltechResearchImg,
            date: "Fall 2024",
            location: "Caltech",
            caption: "Control systems research - MATLAB and Python simulations",
            rotation: 2,
            zIndex: 1
          }
        ]
      }
    ]
  },
  {
    year: "2022-2023",
    items: [
      {
        text: (
          <>
            Leadership Development @ <GlassTag logo={impact360Logo} href="https://impact360institute.org">Impact 360 Institute</GlassTag>
          </>
        ),
        nested: [
          "Completed two summers of Christian leadership training focused on character, servant leadership, and communication",
          "Strengthened my ability to collaborate, make decisions, and lead with empathy and purpose"
        ],
        images: [
          {
            image: impact360LeadershipImg,
            date: "Summer 2022-2023",
            location: "Impact 360 Institute",
            caption: "Leadership development and servant leadership training",
            rotation: -1,
            zIndex: 1
          },
          {
            image: dominicanRepublicImg,
            date: "July 2022",
            location: "Dominican Republic",
            caption: "Mission trip - serving local communities",
            rotation: 2,
            zIndex: 2
          }
        ]
      }
    ]
  }
];

const HomePage = () => {
  const timelineSectionRef = useRef(null);
  const yearBlockRefs = useRef([]);

  useEffect(() => {
    // Small delay to ensure page is fully loaded before observing
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

      if (timelineSectionRef.current) {
        observer.observe(timelineSectionRef.current);
      }

      yearBlockRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container>
      <ProfileSection>
        <ProfileImage src={HeroImg} alt="Caleb Newton" />
        <Name>Hi, I'm Caleb Newton!</Name>
        <Location>San Marino, CA</Location>
        <Skills>
          <Skill>Machine Learning</Skill>
          <Skill>Data Engineering</Skill>
          <Skill>Computer Vision</Skill>
        </Skills>
        <TaglineWrapper>
          CS + Applied Mathematics @ <GlassTag logo={uscLogo} href="https://www.usc.edu">USC</GlassTag>
        </TaglineWrapper>
        <Mission>I want to learn and help people</Mission>
      </ProfileSection>

      <TimelineSection ref={timelineSectionRef}>
        <TimelineTitle>Timeline</TimelineTitle>
        <TimelineContainer>
          <TimelineLine />
          <TimelineItems>
            {timelineData.map((yearBlock, idx) => (
              <YearBlock
                key={idx}
                ref={(el) => (yearBlockRefs.current[idx] = el)}>
                <YearDot />
                <YearDotCircle />
                {idx < timelineData.length - 1 && <YearVerticalLine />}
                <YearContent>
                  <Year>{yearBlock.year}</Year>
                  <ItemsList>
                    {yearBlock.items.map((item, itemIdx) => (
                      <React.Fragment key={itemIdx}>
                        <Item>
                          <div>{item.text}</div>
                          {item.nested && item.nested.length > 0 && (
                            <NestedList>
                              {item.nested.map((nestedItem, nestedIdx) => (
                                <NestedItem key={nestedIdx}>{nestedItem}</NestedItem>
                              ))}
                            </NestedList>
                          )}
                        </Item>
                        {item.images && item.images.length > 0 && (
                          <ImagesColumn>
                            {item.images.map((photo, photoIdx) => (
                              <FlipCard key={photoIdx} $rotation={photo.rotation} $zIndex={photo.zIndex}>
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
                          </ImagesColumn>
                        )}
                      </React.Fragment>
                    ))}
                  </ItemsList>
                  {yearBlock.images && yearBlock.images.length > 0 && (
                    <ImagesColumn>
                      {yearBlock.images.map((photo, photoIdx) => (
                        <FlipCard key={photoIdx} $rotation={photo.rotation} $zIndex={photo.zIndex}>
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
                    </ImagesColumn>
                  )}
                </YearContent>
              </YearBlock>
            ))}
          </TimelineItems>
        </TimelineContainer>
      </TimelineSection>
    </Container>
  );
};

export default HomePage;
