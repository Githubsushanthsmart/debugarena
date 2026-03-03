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

  // Start the timer ONLY when the rules are accepted AND a set is selected
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
        team.round1Time = durationStr; // Save duration as timestamp
        team.score = (team.round1Score || 0) + (team.round2Score || 0) + (team.round3Score || 0);
        team.timeTaken = timestamp; // Save actual submission clock time
        
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
        <Card className="w-full max-w-4xl animate-fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-center">
              MCQ Round – Official Rules & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-6">
              <div className="prose prose-invert max-w-none font-body text-muted-foreground">
                <h3>1. Time Limit Rule</h3>
                <p>
                  <strong>Rule:</strong> Each team will be given 15 minutes to
                  answer 20 multiple-choice questions.
                </p>
                <hr />
                <h3>2. No Internet / No AI Rule</h3>
                <p>
                  <strong>Rule:</strong> Participants are not allowed to use any external resources.
                </p>
                <hr />
                <h3>3. Scoring Rule</h3>
                <p>
                  Each correct answer awards 1 point. Total time taken is recorded for tie-breaking.
                </p>
              </div>
            </ScrollArea>
            <Button
              onClick={() => setRulesAccepted(true)}
              className="w-full mt-8"
            >
              I Understand and Agree, Start Round
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
            <Button onClick={handleNext} className="w-full mt-8 text-lg py-6">
              {currentQuestionIndex < questions.length - 1
                ? 'Next Question'
                : 'Submit Answers'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
