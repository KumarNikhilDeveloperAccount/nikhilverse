import { getInfrastructure } from '@/lib/data';
import { HardDrive, Server, ShieldCheck, Key } from 'lucide-react';

export default function InfraPage() {
  const infra = getInfrastructure();
  
  const getIcon = (name: string) => {
    if (name.includes('Windows')) return <Server className="w-6 h-6" />;
    if (name.includes('NetApp')) return <HardDrive className="w-6 h-6" />;
    if (name.includes('PAM')) return <Key className="w-6 h-6" />;
    return <ShieldCheck className="w-6 h-6" />;
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-12 border-b border-border pb-6">
        <h1 className="text-4xl font-bold mb-4">{infra.title}</h1>
        <p className="text-xl text-muted-foreground">{infra.summary}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {infra.technologies.map((tech) => (
          <div key={tech.name} className="bg-card border border-border p-6 rounded-xl hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
               <div className="bg-primary/10 text-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                 {getIcon(tech.name)}
               </div>
               <h3 className="text-xl font-bold">{tech.name}</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{tech.context}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
