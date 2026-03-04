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
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, deleteDoc, writeBatch } from 'firebase/firestore';
import { Loader2, RefreshCw } from 'lucide-react';

export default function AdminResultsPage() {
  const db = useFirestore();
  const { toast } = useToast();

  const teamsColRef = useMemoFirebase(() => collection(db, 'teams'), [db]);
  const { data: rawTeams, isLoading } = useCollection<Team>(teamsColRef);

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
               <Button variant="destructive">Reset All Cloud Records</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will PERMANENTLY delete all teams and scores from the Firebase database. This cannot be undone.
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
          <CardTitle>Real-Time Team Performance (Syncing Across All Devices)</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Fetching live results from Firestore...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Team & College</TableHead>
                  <TableHead className="text-center">R1 (MCQ)</TableHead>
                  <TableHead className="text-center">R2 (Debug)</TableHead>
                  <TableHead className="text-center">R3 (Final)</TableHead>
                  <TableHead className="text-right">Total Score</TableHead>
                  <TableHead className="text-right">Last Submission</TableHead>
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
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{team.college}</div>
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
                      <TableCell className="text-right text-xs font-mono text-muted-foreground">
                        {team.timeTaken || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-64 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin opacity-20" />
                        <p>Waiting for teams to register and submit...</p>
                      </div>
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
