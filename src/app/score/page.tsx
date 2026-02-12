'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import type { Team } from '@/lib/types';

export default function ScorePage() {
  const router = useRouter();
  const [roundScore, setRoundScore] = useState<number | null>(null);
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const lastScoreStr = localStorage.getItem('lastRoundScore');
    const teamDataStr = localStorage.getItem('currentTeam');

    if (lastScoreStr && teamDataStr) {
      setRoundScore(JSON.parse(lastScoreStr));
      setTeam(JSON.parse(teamDataStr));
    } else {
      router.replace('/dashboard');
    }
  }, [router]);

  if (roundScore === null || !team) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <p>Loading score...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-gray-900/50 to-background p-4">
        <Card className="w-full max-w-2xl text-center animate-fade-in">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <Trophy className="h-16 w-16 text-yellow-400" />
                </div>
                <CardTitle className="text-3xl font-headline">Round Complete!</CardTitle>
                <CardDescription>Congratulations, {team.name}!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-muted-foreground text-xl">Round Score</p>
                        <p className="text-8xl font-bold my-4 text-primary">{roundScore}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xl">Total Score</p>
                        <p className="text-8xl font-bold my-4 text-accent">{team.score}</p>
                    </div>
                </div>
                <Button onClick={() => router.push('/dashboard')} className="w-full mt-12">
                    Back to Dashboard
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
