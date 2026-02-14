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

export default function AdminResultsPage() {
  const [leaderboard, setLeaderboard] = useState<Team[]>([]);
  const { toast } = useToast();

  const getLeaderboardData = () => {
    const leaderboardStr = localStorage.getItem('liveLeaderboard');
    const initialData: Team[] = leaderboardStr ? JSON.parse(leaderboardStr) : [];
    
    const sortedData = [...initialData].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      if (a.timeTaken && b.timeTaken) {
          return a.timeTaken.localeCompare(b.timeTaken);
      }
      return 0;
    });

    const rankedData = sortedData.map((team, index) => ({ ...team, rank: index + 1 }));
    setLeaderboard(rankedData);
  };

  useEffect(() => {
    getLeaderboardData(); // Initial load

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'liveLeaderboard') {
        getLeaderboardData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleClearLeaderboard = () => {
    localStorage.removeItem('liveLeaderboard');
    localStorage.removeItem('disqualifiedTeams');
    localStorage.removeItem('assignedDebugProblems');
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
             <Button variant="destructive">Clear Leaderboard</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all leaderboard, disqualified teams, and problem assignment data.
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
          <CardTitle>Live Team Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.length > 0 ? (
                leaderboard.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">{team.rank}</TableCell>
                    <TableCell>{team.name}</TableCell>
                    <TableCell>{team.college}</TableCell>
                    <TableCell>{team.score}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No teams have registered yet.
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
