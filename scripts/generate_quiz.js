const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

async function generate() {
    console.log("Generating 75 ITSM/Change Management Questions...");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `You are an expert IT Infrastructure and ITSM architect. 
Generate a JSON array of 75 multiple-choice questions focusing deeply on:
- ITIL v3/v4 workflows
- Change Management (CAB, PIR, RFCs)
- Incident Management vs Service Requests
- Windows Server Administration & SCCM Patching
- VMware, NetApp Storage basics
- Active Directory (RBAC/UAM)

The output MUST be perfectly valid JSON (no markdown wrapping, no \`\`\`json blocks). 
Strict format:
[
  {
    "q": "The question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 1, // index of correct option (0-3)
    "explanation": "Brief explanation of why"
  }
]`;

    try {
        const result = await model.generateContent(prompt);
        let text = result.response.text();
        
        const responseMatch = text.match(/\[[\s\S]*\]/);
        
        let validJsonStr = responseMatch ? responseMatch[0] : text;
        
        // Auto-fix truncated JSON if needed
        if (!validJsonStr.endsWith(']')) {
            const lastBrace = validJsonStr.lastIndexOf('}');
            validJsonStr = validJsonStr.substring(0, lastBrace + 1) + '\n]';
        }
        
        const data = JSON.parse(validJsonStr);
        if (data.length > 50) {
            fs.writeFileSync('src/content/knowledge/quiz.json', JSON.stringify(data, null, 2));
            console.log(`Success! Wrote ${data.length} questions to quiz.json`);
        } else {
            console.error("Failed: Not enough questions generated.");
        }
    } catch (e) {
        console.error("Failed to generate:", e);
    }
}

generate();
