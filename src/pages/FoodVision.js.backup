import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
  padding: 100px 20px 80px 20px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
`;

const BackButton = styled.button`
  background: transparent;
  border: 1.8px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Tagline = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 24px;
`;

const LiveBadge = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const LiveLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1.8px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 32px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary}40;
  }
`;

const Section = styled.div`
  background: ${({ theme }) => theme.card};
  border: 0.1px solid ${({ theme }) => theme.primary};
  box-shadow: rgba(34, 139, 34, 0.4) 0px 4px 24px;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`;

const ListItem = styled.li`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary + 99};
  padding: 8px 0 8px 20px;
  position: relative;
  &:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const CodeBlock = styled.pre`
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => theme.primary + 40};
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  margin: 16px 0;
  line-height: 1.6;
`;

const FoodVision = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <BackButton onClick={() => navigate('/')}>
          <ArrowBackIcon /> Back to Home
        </BackButton>

        <Header>
          <Title>Food Vision</Title>
          <Tagline>Production ML Pipeline - 97.20% Accuracy</Tagline>
          <LiveBadge>✅ Live in Production</LiveBadge>
          <LiveLink href="https://foodvis.in" target="_blank" rel="noopener noreferrer">
            🚀 Try it at foodvis.in →
          </LiveLink>
        </Header>

        <Section>
          <SectionTitle>The Project</SectionTitle>
          <Text>
            Implemented production ML pipeline for Food101 image classification using EfficientNetB2 with progressive
            fine-tuning and discriminative learning rates, achieving <strong>97.20% accuracy</strong>. Built custom
            evaluation harness measuring accuracy, F1, calibration (ECE: 0.0147), and inference latency (p50/p95).
            Deployed to <a href="https://foodvis.in" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'underline'}}>foodvis.in</a> using
            HuggingFace Spaces (FastAPI backend) and Vercel (React frontend) with 70% confidence threshold for
            unknown food detection.
          </Text>
          <Text>
            This project demonstrates end-to-end MLOps: from data preparation through training, comprehensive
            evaluation, and production deployment with custom domain and HTTPS. The system intelligently rejects
            non-food images and serves predictions in ~500ms on CPU with free hosting infrastructure.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Key Achievements</SectionTitle>
          <List>
            <ListItem><strong>97.20% Accuracy</strong> - Exceeded 90% target by 7.2% using progressive fine-tuning</ListItem>
            <ListItem><strong>Production Deployment</strong> - Live at <a href="https://foodvis.in" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'underline'}}>foodvis.in</a> with custom domain and HTTPS</ListItem>
            <ListItem><strong>Unknown Food Detection</strong> - 70% confidence threshold rejects non-food images</ListItem>
            <ListItem><strong>Comprehensive Evaluation</strong> - Custom harness measuring accuracy, F1 (0.9720), calibration (ECE: 0.0147), and latency</ListItem>
            <ListItem><strong>Full-Stack Application</strong> - FastAPI backend on HuggingFace Spaces + React frontend on Vercel</ListItem>
            <ListItem><strong>Discriminative Learning Rates</strong> - 1e-5 (mid layers), 1e-4 (last blocks), 1e-3 (classifier)</ListItem>
            <ListItem><strong>Free Hosting</strong> - ~$1/month total cost (domain only, all infrastructure free)</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Tech Stack</SectionTitle>
          <TechStack>
            <TechTag>PyTorch 2.1.0</TechTag>
            <TechTag>EfficientNetB2</TechTag>
            <TechTag>FastAPI 0.104.1</TechTag>
            <TechTag>React 18</TechTag>
            <TechTag>Tailwind CSS</TechTag>
            <TechTag>HuggingFace Spaces</TechTag>
            <TechTag>Vercel</TechTag>
            <TechTag>Git LFS</TechTag>
          </TechStack>
        </Section>

        <Section>
          <SectionTitle>Model Architecture</SectionTitle>
          <Text>
            Using EfficientNetB2 as the base model with transfer learning:
          </Text>
          <CodeBlock>{`# Transfer Learning Pipeline
base_model = efficientnet_b2(pretrained=True)

# Freeze base layers
for param in base_model.features.parameters():
    param.requires_grad = False

# Custom classifier head
base_model.classifier = nn.Sequential(
    nn.Dropout(p=0.3),
    nn.Linear(1408, 3)  # 3 classes: pizza, steak, sushi
)

# Fine-tune with food dataset
optimizer = Adam(base_model.classifier.parameters(), lr=1e-3)
criterion = CrossEntropyLoss()`}</CodeBlock>
        </Section>

        <Section>
          <SectionTitle>Training & Results</SectionTitle>
          <Text>
            <strong>Training Pipeline:</strong>
          </Text>
          <List>
            <ListItem>Dataset: Food101 subset - 750 train + 250 test images per class</ListItem>
            <ListItem>Baseline Model: 94.27% accuracy (frozen backbone, 10 epochs)</ListItem>
            <ListItem>Improved Model: 97.20% accuracy (progressive fine-tuning, 15 epochs)</ListItem>
            <ListItem>Enhanced augmentation: RandomResizedCrop, flips, color jitter, rotation</ListItem>
            <ListItem>Cosine annealing scheduler with discriminative learning rates</ListItem>
          </List>
          <Text>
            <strong>Evaluation Results:</strong>
          </Text>
          <List>
            <ListItem>Accuracy: 97.20% (exceeded 90% target by 7.2%)</ListItem>
            <ListItem>F1 Score (macro): 0.9720</ListItem>
            <ListItem>Expected Calibration Error (ECE): 0.0147 (excellent)</ListItem>
            <ListItem>CPU Inference Latency: ~500ms p50 (optimizable with TorchScript)</ListItem>
            <ListItem>Confusion matrix, reliability diagrams, and failure case analysis generated</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Production Deployment</SectionTitle>
          <Text>
            The application is live at <a href="https://foodvis.in" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', fontWeight: 'bold', textDecoration: 'underline'}}>foodvis.in</a> with full production infrastructure:
          </Text>
          <List>
            <ListItem><strong>Backend:</strong> FastAPI on HuggingFace Spaces (Docker) - handles inference with 55MB model via Git LFS</ListItem>
            <ListItem><strong>Frontend:</strong> React 18 + Tailwind CSS on Vercel - drag-and-drop upload, real-time predictions</ListItem>
            <ListItem><strong>Domain:</strong> Custom domain (foodvis.in) configured via GoDaddy DNS with Vercel SSL/HTTPS</ListItem>
            <ListItem><strong>Features:</strong> Unknown food detection, working demo gallery, confidence visualization, mobile-responsive</ListItem>
            <ListItem><strong>Cost:</strong> ~$1/month (domain only - HuggingFace Spaces + Vercel both free tier)</ListItem>
          </List>
          <Text>
            Users can upload any image to test the classifier. The system detects when an image is not pizza, steak, or sushi
            (confidence threshold: 70%) and displays appropriate feedback.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Why I'm Building This</SectionTitle>
          <Text>
            Computer vision is one of the most exciting areas of ML, and I want to deeply understand
            the full pipeline, not just run a tutorial notebook. This project forces me to handle:
          </Text>
          <List>
            <ListItem>Data collection, cleaning, and augmentation at scale</ListItem>
            <ListItem>Proper train/val/test splits and evaluation methodology</ListItem>
            <ListItem>Transfer learning and fine-tuning strategies</ListItem>
            <ListItem>Model optimization for inference</ListItem>
            <ListItem>Deployment and serving a model in production</ListItem>
          </List>
          <Text>
            By the end, I'll have a deployable computer vision system that I built from scratch and
            the knowledge to apply these skills to more complex vision problems.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Development Timeline</SectionTitle>
          <List>
            <ListItem><strong>Jan 26, 2026</strong> - Dataset download (Food101), baseline training (94.27% accuracy)</ListItem>
            <ListItem><strong>Jan 27, 2026</strong> - Improved model (97.20%), comprehensive evaluation, backend/frontend development</ListItem>
            <ListItem><strong>Jan 27, 2026</strong> - Full deployment to HuggingFace Spaces + Vercel, domain configuration</ListItem>
            <ListItem><strong>Status:</strong> ✅ Live in production at <a href="https://foodvis.in" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'underline'}}>foodvis.in</a></ListItem>
          </List>
          <Text>
            Total development time: ~24 hours (including overnight automated training). Demonstrates rapid prototyping
            to production deployment with proper ML engineering practices.
          </Text>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default FoodVision;
