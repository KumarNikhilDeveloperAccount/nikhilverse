import Link from 'next/link';
import { getKnowledgePacks } from '@/lib/data';
import { BookOpen, Database, Globe, Lightbulb } from 'lucide-react';

export default function KnowledgePage() {
  const packs = getKnowledgePacks();

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="space-y-4 mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold">Knowledge Engine</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">Structured context on the platforms, processes, and corporate ecosystem where I operate.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Link href="/itsm" className="flex items-center gap-3 bg-card border border-border p-4 rounded-xl hover:bg-accent/50 transition-colors shadow-sm">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-semibold">ITSM & ITIL</span>
        </Link>
        <Link href="/infra" className="flex items-center gap-3 bg-card border border-border p-4 rounded-xl hover:bg-accent/50 transition-colors shadow-sm">
          <Database className="w-5 h-5 text-primary" />
          <span className="font-semibold">Infrastructure</span>
        </Link>
        <Link href="/companies" className="flex items-center gap-3 bg-card border border-border p-4 rounded-xl hover:bg-accent/50 transition-colors shadow-sm">
          <Globe className="w-5 h-5 text-primary" />
          <span className="font-semibold">Companies</span>
        </Link>
        <Link href="/glossary" className="flex items-center gap-3 bg-card border border-border p-4 rounded-xl hover:bg-accent/50 transition-colors shadow-sm">
          <Lightbulb className="w-5 h-5 text-primary" />
          <span className="font-semibold">Glossary</span>
        </Link>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Core Concepts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {packs.map((pack) => (
            <div key={pack.title} className="bg-muted/30 border border-border p-6 rounded-xl relative overflow-hidden group">
              <h3 className="text-xl font-bold mb-2">{pack.title}</h3>
              <p className="text-sm text-foreground/80 mb-4">{pack.summary}</p>
              
              <div className="flex flex-wrap gap-2">
                {('tags' in pack ? pack.tags : []).map(tag => (
                  <span key={tag} className="text-xs bg-background border border-border px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
