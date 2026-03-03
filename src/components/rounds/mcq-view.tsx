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
import { mockMcqSetA, mockMcqSetB } from '@/lib/mock-data';
import type { MCQ, Team } from '@/lib/types';
import { RoundHeader } from '@/components/rounds/round-header';
import { useAntiCheat } from '@/hooks/use-anti-cheat';
import { useRouter } from 'next/navigation';
import { McqSetSelector } from './mcq-set-selector';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '../ui/scroll-area';
import { AlertCircle, ShieldAlert, Timer, Trophy } from 'lucide-react';

export function McqView() {
  const router = useRouter();
  const { toast } = useToast();
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [selectedSet, setSelectedSet] = useState<'A' | 'B' | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const questions: MCQ[] = useMemo(() => {
    if (selectedSet === 'A') return mockMcqSetA;
    if (selectedSet === 'B') return mockMcqSetB;
    return [];
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

    const teamData = localStorage.getItem('currentTeam');
    if (teamData) {
      const currentTeam: Team = JSON.parse(teamData);
      const leaderboardStr = localStorage.getItem('liveLeaderboard');
      let leaderboard: Team[] = leaderboardStr ? JSON.parse(leaderboardStr) : [];
      
      const teamIndex = leaderboard.findIndex((t: Team) => t.id === currentTeam.id);
      if (teamIndex !== -1) {
        const team = leaderboard[teamIndex];
        team.round1Score = score;
        team.round1Time = durationStr;
        team.score = (team.round1Score || 0) + (team.round2Score || 0) + (team.round3Score || 0);
        team.timeTaken = timestamp;
        
        localStorage.setItem('currentTeam', JSON.stringify(team));
      }
       localStorage.setItem('liveLeaderboard', JSON.stringify(leaderboard));
    }

    const completedRounds = JSON.parse(localStorage.getItem('completedRounds') || '[]');
    if (!completedRounds.includes('1')) {
        completedRounds.push('1');
        localStorage.setItem('completedRounds', JSON.stringify(completedRounds));
    }

    router.push('/dashboard');
  }, [router, answers, questions, selectedSet]);

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
        <Card className="w-full max-w-4xl animate-fade-in border-primary/20">
          <CardHeader className="text-center border-b bg-muted/30 pb-8">
            <CardTitle className="font-headline text-4xl text-primary mb-2">
              Round 1: MCQ Challenge
            </CardTitle>
            <p className="text-muted-foreground italic">Please read the following instructions carefully.</p>
          </CardHeader>
          <CardContent className="pt-8">
            <ScrollArea className="h-[55vh] pr-6">
              <div className="space-y-8 font-body">
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Timer className="h-5 w-5 text-accent" />
                    <h3>Timing & Duration</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>You have exactly <strong>15 minutes</strong> to complete all 20 questions.</li>
                    <li>The timer starts as soon as you choose your question set.</li>
                    <li>If the timer expires, your answers will be <strong>automatically submitted</strong>.</li>
                    <li>Your completion duration is recorded and used as a primary <strong>tie-breaker</strong> on the leaderboard.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <ShieldAlert className="h-5 w-5 text-destructive" />
                    <h3>Anti-Cheating Policy</h3>
                  </div>
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li><strong>Tab Switching:</strong> Switching tabs or minimizing the window will trigger a system warning.</li>
                      <li><strong>Right-Click & Shortcuts:</strong> Right-click, Copy, Paste, and Developer Tools shortcuts are strictly disabled.</li>
                      <li><strong>Disqualification:</strong> After <strong>3 warnings</strong>, you will be automatically disqualified and removed from the leaderboard.</li>
                      <li><strong>Device Lock:</strong> Only one device/login is permitted per team.</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Trophy className="h-5 w-5 text-primary" />
                    <h3>Scoring & Format</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Each correct answer is worth <strong>1 point</strong>.</li>
                    <li>There is <strong>no negative marking</strong> for incorrect answers.</li>
                    <li>You can move back and forth between questions using the navigation buttons.</li>
                  </ul>
                </section>

                <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-accent shrink-0" />
                  <p className="text-sm text-muted-foreground italic">
                    By clicking "Start Round", you agree to abide by these rules. Any attempt to bypass the anti-cheating system will result in immediate disqualification without appeal.
                  </p>
                </div>
              </div>
            </ScrollArea>
            <Button
              onClick={() => setRulesAccepted(true)}
              className="w-full mt-8 text-lg py-7 font-headline font-bold uppercase tracking-wider bg-primary hover:bg-primary/90"
            >
              Start Round
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
                 <h1 className="text-lg font-semibold font-headline">MCQ Round</h1>
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
        <Card className="w-full max-w-2xl animate-fade-in">
          <CardHeader>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="font-headline text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
              {currentQuestionIndex + 1}. {currentQuestion.question}
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
                  className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-accent/10 has-[[data-state=checked]]:bg-accent/20 has-[[data-state=checked]]:border-accent transition-colors"
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
              <Button onClick={handleNext} className="flex-[2] text-lg py-6">
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
