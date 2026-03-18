import Link from 'next/link';
import { Gamepad2, Brain, Trophy, ShieldAlert } from 'lucide-react';
import { ModeSwitcher } from '@/components/ModeSwitcher';

export default function PlayGridDash() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 text-primary rounded-full mb-6 relative">
          <Gamepad2 className="w-12 h-12 relative z-10" />
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
        </div>
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-sm">PlayGrid</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Welcome to the gamified learning zone. Test your enterprise IT knowledge, earn badges, and explore infrastructure concepts in bite-sized missions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Link href="/playgrid/missions" className="flex flex-col items-center justify-center p-8 bg-card border-2 border-border rounded-[2rem] hover:border-primary/50 hover:bg-primary/5 transition-all group shadow-sm text-center">
          <ShieldAlert className="w-10 h-10 text-primary mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Missions</h3>
          <p className="text-sm text-muted-foreground">Scenario-driven challenges.</p>
        </Link>
        <Link href="/playgrid/learn" className="flex flex-col items-center justify-center p-8 bg-card border-2 border-border rounded-[2rem] hover:border-primary/50 hover:bg-primary/5 transition-all group shadow-sm text-center">
          <Brain className="w-10 h-10 text-primary mb-4 group-hover:scale-110 group-hover:-rotate-12 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Learn</h3>
          <p className="text-sm text-muted-foreground">Bite-sized flashcards.</p>
        </Link>
        <Link href="/playgrid/quiz" className="flex flex-col items-center justify-center p-8 bg-card border-2 border-border rounded-[2rem] hover:border-primary/50 hover:bg-primary/5 transition-all group shadow-sm text-center">
          <Trophy className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Quiz</h3>
          <p className="text-sm text-muted-foreground">Test your knowledge.</p>
        </Link>
      </div>

      <div className="bg-muted p-6 rounded-2xl border flex flex-col items-center text-center">
        <p className="text-lg font-bold mb-2">Pro Tip: Enable PlayGrid Mode</p>
        <p className="text-sm text-muted-foreground mb-4">Switch the entire site to a playful, highly-rounded colorful theme optimized for learning.</p>
        <ModeSwitcher />
      </div>
    </div>
  );
}
