import { getRoleFits } from '@/lib/data';
import { Target, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function FitCheckPage() {
  const roleFits = getRoleFits();

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Target className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Target Role Fit</h1>
        <p className="text-xl text-muted-foreground">Evaluating alignment with specific enterprise infrastructure roles.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {roleFits.map((fit, idx) => (
          <div key={idx} className="bg-card border border-border p-6 rounded-xl shadow-sm hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold group-hover:text-primary transition-colors pr-4">{fit.title}</h2>
              <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shrink-0">
                {fit.match} Match
              </span>
            </div>
            <ul className="space-y-3">
              {fit.reasons.map((reason, rIdx) => (
                <li key={rIdx} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-sm">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Curious about a different role?</p>
        <Link href="/ai-assistant" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 shadow-md">
          Ask the AI Assistant
        </Link>
      </div>
    </div>
  );
}
