import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LearnPage() {
  const cards = [
    { id: 1, title: "What is a Server?", desc: "A powerful computer that provides data, services, or programs to other computers (clients) over a network." },
    { id: 2, title: "What is ITSM?", desc: "IT Service Management. The craft of implementing, managing, and delivering IT services to meet the needs of an organization." },
    { id: 3, title: "Change Management?", desc: "A systematic approach to dealing with the transition or transformation of an organization's goals, processes or technologies." },
    { id: 4, title: "Active Directory (AD)", desc: "A directory service developed by Microsoft for Windows domain networks. It authenticates and authorizes all users and computers in a network." }
  ];

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 flex items-center justify-center gap-3">
          <BookOpen className="w-10 h-10 text-primary" /> Flash Learn
        </h1>
        <p className="text-xl text-muted-foreground">Bite-sized enterprise IT concepts.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {cards.map((c) => (
          <div key={c.id} className="group [perspective:1000px] h-64 w-full">
            <div className="relative h-full w-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-sm cursor-pointer">
              {/* Front */}
              <div className="absolute inset-0 bg-card border-2 border-border p-8 rounded-2xl flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                <h3 className="text-2xl font-bold">{c.title}</h3>
                <span className="text-sm font-bold uppercase tracking-widest text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Hover to Flip</span>
              </div>
              {/* Back */}
              <div className="absolute inset-0 bg-primary/10 border-2 border-primary text-foreground p-8 rounded-2xl flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <p className="text-lg font-medium">{c.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
         <Link href="/playgrid/quiz" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-md">
           Take the Quiz <ArrowRight className="w-5 h-5" />
         </Link>
      </div>
    </div>
  );
}
