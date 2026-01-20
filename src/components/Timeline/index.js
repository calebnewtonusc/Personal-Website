import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px 80px 20px;
`;

const YearSection = styled.div`
  margin-bottom: 60px;
`;

const Year = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TimelineItem = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
`;

const Logo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 24px;
`;

const ItemContent = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 4px;
`;

const ItemSubtitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 8px;
`;

const ItemDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary};
  opacity: 0.9;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
  margin-top: 8px;
`;

const timelineData = [
  {
    year: "2026",
    items: [
      {
        logo: "🎓",
        title: "Computer Science + Applied Math Student",
        subtitle: "University of Southern California",
        description: "Deep diving into ML foundations: PyTorch, transformers, computer vision, and ranking systems. Building technical depth in neural architectures and production ML tools.",
        tags: ["Machine Learning", "PyTorch", "Computer Vision"]
      }
    ]
  },
  {
    year: "2025",
    items: [
      {
        logo: "🤖",
        title: "ModelLab",
        subtitle: "Personal Project",
        description: "Building an interactive ML testing platform for comparing model performance across tasks. Features custom evaluation harnesses and model comparison tools.",
        tags: ["Deep Learning", "Model Evaluation", "Web App"]
      },
      {
        logo: "🧠",
        title: "16 Tech Personalities Assessment",
        subtitle: "Personal Project",
        description: "Created a personality framework for tech professionals with 5 key spectrums. Helps developers understand their working style and team dynamics.",
        tags: ["Psychology", "Web Development", "UX Design"]
      },
      {
        logo: "🍕",
        title: "FoodVision Mini",
        subtitle: "Computer Vision Project",
        description: "Food classification system using Vision Transformers and EfficientNet. Achieved high accuracy on Food101 dataset with transfer learning.",
        tags: ["Computer Vision", "Transfer Learning", "PyTorch"]
      },
      {
        logo: "⚾",
        title: "Baseball - Varsity Pitcher",
        subtitle: "High School",
        description: "Threw 17 consecutive scoreless innings senior year. Learned discipline through injury recovery and the value of trusting the process.",
        tags: ["Leadership", "Resilience"]
      }
    ]
  },
  {
    year: "2024",
    items: [
      {
        logo: "✝️",
        title: "ACTS Leadership Team",
        subtitle: "High School Ministry",
        description: "Led high school ministry focusing on authentic community and spiritual formation. Organized events and mentored younger students.",
        tags: ["Leadership", "Community", "Faith"]
      },
      {
        logo: "🌎",
        title: "Dominican Republic Mission Trip",
        subtitle: "Service & Ministry",
        description: "Served communities in the Dominican Republic through construction, education support, and building relationships across cultures.",
        tags: ["Service", "Cross-Cultural"]
      }
    ]
  }
];

const Timeline = () => {
  return (
    <Container>
      {timelineData.map((yearSection, idx) => (
        <YearSection key={idx}>
          <Year>{yearSection.year}</Year>
          {yearSection.items.map((item, itemIdx) => (
            <TimelineItem key={itemIdx}>
              <ItemHeader>
                <Logo>{item.logo}</Logo>
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemSubtitle>{item.subtitle}</ItemSubtitle>
                </ItemContent>
              </ItemHeader>
              <ItemDescription>{item.description}</ItemDescription>
              <div>
                {item.tags.map((tag, tagIdx) => (
                  <Tag key={tagIdx}>{tag}</Tag>
                ))}
              </div>
            </TimelineItem>
          ))}
        </YearSection>
      ))}
    </Container>
  );
};

export default Timeline;
