'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Team } from '@/lib/types';
import { mockLeaderboard } from '@/lib/mock-data';

export default function AdminResultsPage() {
  const [leaderboard, setLeaderboard] = useState<Team[]>([]);

  useEffect(() => {
    const getLeaderboardData = () => {
      const leaderboardStr = localStorage.getItem('liveLeaderboard');
      // If no data, start with mock data. In a real app this would be an empty array.
      const initialData: Team[] = leaderboardStr ? JSON.parse(leaderboardStr) : mockLeaderboard;
      
      const sortedData = [...initialData].sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        // Add time taken as a secondary sorting criteria if scores are equal
        // This assumes timeTaken is in a format that can be compared, e.g., seconds.
        // For "HH:MM:SS" string format, direct comparison works alphabetically.
        if (a.timeTaken && b.timeTaken) {
            return a.timeTaken.localeCompare(b.timeTaken);
        }
        return 0;
      });

      const rankedData = sortedData.map((team, index) => ({ ...team, rank: index + 1 }));
      setLeaderboard(rankedData);
    };

    getLeaderboardData(); // Initial load

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'liveLeaderboard' || event.key === 'currentTeam') {
        getLeaderboardData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Live Leaderboard</h1>
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
              {leaderboard.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.rank}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.college}</TableCell>
                  <TableCell>{team.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
