'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Team } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function AdminResultsPage() {
  const [leaderboard, setLeaderboard] = useState<Team[]>([]);
  const { toast } = useToast();

  const getLeaderboardData = () => {
    const leaderboardStr = localStorage.getItem('liveLeaderboard');
    const initialData: Team[] = leaderboardStr ? JSON.parse(leaderboardStr) : [];
    
    // Sort by score (desc), then by time taken (asc)
    const sortedData = [...initialData].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // If scores are equal, team with LESS time (faster) wins
      const timeA = a.round1Time || '99:99';
      const timeB = b.round1Time || '99:99';
      return timeA.localeCompare(timeB);
    });

    const rankedData = sortedData.map((team, index) => ({ ...team, rank: index + 1 }));
    setLeaderboard(rankedData);
  };

  useEffect(() => {
    getLeaderboardData();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'liveLeaderboard') {
        getLeaderboardData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClearLeaderboard = () => {
    localStorage.removeItem('liveLeaderboard');
    localStorage.removeItem('disqualifiedTeams');
    getLeaderboardData();
    toast({
        title: "Leaderboard Cleared",
        description: "All competition data has been reset.",
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Live Leaderboard</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
             <Button variant="destructive">Reset All Records</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all leaderboard scores and disqualified records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearLeaderboard}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Team Performance (Score & Time Taken)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Rank</TableHead>
                <TableHead>Team & College</TableHead>
                <TableHead className="text-center">R1 (MCQ)</TableHead>
                <TableHead className="text-center">R2 (Debug)</TableHead>
                <TableHead className="text-center">R3 (Final)</TableHead>
                <TableHead className="text-right">Total Score</TableHead>
                <TableHead className="text-right">Completion Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.length > 0 ? (
                leaderboard.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-bold">{team.rank}</TableCell>
                    <TableCell>
                      <div className="font-medium">{team.name}</div>
                      <div className="text-xs text-muted-foreground">{team.college}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-bold">{team.round1Score ?? 0} pts</div>
                      <div className="text-[10px] text-primary font-mono">{team.round1Time ? `${team.round1Time} min` : '-'}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-bold">{team.round2Score ?? 0} pts</div>
                      <div className="text-[10px] text-primary font-mono">{team.round2Time ? `${team.round2Time} min` : '-'}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-bold">{team.round3Score ?? 0} pts</div>
                      <div className="text-[10px] text-primary font-mono">{team.round3Time ? `${team.round3Time} min` : '-'}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="text-sm font-bold bg-primary/10 border-primary/20">
                        {team.score}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      Sub: {team.timeTaken || '-'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Waiting for participants to submit...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
