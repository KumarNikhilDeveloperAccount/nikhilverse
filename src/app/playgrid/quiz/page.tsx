"use client";

import { Trophy, ArrowLeft, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const questions = [
  {
    q: "If a server goes offline unexpectedly, what process do you invoke?",
    options: ["Change Management", "Incident Management", "Problem Management", "Access Management"],
    answer: 1,
    explanation: "Unexpected interruptions to services are handled via Incident Management to restore service as quickly as possible."
  },
  {
    q: "What does CAB stand for in ITIL?",
    options: ["Computer Assessment Board", "Change Advisory Board", "Central Administration Base", "Cloud Architecture Block"],
    answer: 1,
    explanation: "CAB (Change Advisory Board) reviews and approves changes to the production environment."
  }
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
  };

  const nextQ = () => {
    setCurrent(c => (c + 1) % questions.length);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 flex items-center justify-center gap-3">
          <Trophy className="w-10 h-10 text-primary" /> Knowledge Check
        </h1>
        <p className="text-muted-foreground">Question {current + 1} of {questions.length}</p>
      </div>

      <div className="bg-card border-2 border-border rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-8 text-center">{q.q}</h2>
        
        <div className="space-y-4 mb-8">
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect = idx === q.answer;
            const statusClass = showResult
              ? isCorrect 
                ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400" 
                : isSelected 
                  ? "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400"
                  : "bg-card border-border opacity-50"
              : "bg-card border-border hover:border-primary cursor-pointer";

            return (
              <div 
                key={idx} 
                onClick={() => handleSelect(idx)}
                className={`p-4 rounded-xl border-2 transition-all flex justify-between items-center ${statusClass}`}
              >
                <span className="font-medium text-lg">{opt}</span>
                {showResult && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
              </div>
            );
          })}
        </div>
        
        {showResult && (
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl animate-in slide-in-from-bottom-2 fade-in">
             <h3 className="font-bold text-primary mb-2">Explanation</h3>
             <p className="text-foreground/90">{q.explanation}</p>
             <button 
               onClick={nextQ}
               className="mt-6 flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-bold ml-auto hover:opacity-90 transition-opacity"
             >
               Next Question <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/playgrid" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to PlayGrid
        </Link>
      </div>
    </div>
  );
}
