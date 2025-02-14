# eigenai-quickstart 🤖

A ready-to-use scaffold that demonstrates how to build a verifiable AI agent using Layr Labs' AgentKit adapters. This project integrates:

- **Opacity** for verifiable AI inference (zkTLS proofs)
- **EigenDA** for data availability logging
- **Witnesschain** for creating a campaign, getting photos from a campaign, and classification of photos from a campaign.

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Layr-Labs/eigenai-quickstart.git
   cd eigenai-quickstart
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and fill in your API keys and configuration values:
   - Opacity: `OPACITY_API_KEY`, `OPACITY_TEAM_ID`, `OPACITY_TEAM_NAME`, `OPACITY_PROVER_URL`
   - EigenDA: `EIGENDA_PRIVATE_KEY`, `EIGENDA_API_URL`, `EIGENDA_BASE_RPC_URL`, `EIGENDA_CREDITS_CONTRACT`
   - Witnesschain: `WITNESSCHAIN_API_KEY`, `WITNESSCHAIN_API_URL`, `WITNESSCHAIN_PRIVATE_KEY`

4. **Run the demo**

   CLI Demo:
   ```bash
   npm run build
   npm start
   ```

   Express Server:
   ```bash
   npm run dev
   ```

## 🛠 Project Structure

```
eigenai-quickstart/
├── src/
│   ├── agent/
│   │   └── createAgent.ts    # Core agent implementation
│   ├── utils/
│   ├── index.ts             # CLI demo
│   └── server.ts            # Express API
├── package.json
├── tsconfig.json
└── .env.example
```

## 🔧 Usage

### CLI Demo

The CLI demo showcases basic usage of the agent:
1. Generating verifiable text
2. Creating campaigns and classifying campaign photos.
3. Logging information to EigenDA

Run it with:
```bash
npm start
```

### REST API

The Express server provides the following endpoints:

1. **Generate Verifiable Text**
   ```bash
   curl -X POST http://localhost:3000/api/generate \
     -H "Content-Type: application/json" \
     -d '{"prompt": "What is the capital of France?"}'
   ```

2. **Create Campaign**
   ```bash
   curl -X POST http://localhost:3000/api/create-campaign \
     -H "Content-Type: application/json" \
     -d '{"latitude": 48.8566, "longitude": 2.3522}'
   ```

3. **Get Photos from a campaign**
   ```bash
   curl -X POST http://localhost:3000/api/campaign-photos \
     -H "Content-Type: application/json" \
     -d '{"campaign": "<campaign-name>", "since" : "<OPTIONAL:datetime-in-iso-format>"}'
   ```

3. **Classify a Photo from a campaign**
   ```bash
   curl -X POST http://localhost:3000/api/classify-photo\
     -H "Content-Type: application/json" \
     -d '{"photo": "<photo-id>"}'
   ```

4. **Health Check**
   ```bash
   curl http://localhost:3000/health
   ```

## 🔍 Core Components

### Agent Creation (`src/agent/createAgent.ts`)

The `createAgent.ts` file is the heart of this project. It:
- Initializes all three adapters (Opacity, EigenDA, Witnesschain)
- Provides methods for text generation and location verification
- Handles automatic logging to EigenDA
- Includes error handling and proper type definitions

### Express Server (`src/server.ts`)

The Express server provides a REST API interface to the agent's capabilities:
- CORS enabled
- JSON request body parsing
- Error handling
- Health check endpoint
- Clear API documentation

## 📝 Next Steps

Here are some ways you can extend this project:

1. **Add More Adapters**
   - Integrate Reclaim for credential verification

2. **Enhance Functionality**
   - Add rate limiting
   - Implement caching
   - Add authentication
   - Expand API endpoints

3. **Improve Developer Experience**
   - Add tests
   - Add CI/CD
   - Add API documentation (Swagger/OpenAPI)
   - Add monitoring and logging

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
