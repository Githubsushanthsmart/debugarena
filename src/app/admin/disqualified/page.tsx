'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Team } from '@/lib/types';

export default function AdminDisqualifiedPage() {
  const [disqualifiedTeams, setDisqualifiedTeams] = useState<Team[]>([]);

  useEffect(() => {
    const getDisqualifiedData = () => {
      const teamsStr = localStorage.getItem('disqualifiedTeams');
      const teams: Team[] = teamsStr ? JSON.parse(teamsStr) : [];
      setDisqualifiedTeams(teams);
    };

    getDisqualifiedData(); // Initial load

    const handleStorageChange = (event: StorageEvent) => {
      // Listen for changes to 'disqualifiedTeams'
      if (event.key === 'disqualifiedTeams') {
        getDisqualifiedData();
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
        <h1 className="text-3xl font-bold font-headline">Disqualified Teams</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teams Disqualified for Cheating</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Members</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disqualifiedTeams.length > 0 ? (
                disqualifiedTeams.map((team) => (
                  <TableRow key={team.id} className="bg-destructive/10">
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.college}</TableCell>
                    <TableCell>{team.members?.join(', ')}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No teams have been disqualified yet.
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
