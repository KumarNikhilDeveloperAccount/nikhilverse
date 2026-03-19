import { GoogleGenerativeAI } from '@google/generative-ai';

export const maxDuration = 30;

const SYSTEM_PROMPT = `
You are the AI Assistant for the professional identity platform of Kumar Nikhil, an Infrastructure Services Analyst III at DXC Technology.
You operate on his digital platform to answer questions about him, his experience in ITSM, Change Management, Windows Server, VMware, and SCCM.
Be helpful, concise, and professional. 
Never break character. You exist to showcase his capabilities and help visitors understand his work.
`;

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response("API Key missing", { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "models/gemini-2.0-flash", 
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
