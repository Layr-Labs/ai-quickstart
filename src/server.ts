import express from 'express';
import cors from 'cors';
import { createAgent } from './agent/createAgent.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

let agent: Awaited<ReturnType<typeof createAgent>>;

// Initialize the agent
createAgent().then(a => {
  agent = a;
  console.log('Agent initialized successfully');
}).catch(error => {
  console.error('Failed to initialize agent:', error);
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', agentReady: !!agent });
});

// Generate verifiable text endpoint
app.post('/api/generate', async (req, res) => {
  try {
    if (!agent) {
      return res.status(503).json({ error: 'Agent not ready' });
    }

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating text for prompt:', prompt);
    const result = await agent.generateVerifiableText(prompt);
    console.log('Generation result:', result);
    res.json(result);
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({
      error: 'Failed to generate text',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Create campaign endpoint
app.post('/api/create-campaign', async (req, res) => {
  try {
    if (!agent) {
      return res.status(503).json({ error: 'Agent not ready' });
    }

    const result = await agent.createCampaign(req.body);

    res.json(result);
  } catch (error) {
    console.error('Error creating campaign :', error);
    res.status(500).json({
      error: 'Failed to create a campaign',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Get photos of a campaign
app.post('/api/campaign-photos', async (req, res) => {
  try {
    if (!agent) {
      return res.status(503).json({ error: 'Agent not ready' });
    }

    const result = await agent.getCampaignPhotos(req.body.campaign);

    res.json(result);
  } catch (error) {
    console.error('Error getting photos:', error);
    res.status(500).json({
      error: 'Failed to get photos from the campaign',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});


// Classify a photo from a campaign
app.post('/api/classify-photo', async (req, res) => {
  try {
    if (!agent) {
      return res.status(503).json({ error: 'Agent not ready' });
    }

    const result = await agent.classifyPhoto(req.body.campaign,req.body.photo);

    res.json(result);
  } catch (error) {
    console.error('Error classifying photo:', error);
    res.status(500).json({
      error: 'Failed to classify photo',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});


// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  GET  /health');
  console.log('  POST /api/generate');
  console.log('  POST /api/verify-location');
});
