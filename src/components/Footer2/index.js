import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  max-width: 672px;
  margin: 4rem auto 0;
  padding: 2.5rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  @media (min-width: 640px) {
    padding: 2.5rem 0;
  }
`;

const GetInTouch = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const GetInTouchTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 1rem;
  letter-spacing: -0.025em;

  @media (max-width: 640px) {
    font-size: 28px;
  }
`;

const GetInTouchText = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const EmailLink = styled.a`
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  background: linear-gradient(90deg, #228B22 0%, #32CD32 50%, #00FF00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const FooterContent = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.6;
  text-align: center;
`;

const Footer2 = () => {
  const footerRef = useRef(null);

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

      if (footerRef.current) {
        observer.observe(footerRef.current);
      }

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <FooterContainer ref={footerRef}>
      <GetInTouch>
        <GetInTouchTitle>Get in Touch</GetInTouchTitle>
        <GetInTouchText>
          Want to chat? Feel free to reach out at <EmailLink href="mailto:calebnew@usc.edu">calebnew@usc.edu</EmailLink>.
        </GetInTouchText>
        <GetInTouchText>
          I'm always looking for new opportunities to learn and grow, so I'd love to chat.
        </GetInTouchText>
      </GetInTouch>
      <FooterContent>
        © {new Date().getFullYear()} Caleb Newton. Built with React + styled-components.
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer2;
