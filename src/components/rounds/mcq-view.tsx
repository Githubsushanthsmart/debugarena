'use client';

import { useState, useCallback, useMemo } from 'react';
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

export function McqView() {
  const router = useRouter();
  const [selectedSet, setSelectedSet] = useState<'A' | 'B' | null>(null);

  const questions: MCQ[] = useMemo(() => {
    if (selectedSet === 'A') return mockMcqSetA;
    if (selectedSet === 'B') return mockMcqSetB;
    return [];
  }, [selectedSet]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSubmit = useCallback(() => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] && parseInt(answers[q.id], 10) === q.correctAnswerIndex) {
        score++;
      }
    });

    localStorage.setItem('lastRoundScore', JSON.stringify(score));

    const teamData = localStorage.getItem('currentTeam');
    if (teamData) {
      const currentTeam: Team = JSON.parse(teamData);
      const leaderboardStr = localStorage.getItem('liveLeaderboard');
      let leaderboard: Team[] = leaderboardStr ? JSON.parse(leaderboardStr) : [];
      
      const teamIndex = leaderboard.findIndex((t: any) => t.id === currentTeam.id);
      if (teamIndex !== -1) {
        const newTotalScore = leaderboard[teamIndex].score + score;
        leaderboard[teamIndex].score = newTotalScore;
        
        const updatedTeam = { ...currentTeam, score: newTotalScore };
        localStorage.setItem('currentTeam', JSON.stringify(updatedTeam));
      }
       localStorage.setItem('liveLeaderboard', JSON.stringify(leaderboard));
    }


    const completedRounds = JSON.parse(localStorage.getItem('completedRounds') || '[]');
    if (!completedRounds.includes('1')) {
        completedRounds.push('1');
        localStorage.setItem('completedRounds', JSON.stringify(completedRounds));
    }
    router.push('/score');
  }, [router, answers, questions]);

  const handleFinish = useCallback(() => {
    alert('Time is up! Submitting your answers.');
    handleSubmit();
  }, [handleSubmit]);
  
  const handleWarning = useCallback((warningCount: number) => {
    if (warningCount >= 3) {
      alert('You have reached the maximum number of warnings. Your test will be submitted automatically.');
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

  if (!selectedSet) {
    return (
      <div className="flex flex-col h-screen">
        <RoundHeader
          round={1}
          title="MCQ Round"
          countdownDuration={20 * 60}
          onFinish={() => {
            alert('Time is up!');
            router.push('/dashboard');
          }}
        />
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
        countdownDuration={20 * 60}
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
