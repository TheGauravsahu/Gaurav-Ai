import { SECRET_GEMINI_API_KEY } from '$env/static/private';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { json } from '@sveltejs/kit';

const genAI = new GoogleGenerativeAI(SECRET_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-pro-002'
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: 'text/plain'
};

async function run(prompt: string) {
	const chatSession = model.startChat({
		generationConfig,
		history: []
	});

	const result = await chatSession.sendMessage(prompt);
	return result.response.text();
}

export async function POST({ request }) {
	try {
		const { prompt } = await request.json();
		const response = await run(prompt);
		return json({ response }, { status: 200 });
	} catch (error) {
		console.log('Error:', error);
		return json({ error: "An error ocurred." }, { status: 500 });
	}
}
