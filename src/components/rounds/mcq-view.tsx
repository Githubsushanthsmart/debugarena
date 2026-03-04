'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { mockMcqSetA, mockMcqSetB, mockMcqSetC, mockMcqSetD } from '@/lib/mock-data';
import type { MCQ, Team } from '@/lib/types';
import { RoundHeader } from '@/components/rounds/round-header';
import { useAntiCheat } from '@/hooks/use-anti-cheat';
import { useRouter } from 'next/navigation';
import { McqSetSelector } from './mcq-set-selector';
import { ScrollArea } from '../ui/scroll-area';
import { AlertCircle, ShieldAlert, Timer, Trophy } from 'lucide-react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export function McqView() {
  const router = useRouter();
  const db = useFirestore();
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [selectedSet, setSelectedSet] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const teamId = typeof window !== 'undefined' ? localStorage.getItem('currentTeamId') : null;
  const teamRef = useMemoFirebase(() => teamId ? doc(db, 'teams', teamId) : null, [db, teamId]);
  const { data: team } = useDoc<Team>(teamRef);

  const questions: MCQ[] = useMemo(() => {
    switch (selectedSet) {
      case 'A': return mockMcqSetA;
      case 'B': return mockMcqSetB;
      case 'C': return mockMcqSetC;
      case 'D': return mockMcqSetD;
      default: return [];
    }
  }, [selectedSet]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (rulesAccepted && selectedSet && !startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
  }, [rulesAccepted, selectedSet]);

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = useCallback(() => {
    if (!team || !teamRef) return;

    const finishTime = Date.now();
    const durationMs = startTimeRef.current ? finishTime - startTimeRef.current : 0;
    const durationStr = formatDuration(durationMs);
    const timestamp = new Date().toLocaleTimeString();

    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] && parseInt(answers[q.id], 10) === q.correctAnswerIndex) {
        score++;
      }
    });

    // Update Firestore for cloud sync
    updateDocumentNonBlocking(teamRef, {
      round1Score: score,
      round1Time: durationStr,
      score: score + (team.round2Score || 0) + (team.round3Score || 0),
      timeTaken: timestamp
    });

    router.push('/dashboard');
  }, [router, answers, questions, team, teamRef]);

  const handleFinish = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);
  
  const handleWarning = useCallback((warningCount: number) => {
    if (warningCount >= 3) {
      handleSubmit();
    }
  }, [handleSubmit]);

  useAntiCheat(handleWarning);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestionIndex].id]: value });
  };

  if (!rulesAccepted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-gray-900/50 to-background p-4">
        <Card className="w-full max-w-4xl animate-fade-in border-primary/20 shadow-2xl">
          <CardHeader className="text-center border-b bg-muted/30 pb-8">
            <Badge className="mx-auto mb-2 w-fit bg-accent/20 text-accent hover:bg-accent/30">ROUND 1</Badge>
            <CardTitle className="font-headline text-4xl text-primary mb-2">
              Preliminary Round (EASY)
            </CardTitle>
            <p className="text-muted-foreground italic">Elimination Round - Filter basic debugging & coding skills.</p>
          </CardHeader>
          <CardContent className="pt-8">
            <ScrollArea className="h-[55vh] pr-6">
              <div className="space-y-8 font-body">
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Timer className="h-5 w-5 text-accent" />
                    <h3>Purpose & Structure</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-base">
                    <li><strong>Format:</strong> 20 MCQs focused on Syntax errors + logical mistakes.</li>
                    <li><strong>Question Sets:</strong> Choose from Sets A, B, C, or D (Randomly assigned).</li>
                    <li><strong>Time Limit:</strong> 15 minutes. Automatic submission at deadline.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <ShieldAlert className="h-5 w-5 text-destructive" />
                    <h3>Anti-Cheating Policy</h3>
                  </div>
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-base">
                      <li><strong>Tab Switching:</strong> Strictly prohibited. Warnings issued.</li>
                      <li><strong>No External Help:</strong> AI tools or internet usage results in ban.</li>
                      <li><strong>Disqualification:</strong> Auto-submission after <strong>3 warnings</strong>.</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Trophy className="h-5 w-5 text-primary" />
                    <h3>Selection Criteria</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground text-base">
                    <li>Scores will be saved immediately to the cloud leaderboard.</li>
                    <li><strong>Tie-Breaker:</strong> Faster completion time wins (captured to the millisecond).</li>
                  </ul>
                </section>

                <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-accent shrink-0" />
                  <p className="text-sm text-muted-foreground italic">
                    By clicking "Begin", you agree to the automated anti-cheat monitoring system and the competition guidelines.
                  </p>
                </div>
              </div>
            </ScrollArea>
            <Button
              onClick={() => setRulesAccepted(true)}
              className="w-full mt-8 text-lg py-7 font-headline font-bold uppercase tracking-wider bg-primary hover:bg-primary/90"
            >
              Begin Preliminary Round
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedSet) {
    return (
      <div className="flex flex-col h-screen">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center px-4 justify-center">
                 <h1 className="text-lg font-semibold font-headline">MCQ Round - Select Question Set</h1>
            </div>
        </header>
        <McqSetSelector onSelectSet={setSelectedSet} />
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col h-screen">
      <RoundHeader
        round={1}
        title={`MCQ Round - Set ${selectedSet}`}
        countdownDuration={15 * 60}
        onFinish={handleFinish}
      />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background via-gray-900/50 to-background">
        <Card className="w-full max-w-2xl animate-fade-in shadow-2xl border-primary/10">
          <CardHeader>
            <Progress value={progress} className="mb-4 h-2" />
            <div className="flex justify-between items-center mb-2">
               <span className="text-sm font-medium text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</span>
               <span className="text-xs font-headline font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">Set {selectedSet}</span>
            </div>
            <CardTitle className="font-headline text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={handleAnswerChange}
              value={answers[currentQuestion.id] || ''}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <Label
                  key={index}
                  htmlFor={`option-${index}`}
                  className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-accent/10 has-[[data-state=checked]]:bg-accent/20 has-[[data-state=checked]]:border-accent transition-all duration-200"
                >
                  <RadioGroupItem value={String(index)} id={`option-${index}`} />
                  <span className="ml-4 text-base">{option}</span>
                </Label>
              ))}
            </RadioGroup>
            <div className="flex gap-4 mt-8">
               {currentQuestionIndex > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  className="flex-1 py-6 text-lg"
                >
                  Previous
                </Button>
              )}
              <Button onClick={handleNext} className="flex-[2] text-lg py-6 bg-primary hover:bg-primary/90">
                {currentQuestionIndex < questions.length - 1
                  ? 'Next Question'
                  : 'Submit Answers'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("px-2 py-0.5 text-xs font-semibold rounded-full border", className)}>
    {children}
  </div>
);

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
