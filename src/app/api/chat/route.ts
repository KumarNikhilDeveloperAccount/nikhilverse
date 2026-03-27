import { GoogleGenerativeAI } from '@google/generative-ai';
import { getResume, getBio, getIdentity } from '@/lib/data';

export const maxDuration = 30;

const resume = getResume();
const bio = getBio();
const identity = getIdentity();

const SYSTEM_PROMPT = `
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

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response("API Key missing", { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "models/gemini-flash-latest", 
      systemInstruction: SYSTEM_PROMPT 
    });

    const history = [];
    let expectedRole = 'user';
    for (const m of messages.slice(0, -1)) {
        if (!m.content || m.content.trim() === '') continue;
        const role = m.role === 'assistant' ? 'model' : 'user';
        if (role !== expectedRole) {
            // Force alternation by injecting a dummy if skipped
            if (expectedRole === 'model') history.push({ role: 'model', parts: [{ text: "Acknowledged." }] });
            else history.push({ role: 'user', parts: [{ text: "Continue." }] });
        }
        history.push({ role, parts: [{ text: m.content }] });
        expectedRole = role === 'user' ? 'model' : 'user';
    }

    if (history.length > 0 && history[history.length - 1].role === 'user') {
        history.pop();
    }

    const latestMessage = messages[messages.length - 1].content;
    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(latestMessage);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            controller.enqueue(encoder.encode(chunk.text()));
          }
        } catch (err) {
          console.error(err);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  } catch (error: any) {
    console.error("Critical AI Route Error:", error);
    return new Response(error.message || "Backend crash", { status: 500 });
  }
}
