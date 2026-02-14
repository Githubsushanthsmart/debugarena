'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code2 } from 'lucide-react';
import type { Team } from '@/lib/types';

export default function RegisterPage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState('');
  const [college, setCollege] = useState('');
  const [members, setMembers] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim() && members.trim() && college.trim()) {
      const teamInfo: Team = {
        id: teamName.toLowerCase().replace(/\s+/g, '-'), // generate an id
        name: teamName.trim(),
        members: members
          .trim()
          .split(',')
          .map((m) => m.trim()),
        college: college.trim(),
        rank: 0,
        score: 0,
        timeTaken: '00:00:00',
      };
      localStorage.setItem('currentTeam', JSON.stringify(teamInfo));
      
      const leaderboardStr = localStorage.getItem('liveLeaderboard');
      const leaderboard: Team[] = leaderboardStr ? JSON.parse(leaderboardStr) : [];
      
      const existingTeamIndex = leaderboard.findIndex(t => t.id === teamInfo.id);
      if (existingTeamIndex !== -1) {
        leaderboard[existingTeamIndex] = { ...leaderboard[existingTeamIndex], ...teamInfo};
      } else {
        leaderboard.push(teamInfo);
      }
      
      localStorage.setItem('liveLeaderboard', JSON.stringify(leaderboard));

      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Code2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">
            Welcome to DebugArena
          </CardTitle>
          <CardDescription>
            Register your team to start the competition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                placeholder="e.g., The Bug Slayers"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Input
                id="college"
                placeholder="e.g., Institute of Technology"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="members">Member Names (comma-separated)</Label>
              <Input
                id="members"
                placeholder="e.g., John Doe, Jane Smith"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Start Competition
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
