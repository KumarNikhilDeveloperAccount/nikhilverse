"use client";

import { Bot, Send, User, Mic } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputLocal, setInputLocal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [isListening, setIsListening] = useState(false);

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        setInputLocal(prev => prev + (prev ? " " : "") + finalTranscript);
      }
    };
    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error !== 'no-speech') {
        alert(`Microphone Error: ${event.error}. Please check your browser settings.`);
      }
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    setInputLocal("");
    const newMessages = [...messages, { id: Date.now().toString(), role: "user", content }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown Context Error");
        setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: `Error: ${errorText}` }]);
        setIsLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");
      
      const decoder = new TextDecoder();
      let aiMessage = "";
      
      setMessages([...newMessages, { id: (Date.now() + 1).toString(), role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiMessage += decoder.decode(value, { stream: true });
        
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content = aiMessage;
          return updated;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-700">
      <div className="mb-6 text-center shrink-0">
        <h1 className="text-4xl font-extrabold mb-2 flex items-center justify-center gap-3">
          <Bot className="w-8 h-8 text-primary" /> NikVerse AI
        </h1>
        <p className="text-muted-foreground">Ask anything about Kumar Nikhil's experience, skills, or IT infrastructure.</p>
      </div>

      <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center space-y-4">
               <Bot className="w-16 h-16 opacity-20" />
               <p>I'm trained on Nikhil's career, ITSM frameworks, and infrastructure architecture. How can I help?</p>
               <div className="flex flex-wrap justify-center gap-2 mt-4">
                 <button onClick={() => sendMessage("What did he do at DXC?")} className="text-xs bg-muted px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors border border-border">What did he do at DXC?</button>
                 <button onClick={() => sendMessage("Explain Change Management like I'm 5")} className="text-xs bg-muted px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors border border-border">Explain Change Management like I'm 5</button>
               </div>
            </div>
          )}

          {messages.map((m: any) => (
            <div key={m.id} className={`flex flex-col gap-2 max-w-[85%] ${m.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
              <div className={`flex items-center gap-2 px-3 mb-1 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                  {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase">{m.role}</span>
              </div>
              <div className={`px-5 py-3 rounded-2xl ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted text-foreground border border-border rounded-tl-none'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-2 mr-auto max-w-[85%] items-end mt-4">
               <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center"><Bot className="w-3 h-3" /></div>
               <div className="px-5 py-3 rounded-2xl bg-muted rounded-tl-none border border-border flex gap-1 pt-4 pb-4">
                 <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" />
                 <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce delay-75 mx-1" />
                 <div className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce delay-150" />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); sendMessage(inputLocal); }} className="p-4 border-t border-border bg-background flex gap-2">
          <button 
            type="button" 
            onClick={handleVoice}
            className={`p-3 shrink-0 rounded-xl transition-colors border border-border ${isListening ? 'bg-red-500 text-white animate-pulse border-red-500' : 'bg-muted text-foreground hover:bg-accent'}`}
          >
            <Mic className="w-5 h-5" />
          </button>
          <input
            className="flex-1 bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
            value={inputLocal}
            placeholder="Type your message..."
            onChange={(e) => setInputLocal(e.target.value)}
          />
          <button type="submit" disabled={isLoading || !inputLocal.trim()} className="bg-primary text-primary-foreground p-3 shrink-0 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
