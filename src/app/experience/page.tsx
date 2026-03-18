import { getResume } from '@/lib/data';
import { Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ExperiencePage() {
  const resume = getResume();

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Experience</h1>
        <p className="text-xl text-muted-foreground">Detailed breakdown of roles and business impact.</p>
      </div>

      <div className="space-y-12">
        {resume.experience.map((job, idx) => (
          <div key={idx} className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{job.role}</h2>
                  <p className="text-lg text-muted-foreground">{job.company}</p>
                </div>
              </div>
              <div className="bg-muted px-4 py-2 rounded-full text-sm font-medium border border-border/50 whitespace-nowrap">
                {job.period}
              </div>
            </div>

            <ul className="space-y-4 mt-6">
              {job.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider block w-full mb-1 text-muted-foreground">Ask AI to explain:</span>
              <Link href={`/ai-assistant?q=${encodeURIComponent("Explain his role at DXC")}`} className="text-xs bg-muted border border-border px-3 py-1.5 rounded-full hover:bg-muted/80 hover:text-primary transition-colors">
                His role at DXC
              </Link>
              <Link href={`/ai-assistant?q=${encodeURIComponent("What is Change validation?")}`} className="text-xs bg-muted border border-border px-3 py-1.5 rounded-full hover:bg-muted/80 hover:text-primary transition-colors">
                Change validation
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
