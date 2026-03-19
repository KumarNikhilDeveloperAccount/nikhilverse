"use client";

import { Trophy, ArrowLeft, ArrowRight, CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import allQuizData from '@/content/knowledge/quiz.json';

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    // Randomize and pick 10 questions safely
    if (!allQuizData || allQuizData.length === 0) return;
    const shuffled = [...allQuizData].sort(() => 0.5 - Math.random());
    const selected10 = shuffled.slice(0, 10);
    setQuestions(selected10);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setIsFinished(false);
  };

  if (questions.length === 0) return <div className="text-center py-24 text-muted-foreground animate-pulse">Loading Mission Environment...</div>;

  if (isFinished) {
    let message = "Good effort, but there's room to learn!";
    if (score === 10) message = "Flawless Execution! You are an ITSM Master!";
    else if (score >= 8) message = "Excellent work! Your infrastructure fundamentals are incredibly strong.";
    else if (score >= 5) message = "Solid attempt! Keep reviewing the frameworks to reach mastery.";

    return (
      <div className="container max-w-3xl mx-auto py-12 px-4 animate-in zoom-in-95 duration-700 text-center flex flex-col items-center">
        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-background">
          <Trophy className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-sm">Mission Accomplished!</h1>
        <p className="text-3xl font-bold mb-4">Final Score: <span className="text-primary">{score} / {questions.length}</span></p>
        <p className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={startNewQuiz} className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold hover:opacity-90 flex items-center justify-center gap-2 shadow-sm transition-all focus:ring-4 focus:ring-primary/20">
             <RefreshCcw className="w-5 h-5"/> Attempt New Mission
          </button>
          <Link href="/playgrid" className="bg-card text-foreground border-2 border-border px-8 py-3.5 rounded-full font-bold hover:bg-accent hover:border-accent-foreground/20 flex items-center justify-center gap-2 shadow-sm transition-all">
             Return to PlayGrid HQ
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === q.answer) {
      setScore(s => s + 1);
    }
  };

  const nextQ = () => {
    if (current === questions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 flex items-center justify-center gap-3 drop-shadow-sm">
          <Trophy className="w-10 h-10 text-primary" /> Knowledge Check
        </h1>
        <div className="flex justify-center items-center gap-4 mb-2">
            <div className="h-2 bg-muted rounded-full w-48 overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(current / questions.length) * 100}%` }} />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Question {current + 1} of {questions.length}</p>
        </div>
      </div>

      <div className="bg-card border-2 border-border rounded-[2rem] p-8 md:p-10 shadow-sm transition-all relative">
        <div className="absolute top-4 right-6 text-sm font-bold text-muted-foreground">Current Score: <span className="text-primary">{score}</span></div>
        <h2 className="text-2xl font-bold mb-10 text-center leading-snug mt-6">{q.q}</h2>
        
        <div className="space-y-4 mb-8">
          {q.options.map((opt: string, idx: number) => {
            const isSelected = selected === idx;
            const isCorrect = idx === q.answer;
            const statusClass = showResult
              ? isCorrect 
                ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400" 
                : isSelected 
                  ? "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400"
                  : "bg-card border-border opacity-50"
              : "bg-card border-border hover:border-primary cursor-pointer hover:shadow-sm";

            return (
              <div 
                key={idx} 
                onClick={() => handleSelect(idx)}
                className={`p-5 rounded-2xl border-2 transition-all flex justify-between items-center group ${statusClass}`}
              >
                <span className="font-semibold text-[1.1rem]">{opt}</span>
                {showResult && isCorrect && <CheckCircle2 className="w-7 h-7 text-green-500" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-7 h-7 text-red-500" />}
              </div>
            );
          })}
        </div>
        
        {showResult && (
          <div className="bg-primary/5 border-l-4 border-l-primary p-6 rounded-xl animate-in fade-in duration-300">
             <h3 className="font-bold text-primary mb-2 text-sm uppercase tracking-widest">Explanation</h3>
             <p className="text-foreground/90 leading-relaxed font-medium">{q.explanation}</p>
             <button 
               onClick={nextQ}
               className="mt-6 flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold ml-auto hover:opacity-90 transition-opacity focus:ring-4 focus:ring-primary/20"
             >
               {current === questions.length - 1 ? "Complete Mission" : "Next Question"} <ArrowRight className="w-5 h-5" />
             </button>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/playgrid" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 font-medium">
          <ArrowLeft className="w-4 h-4" /> Abort Mission (Back to PlayGrid)
        </Link>
      </div>
    </div>
  );
}
