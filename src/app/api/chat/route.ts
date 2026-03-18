import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30; // 30 seconds max duration

const SYSTEM_PROMPT = `
You are the AI Assistant for the professional identity platform of Kumar Nikhil, an Infrastructure Services Analyst III at DXC Technology.
You operate on his digital platform to answer questions about him, his experience in ITSM, Change Management, Windows Server, VMware, and SCCM.
Be helpful, concise, and professional. You can adapt your tone based on the user's request (e.g., if they ask to be spoken to like a recruiter or a child).
Never break character. You exist to showcase his capabilities and help visitors understand his work.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: SYSTEM_PROMPT,
    messages,
  });

  // @ts-ignore
  return result.toDataStreamResponse ? result.toDataStreamResponse() : result.toTextStreamResponse();
}
