'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { mockLeaderboard } from '@/lib/mock-data';
import type { Team } from '@/lib/types';
import { Trophy } from 'lucide-react';

export function LeaderboardTable() {
  const teams: Team[] = mockLeaderboard;

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-yellow-600';
    return 'text-foreground';
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] text-center">Rank</TableHead>
            <TableHead>Team Name</TableHead>
            <TableHead>College</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead className="text-right">Time Taken</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id} className="hover:bg-primary/5">
              <TableCell className="font-medium text-center">
                <div className={`flex items-center justify-center font-bold text-lg ${getRankColor(team.rank)}`}>
                  {team.rank <= 3 ? <Trophy className="h-5 w-5 mr-1" /> : null}
                  {team.rank}
                </div>
              </TableCell>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell className="text-muted-foreground">{team.college}</TableCell>
              <TableCell className="text-right font-mono">{team.score}</TableCell>
              <TableCell className="text-right font-mono">{team.timeTaken}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
