
'use client';

import { useMemo } from 'react';
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
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { Loader2, RefreshCw, Trash2 } from 'lucide-react';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function AdminResultsPage() {
  const db = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const { toast } = useToast();

  const teamsColRef = useMemoFirebase(() => (!isAuthLoading && user) ? collection(db, 'teams') : null, [db, user, isAuthLoading]);
  const { data: rawTeams, isLoading: isDataLoading } = useCollection<Team>(teamsColRef);

  const isLoading = isAuthLoading || isDataLoading;

  const leaderboard = useMemo(() => {
    if (!rawTeams) return [];
    
    return [...rawTeams]
      .sort((a, b) => {
        if ((b.score || 0) !== (a.score || 0)) {
          return (b.score || 0) - (a.score || 0);
        }
        const timeA = a.round3Time || a.round2Time || a.round1Time || '99:99';
        const timeB = b.round3Time || b.round2Time || b.round1Time || '99:99';
        return timeA.localeCompare(timeB);
      })
      .map((team, index) => ({ ...team, rank: index + 1 }));
  }, [rawTeams]);

  const handleDeleteTeam = (teamId: string, teamName: string) => {
    const teamRef = doc(db, 'teams', teamId);
    deleteDocumentNonBlocking(teamRef);
    toast({
      title: "Team Deleted",
      description: `${teamName} has been removed from the competition.`,
    });
  };

  const handleClearLeaderboard = async () => {
    if (!rawTeams) return;
    
    try {
      const batch = writeBatch(db);
      rawTeams.forEach(team => {
        batch.delete(doc(db, 'teams', team.id));
      });
      await batch.commit();
      
      toast({
          title: "Leaderboard Cleared",
          description: "All competition data has been removed from the cloud.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to clear records."
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          Live Leaderboard
          {isLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
               <Button variant="destructive">Reset All Records</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will PERMANENTLY delete ALL teams and scores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearLeaderboard}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>Real-Time Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Connecting...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-center">R1</TableHead>
                  <TableHead className="text-center">R2</TableHead>
                  <TableHead className="text-center">R3</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((team) => (
                    <TableRow key={team.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-bold">
                        {team.rank === 1 ? '🥇' : team.rank === 2 ? '🥈' : team.rank === 3 ? '🥉' : team.rank}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{team.name}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">{team.college}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="font-bold">{team.round1Score ?? 0}</div>
                        <div className="text-[10px] text-primary font-mono">{team.round1Time || '-'}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="font-bold">{team.round2Score ?? 0}</div>
                        <div className="text-[10px] text-primary font-mono">{team.round2Time || '-'}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="font-bold">{team.round3Score ?? 0}</div>
                        <div className="text-[10px] text-primary font-mono">{team.round3Time || '-'}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="text-sm font-bold bg-primary/10 border-primary/20 text-primary">
                          {team.score || 0}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete {team.name}?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove this team's records permanently.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteTeam(team.id, team.name)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-64 text-center">
                      <p className="text-muted-foreground">No teams registered yet.</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
