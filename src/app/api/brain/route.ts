import { GoogleGenerativeAI } from '@google/generative-ai';
import { getPlaybooks, getBrainModes, getBio, getResume } from '@/lib/data';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { messages, modeId } = await req.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 500 });
    }

    const modes = getBrainModes();
    const activeMode = modes.find(m => m.id === modeId) || modes[5]; // default general
    const playbooks = getPlaybooks();
    const resume = getResume();
    const bio = getBio();

    const systemInstruction = `
${activeMode.systemPrompt}

You are NikVerse Brain, working inside Nikhil's professional platform.
CRITICAL HALLUCINATION RULES:
1. Do NOT invent ticket IDs, customer environments, SLA metrics, or incidents.
2. If asked about Nikhil's profile, rely ONLY on the provided JSON:
${JSON.stringify({ resume, bio })}
3. If asked about operational support, Windows Server issues, or ITSM processes, rely ONLY on these exact playbooks:
${JSON.stringify(playbooks)}
4. If a user asks a technical question NOT covered in the playbooks, you must clearly state "I do not have organizational-specific specifics for that issue, but general industry best practices suggest..."
5. Make your responses highly scannable, using structured markdown (boldings, lists). 
6. Keep your responses highly professional, simulating an enterprise communication format.
    `.trim();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format history for Gemini
    const chatHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      systemInstruction: { role: 'system', parts: [{ text: systemInstruction }] },
      history: chatHistory
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessageStream(lastMessage);

    const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const chunkText = chunk.text();
              controller.enqueue(new TextEncoder().encode(chunkText));
            }
            controller.close();
          } catch (e) {
            controller.error(e);
          }
        }
      });

    return new Response(stream, {
        headers: { 'Content-Type': 'text/plain' }
    });

  } catch (error: any) {
    console.error('Brain API Error:', error);
    return new Response(JSON.stringify({ error: error.message || "Failed to process request." }), { status: 500 });
  }
}
