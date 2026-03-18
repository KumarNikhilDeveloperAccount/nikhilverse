import { getITSM, getIncidentManagement, getChangeManagement } from '@/lib/data';
import { ServerCog, Activity, RefreshCw } from 'lucide-react';

export default function ITSMPage() {
  const itsm = getITSM();
  const inc = getIncidentManagement();
  const change = getChangeManagement();

  const sections = [
    { data: itsm, icon: <ServerCog className="w-6 h-6" /> },
    { data: inc, icon: <Activity className="w-6 h-6" /> },
    { data: change, icon: <RefreshCw className="w-6 h-6" /> }
  ];

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">IT Service Management</h1>
        <p className="text-xl text-muted-foreground">The processes and frameworks that govern enterprise IT.</p>
      </div>

      <div className="space-y-12">
        {sections.map(({ data, icon }, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6 border-b border-border pb-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">{icon}</div>
              <h2 className="text-2xl font-bold">{data.title}</h2>
            </div>
            
            <p className="text-lg mb-8 text-foreground/90">{data.summary}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/50 p-5 rounded-lg border border-border space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Simple Concept</span>
                <p className="text-sm">{data.explanations.beginner}</p>
              </div>
              <div className="bg-card border border-border shadow-sm p-5 rounded-lg space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Professional Context</span>
                <p className="text-sm text-foreground/80">{data.explanations.professional}</p>
              </div>
            </div>
            
            <div className="mt-6 bg-primary/5 border border-primary/20 p-5 rounded-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">My Direct Experience</span>
              <p className="text-sm">{data.explanations.recruiter}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
