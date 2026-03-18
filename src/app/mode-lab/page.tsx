"use client";

import { useTheme, Mode } from '@/components/ThemeProvider';
import { Monitor, Sun, Gamepad2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ModeLabPage() {
  const { mode, setMode } = useTheme();

  const themes: { id: Mode; title: string; desc: string; icon: any }[] = [
    { id: "nikverse", title: "NikVerse", desc: "The flagship dark premium mode. Immersive, futuristic, and enterprise-luxury.", icon: Monitor },
    { id: "classic", title: "Classic", desc: "A clean, highly readable, recruiter-friendly formal light mode.", icon: Sun },
    { id: "playgrid", title: "PlayGrid", desc: "A brighter, softer palette designed for casual exploration and gamified layouts.", icon: Gamepad2 }
  ];

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-4">Mode Lab</h1>
        <p className="text-xl text-muted-foreground">Experience the platform through distinct architectural themes.</p>
      </div>

      <div className="space-y-6">
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = mode === t.id;
          return (
            <div 
              key={t.id}
              onClick={() => setMode(t.id)}
              className={cn(
                "p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 shadow-sm flex items-center justify-between",
                isActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-transparent bg-card hover:border-primary/30"
              )}
            >
              <div className="flex items-center gap-6">
                 <div className={cn("p-4 rounded-xl transition-colors", isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                   <Icon className="w-8 h-8" />
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold mb-1">{t.title}</h2>
                   <p className="text-muted-foreground">{t.desc}</p>
                 </div>
              </div>
              <div className="hidden sm:block">
                {isActive && <div className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">Active</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
