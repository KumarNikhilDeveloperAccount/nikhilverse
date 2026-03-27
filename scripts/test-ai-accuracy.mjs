import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env manually for a simple script
const env = readFileSync(resolve('.env'), 'utf8');
const apiKey = env.match(/GOOGLE_GENERATIVE_AI_API_KEY=(.*)/)?.[1]?.trim();

if (!apiKey) {
  console.error("Missing API Key in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testGrounding() {
  // Removed redundant model declaration

  // Mocking the SYSTEM_PROMPT logic from chat route.ts
  const resume = JSON.parse(readFileSync(resolve('src/content/profile/resume.json'), 'utf8'));
  const bio = JSON.parse(readFileSync(resolve('src/content/profile/bio.json'), 'utf8'));
  const identity = JSON.parse(readFileSync(resolve('src/content/profile/identity.json'), 'utf8'));

  const systemPrompt = `
You are the AI Assistant for the professional identity platform of Kumar Nikhil.
CRITICAL HALLUCINATION RULES:
1. Rely ONLY on the provided JSON data for facts about Nikhil's career, education, and experience.
2. If asked about his years of professional experience, note that he started at DXC Technology in July 2022. As of early 2026, he has approximately 3.5 years of professional experience. 
3. Do NOT invent ticket IDs, company names, or roles not in the data.
4. If you don't know an answer based on the data, say "I don't have that specific detail in my current knowledge base."
5. Be concise, professional, and helpful.

DATA CONTEXT:
${JSON.stringify({ identity, bio, resume })}
`.trim();

  const model = genAI.getGenerativeModel({ 
    model: "models/gemini-flash-latest",
    systemInstruction: systemPrompt
  });

  const chat = model.startChat({
    history: [],
  });

  const question = "How many years of experience does Kumar Nikhil have?";
  console.log(`Asking: "${question}"`);
  
  const result = await chat.sendMessage(question);
  const response = result.response.text();
  
  console.log("\nAI Response:");
  console.log("--------------------");
  console.log(response);
  console.log("--------------------");

  if (response.includes("8 years")) {
    console.error("\n❌ TEST FAILED: Hallucination detected (8 years).");
    process.exit(1);
  } else if (response.toLowerCase().includes("3.5 years") || response.toLowerCase().includes("july 2022")) {
    console.log("\n✅ TEST PASSED: Grounding confirmed.");
  } else {
    console.warn("\n⚠️ TEST INCONCLUSIVE: Look at the response manually.");
  }
}

testGrounding().catch(console.error);
