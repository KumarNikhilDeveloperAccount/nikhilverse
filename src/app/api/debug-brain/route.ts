import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
    try {
        const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!key) return new Response(JSON.stringify({ error: "No Key on Vercel" }), { status: 500 });
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();
        const gemini25 = data.models?.find((m: any) => m.name.includes("gemini-2.5-flash"));
        const gemini20 = data.models?.find((m: any) => m.name.includes("gemini-2.0-flash"));
        
        return new Response(JSON.stringify({ 
            keyFound: !!key,
            gemini25_capabilities: gemini25?.supportedGenerationMethods,
            gemini20_capabilities: gemini20?.supportedGenerationMethods,
            models: data.models?.map((m: any) => m.name)
        }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
