import { getCompanies } from '@/lib/data';
import { Building2, Globe } from 'lucide-react';

export default function CompaniesPage() {
  const companies = getCompanies();

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Ecosystem Intelligence</h1>
        <p className="text-xl text-muted-foreground">The corporate landscape within which large-scale infrastructure operations exist.</p>
      </div>

      <div className="space-y-8">
        {companies.map((company) => (
          <div key={company.name} className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-4 border-b border-border pb-6 mb-6">
               <div className="bg-primary/10 text-primary p-3 rounded-lg"><Building2 className="w-8 h-8" /></div>
               <div>
                 <h2 className="text-3xl font-bold">{company.name}</h2>
                 <p className="text-muted-foreground flex items-center gap-2 mt-1">
                   <Globe className="w-4 h-4" /> {company.details.headquarters}
                 </p>
               </div>
            </div>
            
            <p className="text-lg mb-6 leading-relaxed">{company.summary}</p>
            
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-8 bg-muted/30 p-6 rounded-xl border border-border/50">
              <div><span className="text-muted-foreground text-sm">Founded:</span> <span className="font-medium">{company.details.founded}</span></div>
              <div><span className="text-muted-foreground text-sm">Employees:</span> <span className="font-medium">{company.details.employees}</span></div>
              <div><span className="text-muted-foreground text-sm">Revenue:</span> <span className="font-medium">{company.details.revenue}</span></div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
              <h3 className="font-bold text-lg mb-2 text-primary">Nikhil's Context</h3>
              <p className="text-foreground/90">{company.nikhilContext}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
