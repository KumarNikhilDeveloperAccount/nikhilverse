import { GoogleGenerativeAI } from '@google/generative-ai';
async function run() {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyCyJ_0fVgD2V9EA3Tf8OU7CY4yRZeA7WZk");
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}
run();
