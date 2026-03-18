import { getMissions } from '@/lib/data';
import { ShieldCheck, Trophy, Lock } from 'lucide-react';

export default function MissionsPage() {
  const missions = getMissions();

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl justify-center flex items-center gap-3 font-extrabold mb-4">
          <ShieldCheck className="w-10 h-10 text-primary" /> Active Missions
        </h1>
        <p className="text-xl text-center text-muted-foreground">Complete scenarios to earn enterprise ecosystem badges.</p>
      </div>

      <div className="space-y-6">
        {missions.map((m) => (
          <div key={m.id} className="bg-card border-2 border-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center shadow-sm relative overflow-hidden group hover:border-primary/40 transition-colors">
            {/* Status indicator */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-bl-xl shadow-sm">
              Level {m.difficulty}
            </div>

            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center shrink-0 border-4 border-background shadow-inner">
               <Trophy className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">{m.title}</h2>
              <p className="text-muted-foreground mb-4">{m.description}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                 <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity">
                   Start Mission
                 </button>
                 <span className="text-sm font-semibold text-primary flex items-center gap-1">
                   Reward: {m.reward}
                 </span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="bg-muted border border-border border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-70">
           <Lock className="w-8 h-8 text-muted-foreground mb-2" />
           <span className="font-bold">More Missions Coming Soon</span>
           <span className="text-sm text-muted-foreground">Unlock by completing initial setup scenarios.</span>
        </div>
      </div>
    </div>
  );
}
