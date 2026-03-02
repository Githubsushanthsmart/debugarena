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

export default function AdminDisqualifiedPage() {
  const [disqualifiedTeams, setDisqualifiedTeams] = useState<Team[]>([]);
  const { toast } = useToast();

  const getDisqualifiedData = () => {
    const teamsStr = localStorage.getItem('disqualifiedTeams');
    const teams: Team[] = teamsStr ? JSON.parse(teamsStr) : [];
    setDisqualifiedTeams(teams);
  };

  useEffect(() => {
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

  const handleClearDisqualified = () => {
    localStorage.removeItem('disqualifiedTeams');
    getDisqualifiedData();
    toast({
      title: "Disqualified List Cleared",
      description: "All records of disqualified teams have been removed.",
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Disqualified Teams</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
             <Button variant="destructive">Clear Disqualified</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear Disqualified Teams?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove all teams from the disqualified list. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearDisqualified}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
