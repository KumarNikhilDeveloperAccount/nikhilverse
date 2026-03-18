import { CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';

export default function CaseworkPage() {
  const cases = [
    {
      title: "Managing a Production Change Flow",
      icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
      context: "A normal change to upgrade network infrastructure during the weekend change window.",
      challenge: "Coordinating multiple teams (network, server, app) to ensure the upgrade doesn't cause unexpected downtime.",
      action: "Validated exact scope and PIR dependencies. Secured eCAB approval after mitigating a missed risk in the initial RFC. Scheduled coordinated execution.",
      tools: ["ServiceNow", "CAB Governance", "Windows Server"],
      outcome: "Change deployed with zero unexpected downtime. Process documented in CMDB accurately."
    },
    {
      title: "Supporting Incident Resolution under SLA Pressure",
      icon: <AlertCircle className="w-6 h-6 text-orange-500" />,
      context: "A major incident where authentication services began failing for a region.",
      challenge: "SLA response time was ticking while figuring out if it was an AD replication issue or a network blockage.",
      action: "Logged the incident immediately with high priority, initiated an emergency bridge, brought in AD and Network specialists. Monitored SLA thresholds.",
      tools: ["Active Directory", "Incident Management", "SLA/OLA Tracking"],
      outcome: "Service restored within 45 minutes; breached OLA avoided. Organized PIR to document the root cause."
    },
    {
       title: "Patch Coordination & Post-Validation",
       icon: <ShieldAlert className="w-6 h-6 text-blue-500" />,
       context: "Monthly Microsoft Security Fix Announcement (MFSA) patching cycle.",
       challenge: "Patching 500+ Windows Servers via SCCM without disrupting 24/7 business apps.",
       action: "Prepared phased deployment groups. Monitored SCCM progress. Troubleshot a failed server restart using vSphere console access.",
       tools: ["SCCM", "VMware vSphere", "Windows Server"],
       outcome: "100% compliance achieved within the 48-hour maintenance window."
    }
  ];

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Casework & Patterns</h1>
        <p className="text-xl text-muted-foreground">Real scenario-driven examples of how operations are handled in production.</p>
      </div>

      <div className="space-y-8">
        {cases.map((c, i) => (
          <div key={i} className="bg-card border border-border p-6 md:p-8 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-muted p-2 rounded-full">{c.icon}</div>
              <h2 className="text-2xl font-bold">{c.title}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-sm font-bold uppercase text-primary mb-2">Context</h3>
                <p className="text-muted-foreground">{c.context}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase text-red-500 mb-2">Challenge</h3>
                <p className="text-muted-foreground">{c.challenge}</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-5 rounded-lg mb-6">
              <h3 className="text-sm font-bold uppercase text-primary mb-2">Action Taken</h3>
              <p className="text-foreground/90">{c.action}</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-border pt-6 mt-4">
              <div className="flex flex-wrap gap-2">
                {c.tools.map(t => <span key={t} className="text-xs font-semibold bg-muted px-2 py-1 rounded">{t}</span>)}
              </div>
              <p className="text-sm font-bold text-green-600 dark:text-green-400">Outcome: {c.outcome}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
