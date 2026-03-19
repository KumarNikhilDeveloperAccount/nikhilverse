import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
    try {
        const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!key) return new Response(JSON.stringify({ error: "No Key on Vercel" }), { status: 500 });
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();
        
        return new Response(JSON.stringify({ 
            keyFound: !!key,
            models: data.models?.map((m: any) => m.name),
            error: data.error
        }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
