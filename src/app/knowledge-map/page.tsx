"use client";

import { useState } from 'react';
import { getKnowledgeMap } from '@/lib/data';
import { Network, X, Search, Activity, Server, Shield, Database, Wrench } from 'lucide-react';

export default function KnowledgeMapPage() {
  const mapData = getKnowledgeMap();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const nodes = mapData.nodes;
  const links = mapData.links;

  const getConnections = (nodeId: string) => {
    const connectedTo = links.filter(l => l.source === nodeId).map(l => l.target);
    const connectedFrom = links.filter(l => l.target === nodeId).map(l => l.source);
    return [...new Set([...connectedTo, ...connectedFrom])];
  };

  const isConnected = (nodeId: string) => {
    if (!activeNode) return false;
    if (activeNode === nodeId) return true;
    return getConnections(activeNode).includes(nodeId);
  };

  const categories = ["Core", "Management", "Infra", "Tools"];
  const icons: Record<string, any> = {
    Core: <Activity className="w-5 h-5 mb-2 opacity-70" />,
    Management: <Shield className="w-5 h-5 mb-2 opacity-70" />,
    Infra: <Server className="w-5 h-5 mb-2 opacity-70" />,
    Tools: <Wrench className="w-5 h-5 mb-2 opacity-70" />
  };

  const filteredNodes = search.trim() === "" 
    ? nodes 
    : nodes.filter(n => n.label.toLowerCase().includes(search.toLowerCase()));

  const activeNodeData = activeNode ? nodes.find(n => n.id === activeNode) : null;
  const activeConnections = activeNode ? getConnections(activeNode).map(id => nodes.find(n => n.id === id)?.label).filter(Boolean) : [];

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-700 font-sans h-full min-h-[calc(100vh-80px)] flex flex-col relative">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold flex items-center gap-4 mb-4 drop-shadow-sm">
          <Network className="w-12 h-12 text-primary" /> Live Knowledge Map
        </h1>
        <p className="text-xl text-muted-foreground">Interactive visualization of enterprise service infrastructure domains.</p>
      </div>

      <div className="relative mb-8 max-w-xl">
        <Search className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
        <input 
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setActiveNode(null);
          }}
          placeholder="Search for an ITSM or Infrastructure concept..."
          className="w-full bg-card border-2 border-border pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 text-lg font-medium shadow-sm"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 flex-1">
        
        {/* Visual Map Layout */}
        <div className="lg:col-span-2 bg-muted/20 border-2 border-border rounded-[2rem] p-6 md:p-10 shadow-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          
          <div className="grid md:grid-cols-2 gap-8 relative z-10 h-full">
            {categories.map(cat => {
              const catNodes = filteredNodes.filter(n => n.category === cat);
              if (catNodes.length === 0) return null;

              return (
                <div key={cat} className="space-y-4">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-muted-foreground border-b-2 border-border/50 pb-2">{cat}</h3>
                  <div className="flex flex-wrap gap-3">
                    {catNodes.map(node => {
                      const isActive = activeNode === node.id;
                      const isLinked = activeNode && isConnected(node.id);
                      const isDimmed = activeNode && !isActive && !isLinked;
                      
                      return (
                        <button
                          key={node.id}
                          onClick={() => setActiveNode(isActive ? null : node.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl font-bold border-2 transition-all duration-300 shadow-sm
                            ${isActive ? 'bg-primary text-primary-foreground border-primary scale-105 shadow-md shadow-primary/20' : 
                              isLinked ? 'bg-primary/10 border-primary text-primary scale-100 ring-2 ring-primary/20' : 
                              isDimmed ? 'opacity-30 bg-card border-border grayscale scale-95' : 
                              'bg-card border-border hover:border-primary hover:bg-primary/5'
                            }
                          `}
                          style={{ minWidth: '120px' }}
                        >
                          {icons[cat]}
                          <span className="text-sm">{node.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Panel */}
        <div className={`lg:col-span-1 bg-card border-2 border-border rounded-[2rem] p-8 shadow-sm transition-all duration-500 ${activeNode ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-4 pointer-events-none grayscale'}`}>
          {activeNodeData ? (
             <div className="animate-in slide-in-from-right-4 fade-in duration-500 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                       {activeNodeData.category} Domain
                    </div>
                    <button onClick={() => setActiveNode(null)} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5"/>
                    </button>
                </div>
                
                <h2 className="text-3xl font-extrabold mb-8 text-primary drop-shadow-sm leading-tight">{activeNodeData.label}</h2>
                
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2 border-b border-border pb-2">
                    <Network className="w-5 h-5 text-muted-foreground"/> Cross-Connections
                </h4>
                {activeConnections.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeConnections.map(conn => (
                       <span key={conn} className="bg-background border-2 border-border px-3 py-1.5 rounded-xl text-sm font-semibold shadow-sm">
                          {conn}
                       </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm mb-8 font-medium">Standalone concept.</p>
                )}

                <div className="mt-auto pt-8 border-t border-border">
                    <p className="text-sm font-bold text-muted-foreground text-center">Open Ask Nikhil's Brain and type '{activeNodeData.label}' for a deep dive.</p>
                </div>
             </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground opacity-70">
                <Network className="w-16 h-16 mb-4 opacity-50 block" />
                <p className="text-xl font-bold">Select a node to map connections.</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
