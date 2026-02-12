'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import type { Team } from '@/lib/types';

export default function ScorePage() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const lastScoreStr = localStorage.getItem('lastRoundScore');
    const teamDataStr = localStorage.getItem('currentTeam');

    if (lastScoreStr && teamDataStr) {
      setScore(JSON.parse(lastScoreStr));
      setTeam(JSON.parse(teamDataStr));
    } else {
      router.replace('/dashboard');
    }
  }, [router]);

  if (score === null || !team) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <p>Loading score...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-gray-900/50 to-background p-4">
        <Card className="w-full max-w-lg text-center animate-fade-in">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <Trophy className="h-16 w-16 text-yellow-400" />
                </div>
                <CardTitle className="text-3xl font-headline">Round Complete!</CardTitle>
                <CardDescription>Congratulations, {team.name}!</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-lg">You Scored</p>
                <p className="text-8xl font-bold my-4 text-primary">{score}</p>
                <Button onClick={() => router.push('/dashboard')} className="w-full mt-8">
                    Back to Dashboard
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
