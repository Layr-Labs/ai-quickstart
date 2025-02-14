import { createAgent } from './agent/createAgent.js';

async function main() {
  try {
    console.log('🤖 Initializing AI Agent...');
    const agent = await createAgent();

    // Example 1: Generate verifiable text
    console.log('\n📝 Generating verifiable text...');
    const prompt = 'What is the capital of France?';
    const textResult = await agent.generateVerifiableText(prompt);
    console.log('Response:', textResult.content);
    console.log('Proof available:', !!textResult.proof);

    // Example 2: Create a campaign (using Paris coordinates)
    console.log('\n📍 Create a campaign ...');

    const campaignCreationResult = await agent.createCampaign({
	campaign	: "my-campaign",
	description	: "my-campaign-in-paris",
	type		: "individual",
	latitude	: 48.8566,
	longitude	: 2.3522,
	radius		: 100,
	bannerUrl	: "https://en.wikipedia.org/wiki/Paris#/media/File:La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_ao%C3%BBt_2014_(2).jpg",
	posterUrl	: "https://en.wikipedia.org/wiki/Paris#/media/File:Paris_raining_autumn_cityscape_(8252181936).jpg",
	currency	: "POINTS",
	totalRewards	: 10000,
	rewardPerTask	: 10,
	fuelRequired	: 1.0,
	maxSubmissions	: 5000,
	isActive	: true,
	tags		: ["my","example","campaign","in","paris"]
    });

    console.log('Campaign created result :', campaignCreationResult.result);

    // Example 3: Log custom information
    console.log('\n📊 Logging custom information...');
    await agent.logInfo('Demo Completed', {
      timestamp: new Date().toISOString(),
      status: 'success'
    });

    console.log('\n✅ Demo completed successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main(); 
