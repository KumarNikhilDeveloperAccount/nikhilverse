# NikhilVerse - All about Kumar Nikhil

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FKumarNikhilDeveloperAccount%2Fnikhilverse&env=GOOGLE_GENERATIVE_AI_API_KEY)
Welcome to the AI-native professional platform for Kumar Nikhil, Infrastructure Services Analyst III at DXC Technology. This platform natively integrates advanced enterprise IT concepts (ITSM, Change Management, Windows Server, VMware) with a state-of-the-art multipage web experience.

## Features

- **Three Adaptive Modes:**
  - `NikVerse`: Forward-looking flagship dark mode.
  - `Classic`: Editorial, recruiter-friendly light mode.
  - `PlayGrid`: Gamified educational layer.
- **Deep AI Integration:** Chat with a custom-grounded model designed to represent Nikhil's background and explain complex IT workflows (powered by Gemini integration).
- **Interactive Experience & Skills Alignment:** Target role matching, casework demonstration, and technical capability matrix.
- **Knowledge Engine:** Structured datasets capturing enterprise architectures, corporate ecosystems, and an IT glossary.
- **Content-Driven:** Fully customizable via local JSON models (`/src/content`) with no external database required, maximizing speed and security.

## Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4 Alpha), CSS Variables for Theming
- **Components:** Lucide React (Icons), native Tailwind animations
- **AI Core:** Vercel AI SDK, Google Gemini (`@ai-sdk/google`)
- **Data:** JSON Schema

## Setup Instructions

1. **Prerequisites:** Ensure you have Node.js installed.
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure AI (Optional):**
   - Copy `.env.example` to `.env`
   - Provide your `GOOGLE_GENERATIVE_AI_API_KEY` to enable the AI Chat Assistant.
4. **Run Development Server:**
   ```bash
   npm run dev
   ```
5. **View:** Open `http://localhost:3000`

## Production Deployment

This project is optimized for deployment on **Vercel** or **Netlify**. Simply connect your GitHub repository to either platform, set your `GOOGLE_GENERATIVE_AI_API_KEY` in the environment variables dashboard, and trigger a build. The platform will automatically optimize images, package the Next.js routes, and deploy the AI endpoints via Edge or Serverless Functions.
