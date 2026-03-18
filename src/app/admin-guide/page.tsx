import { Terminal, Database } from 'lucide-react';

export default function AdminGuide() {
  return (
    <div className="container max-w-4xl mx-auto py-16 px-4 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Content Admin Guide</h1>
        <p className="text-xl text-muted-foreground">How to safely update the underlying data architecture.</p>
      </div>

      <div className="space-y-8">
        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 text-primary p-3 rounded-lg"><Database className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold">JSON Data Architecture</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            The entire platform is powered by structured JSON. There is no heavy database attached. This makes it blisteringly fast and extremely secure. To update the website content (e.g., adding a new job experience), edit the respective file in the `src/content` directory.
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 font-medium">
            <li><code className="bg-muted px-1.5 py-0.5 rounded text-primary">/src/content/profile/resume.json</code> - Fix spelling, update jobs, add certs.</li>
            <li><code className="bg-muted px-1.5 py-0.5 rounded text-primary">/src/content/knowledge/itsm.json</code> - Improve AI context definitions.</li>
            <li><code className="bg-muted px-1.5 py-0.5 rounded text-primary">/src/content/profile/identity.json</code> - Update contact methods.</li>
          </ul>
        </div>
        
        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 text-primary p-3 rounded-lg"><Terminal className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold">Deployment & Sync</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Changes committed to the `main` branch of the GitHub repository will automatically trigger a production build.
          </p>
          <div className="bg-muted p-4 rounded-xl font-mono text-sm border border-border/50">
            git add .<br/>
            git commit -m "Updated resume experience to include XYZ"<br/>
            git push origin main
          </div>
        </div>
      </div>
    </div>
  );
}
