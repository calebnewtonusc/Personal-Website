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

const ComingSoonBadge = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
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
          <Title>FoodVisionMini</Title>
          <Tagline>End-to-End Computer Vision Project</Tagline>
          <ComingSoonBadge>🚀 Launching Spring 2026</ComingSoonBadge>
        </Header>

        <Section>
          <SectionTitle>The Project</SectionTitle>
          <Text>
            FoodVisionMini is an end-to-end computer vision project that classifies images of food
            into three categories: pizza, steak, and sushi. It's a complete ML workflow from data
            collection to model training to deployment. It's designed to teach me the full lifecycle of
            a production computer vision system.
          </Text>
          <Text>
            This isn't just about training a model. It's about building a reproducible training pipeline,
            implementing proper evaluation, and deploying a live demo that anyone can use.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Key Features</SectionTitle>
          <List>
            <ListItem><strong>Custom Dataset</strong> - Curated and preprocessed dataset of pizza, steak, and sushi images</ListItem>
            <ListItem><strong>Transfer Learning with EfficientNetB2</strong> - Fine-tuned state-of-the-art model for food classification</ListItem>
            <ListItem><strong>Training Pipeline</strong> - Reproducible training with proper train/val/test splits and data augmentation</ListItem>
            <ListItem><strong>EvalHarness Evaluation</strong> - Standardized evaluation framework to measure real performance</ListItem>
            <ListItem><strong>Gradio Demo App</strong> - Interactive web demo where you can upload food images</ListItem>
            <ListItem><strong>Hugging Face Deployment</strong> - Live demo hosted on Hugging Face Spaces</ListItem>
            <ListItem><strong>Full Documentation</strong> - Reproducible setup, training logs, and model cards</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Tech Stack</SectionTitle>
          <TechStack>
            <TechTag>PyTorch</TechTag>
            <TechTag>EfficientNetB2</TechTag>
            <TechTag>torchvision</TechTag>
            <TechTag>Gradio</TechTag>
            <TechTag>Hugging Face Spaces</TechTag>
            <TechTag>Weights & Biases</TechTag>
            <TechTag>Python</TechTag>
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
          <SectionTitle>Training & Evaluation</SectionTitle>
          <Text>
            <strong>Training Setup:</strong>
          </Text>
          <List>
            <ListItem>Dataset: ~1500 images per class (pizza, steak, sushi)</ListItem>
            <ListItem>80/10/10 train/val/test split with stratification</ListItem>
            <ListItem>Data augmentation: random rotation, flip, color jitter</ListItem>
            <ListItem>Batch size: 32, Epochs: 5-10, Early stopping on validation loss</ListItem>
            <ListItem>Learning rate scheduling with ReduceLROnPlateau</ListItem>
          </List>
          <Text>
            <strong>Evaluation Metrics:</strong>
          </Text>
          <List>
            <ListItem>Accuracy, Precision, Recall, F1-Score per class</ListItem>
            <ListItem>Confusion matrix analysis</ListItem>
            <ListItem>Test set performance with confidence intervals</ListItem>
            <ListItem>Failure case analysis (what the model gets wrong and why)</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Deployment</SectionTitle>
          <Text>
            The trained model will be deployed as an interactive Gradio demo on Hugging Face Spaces.
            Users can:
          </Text>
          <List>
            <ListItem>Upload an image of food</ListItem>
            <ListItem>Get instant predictions with confidence scores</ListItem>
            <ListItem>See model explanations (which features it's using)</ListItem>
            <ListItem>Try example images from the test set</ListItem>
          </List>
          <Text>
            The demo will be publicly accessible and showcased in my project portfolio.
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
          <SectionTitle>Timeline</SectionTitle>
          <List>
            <ListItem><strong>Week 0-1 (Jan 2026)</strong> - Dataset collection, preprocessing, baseline model</ListItem>
            <ListItem><strong>Week 2 (Late Jan)</strong> - Training pipeline, EvalHarness integration, model optimization</ListItem>
            <ListItem><strong>February 2026</strong> - Gradio demo, Hugging Face deployment, documentation</ListItem>
          </List>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default FoodVision;
