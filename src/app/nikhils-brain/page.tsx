"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, StopCircle, RefreshCcw, Trash2, Brain as BrainIcon, User, Volume2, PlayCircle, Code2, ShieldAlert } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getBrainModes } from '@/lib/data';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function NikhilsBrainPage() {
  const modes = getBrainModes();
  const [activeMode, setActiveMode] = useState(modes[0]);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: `Welcome to Ask Nikhil's Brain. I am currently in **${activeMode.label}**. How can I assist you with ITSM, Windows Server Operations, or Nikhil's portfolio today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingId, setIsPlayingId] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Auto-deep-dive from Knowledge Map (only on mount)
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
       window.history.replaceState({}, '', '/nikhils-brain');
       // Delay execution slightly to ensure component has fully mounted states
       setTimeout(() => {
           sendMessage(`Provide a comprehensive deep dive into ${query}. Explain its core concepts, why it matters, and how it connects to ITSM or Infrastructure Operations.`);
       }, 500);
    }
  }, []); // Run ONLY once on mount

  // Handle Voice TTS
  const speakText = (text: string, index: number) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // stop current
    
    // Strip markdown for clean voice reading
    let cleanText = text.replace(/#/g, '').replace(/\*/g, '').replace(/_/g, '').replace(/-/g, ' ');
    
    const msg = new SpeechSynthesisUtterance(cleanText);
    msg.onend = () => setIsPlayingId(null);
    setIsPlayingId(index);
    window.speechSynthesis.speak(msg);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsPlayingId(null);
    }
  };

  // Change Mode
  const handleModeChange = (modeId: string) => {
    const selected = modes.find(m => m.id === modeId) || modes[0];
    setActiveMode(selected);
    setMessages([
      { role: 'model', content: `Switched to **${selected.label}**. ${selected.description}` }
    ]);
  };

  const clearChat = () => {
      setMessages([
          { role: 'model', content: `Chat cleared. I am ready in **${activeMode.label}**.` }
      ]);
  };

  const sendMessage = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: textToSend }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/brain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, modeId: activeMode.id }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      if (!response.body) throw new Error('No body returned from API');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiResponse = '';

      setMessages((prev) => [...prev, { role: 'model', content: '' }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunkValue = decoder.decode(value, { stream: true });
          aiResponse += chunkValue;
          setMessages((prev) => {
            const temp = [...prev];
            temp[temp.length - 1].content = aiResponse;
            return temp;
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'model', content: '> **System Error:** Connection to the Brain failed. Please verify API configurations.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-700 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold flex items-center gap-3">
             <BrainIcon className="w-10 h-10 text-primary" /> Ask Nikhil's Brain
          </h1>
          <p className="text-muted-foreground mt-2">A strictly controlled AI logic gateway grounded entirely in enterprise ticket datasets.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <select 
               className="bg-card border-2 border-border text-foreground px-4 py-2.5 rounded-xl font-bold focus:ring-2 focus:ring-primary shadow-sm"
               value={activeMode.id}
               onChange={(e) => handleModeChange(e.target.value)}
            >
               {modes.map(m => (
                   <option key={m.id} value={m.id}>{m.label}</option>
               ))}
            </select>
            <button onClick={clearChat} className="p-2.5 bg-card border-2 border-border rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors" title="Clear Chat">
                <Trash2 className="w-5 h-5"/>
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-card border border-border rounded-2xl shadow-sm p-4 relative flex flex-col">
        {messages.length === 1 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/50 backdrop-blur-sm z-10 animate-in fade-in zoom-in-95 p-6">
                <div className="text-center mb-8">
                    <p className="text-2xl font-bold mb-2 text-primary">{activeMode.label}</p>
                    <p className="text-muted-foreground">{activeMode.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                    {activeMode.quickPrompts.map((p, idx) => (
                        <button 
                           key={idx} 
                           onClick={() => sendMessage(p)}
                           className="bg-background border border-border p-4 rounded-xl text-left font-medium hover:border-primary/50 transition-colors shadow-sm flex items-center gap-3 group"
                        >
                            <Code2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        )}

        <div className="space-y-6 pb-20 p-2 md:p-6 w-full max-w-4xl mx-auto flex-1 h-full relative z-0">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-4 ${m.role === 'model' ? '' : 'flex-row-reverse'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 shadow-sm ${m.role === 'model' ? 'bg-primary/10 border-primary text-primary' : 'bg-muted border-foreground/20 text-foreground'}`}>
                {m.role === 'model' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className={`flex-1 max-w-[85%] ${m.role === 'model' ? 'pb-8 relative' : ''}`}>
                <div className={`p-5 rounded-2xl leading-relaxed prose prose-sm md:prose-base dark:prose-invert max-w-none shadow-sm ${m.role === 'user' ? 'bg-foreground text-background font-medium rounded-tr-sm' : 'bg-background border-2 border-border rounded-tl-sm'}`}>
                   <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
                {m.role === 'model' && m.content.length > 15 && (
                    <div className="absolute bottom-0 right-2">
                        {isPlayingId === idx ? (
                            <button onClick={stopSpeaking} className="text-red-500 hover:text-red-600 flex items-center gap-1 text-xs font-bold leading-none bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
                                <StopCircle className="w-3.5 h-3.5"/> Stop Audio
                            </button>
                        ) : (
                            <button onClick={() => speakText(m.content, idx)} className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs font-bold leading-none bg-muted px-3 py-1.5 rounded-full border border-border">
                                <Volume2 className="w-3.5 h-3.5"/> Read Aloud
                            </button>
                        )}
                    </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary text-primary flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 animate-pulse" />
               </div>
               <div className="bg-background border-2 border-border p-5 rounded-2xl rounded-tl-sm flex items-center gap-2">
                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="mt-4 flex rounded-2xl overflow-hidden border-2 border-primary/20 bg-card shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder={`Type a message in ${activeMode.label}...`}
          className="flex-1 bg-transparent border-none focus:ring-0 p-4 resize-none h-16 text-foreground placeholder:text-muted-foreground font-medium"
          rows={1}
        />
        <button
          onClick={() => sendMessage()}
          disabled={isLoading || !input.trim()}
          className="bg-primary text-primary-foreground px-8 flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity font-bold"
        >
          {isLoading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
