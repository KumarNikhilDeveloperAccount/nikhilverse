"use client";

import { getGlossary } from '@/lib/data';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const allGlossary = getGlossary().sort((a,b) => a.term.localeCompare(b.term));
  
  const glossary = search.trim() === "" 
    ? allGlossary 
    : allGlossary.filter(g => 
        g.term.toLowerCase().includes(search.toLowerCase()) || 
        g.definition.toLowerCase().includes(search.toLowerCase()) ||
        g.related.some(r => r.toLowerCase().includes(search.toLowerCase()))
      );

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Glossary</h1>
        <p className="text-xl text-muted-foreground">Key IT processes, frameworks, and terminology.</p>
      </div>

      <div className="relative mb-12">
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search glossary terms or definitions..." 
          className="w-full bg-card border border-border pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {glossary.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No terms found for "{search}".
        </div>
      )}

      <div className="space-y-4">
        {glossary.map((entry) => (
          <div key={entry.term} className="bg-card border border-border p-6 rounded-xl hover:border-primary/50 transition-colors group shadow-sm">
            <h3 className="text-2xl font-bold mb-2 text-primary group-hover:text-primary/80 transition-colors">{entry.term}</h3>
            <p className="text-lg text-foreground/90 mb-4">{entry.definition}</p>
            <div className="flex flex-wrap gap-2 items-center text-sm">
              <span className="text-muted-foreground">Related:</span>
              {entry.related.map(rel => (
                <span key={rel} className="bg-muted px-2 py-1 rounded-md text-xs font-medium border border-border/50">
                  {rel}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
