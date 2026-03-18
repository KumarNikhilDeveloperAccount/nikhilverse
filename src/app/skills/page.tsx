import { getResume, getRoleFits } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';

export default function SkillsPage() {
  const { skills } = getResume();
  const roleFits = getRoleFits();

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Skills & Capabilities</h1>
        <p className="text-xl text-muted-foreground">Technical expertise and process alignment.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            Ecosystem Radar
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
           <h2 className="text-2xl font-bold mb-6">Target Role Alignment</h2>
           <div className="space-y-4">
             {roleFits.map((fit, idx) => (
               <div key={idx} className="bg-card border border-border p-5 rounded-xl shadow-sm">
                 <div className="flex justify-between items-center mb-3">
                   <h3 className="font-bold text-lg">{fit.title}</h3>
                   <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                     {fit.match} Match
                   </span>
                 </div>
                 <ul className="space-y-2">
                   {fit.reasons.map((reason, rIdx) => (
                     <li key={rIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                       <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                       <span className="leading-snug">{reason}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
