import Link from 'next/link';
import { Bot, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { getIdentity, getBio } from '@/lib/data';

export default function Home() {
  const identity = getIdentity();
  const bio = getBio();

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-16 px-4">
      <div className="max-w-4xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Hi, I'm <span className="text-primary">{identity.preferredName}</span>.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {bio.shortSummary}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/ai-assistant" className="group flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 shadow-md">
            <Bot className="w-5 h-5 group-hover:animate-bounce" />
            <span>Talk to my AI</span>
          </Link>
          <Link href="/resume" className="flex items-center space-x-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 border border-border shadow-sm">
            <span>View Resume</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {/* Suggestion Chips */}
        <div className="flex flex-wrap justify-center gap-2 pt-6 opacity-70">
          <span className="text-xs font-semibold uppercase tracking-wider block w-full mb-1 text-muted-foreground">Ask AI about:</span>
          {["Explain his change management work", "What is ITSM?", "Tell me about DXC"].map((prompt) => (
             <Link key={prompt} href={`/ai-assistant?q=${encodeURIComponent(prompt)}`} className="text-xs bg-muted border border-border px-3 py-1.5 rounded-full hover:bg-muted/80 hover:text-primary transition-colors">
               "{prompt}"
             </Link>
          ))}
        </div>
      </div>

      {/* Grid of paths */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4">
        <Link href="/experience" className="group p-6 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors shadow-sm">
          <Layers className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Professional Journey</h3>
          <p className="text-sm text-muted-foreground">Explore my role as an Infrastructure Services Analyst.</p>
        </Link>
        <Link href="/knowledge" className="group p-6 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors shadow-sm">
          <BookOpen className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Knowledge Engine</h3>
          <p className="text-sm text-muted-foreground">Discover structured data about ITSM, ITIL, and Infrastructure.</p>
        </Link>
        <Link href="/playgrid" className="group p-6 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-colors shadow-sm">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mb-4">P</div>
          <h3 className="text-xl font-bold mb-2">PlayGrid Mode</h3>
          <p className="text-sm text-muted-foreground">A gamified, bite-sized learning experience for everyone.</p>
        </Link>
      </div>
    </div>
  );
}
