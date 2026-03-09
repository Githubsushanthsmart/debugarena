'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Loader2, Settings2 } from 'lucide-react';

type RoundConfig = {
  id: string;
  title: string;
  isLocked: boolean;
  isActive: boolean;
};

const DEFAULT_ROUNDS: RoundConfig[] = [
  { id: '1', title: 'Round 1: Preliminary (MCQ)', isLocked: false, isActive: true },
  { id: '2', title: 'Round 2: Intermediate (Debugging)', isLocked: true, isActive: false },
  { id: '3', title: 'Round 3: Championship (Final)', isLocked: true, isActive: false },
];

export default function AdminRoundsPage() {
  const db = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const roundsColRef = useMemoFirebase(() => (user && !isUserLoading) ? collection(db, 'competitionRounds') : null, [db, user, isUserLoading]);
  const { data: firestoreRounds, isLoading } = useCollection<RoundConfig>(roundsColRef);

  // Merge cloud data with defaults to ensure all 3 rounds are ALWAYS listed
  const rounds = useMemo(() => {
    return DEFAULT_ROUNDS.map(defaultRound => {
      const cloudRound = firestoreRounds?.find(r => r.id === defaultRound.id);
      return cloudRound ? { ...defaultRound, ...cloudRound } : defaultRound;
    });
  }, [firestoreRounds]);

  const updateRoundInCloud = (round: RoundConfig) => {
    const roundRef = doc(db, 'competitionRounds', round.id);
    const { ...payload } = round;
    
    // Explicitly set properties to ensure they exist in Firestore
    setDocumentNonBlocking(roundRef, {
      id: payload.id,
      title: payload.title,
      isLocked: payload.isLocked,
      isActive: payload.isActive
    }, { merge: true });
    
    toast({
      title: "Settings Synced",
      description: `${round.title} is now ${round.isActive ? 'Visible' : 'Hidden'} and ${round.isLocked ? 'Locked' : 'Unlocked'}.`,
    });
  };

  const toggleLocked = (id: string) => {
    const round = rounds.find(r => r.id === id);
    if (round) {
      updateRoundInCloud({ ...round, isLocked: !round.isLocked });
    }
  };

  const toggleActive = (id: string) => {
    const round = rounds.find(r => r.id === id);
    if (round) {
      updateRoundInCloud({ ...round, isActive: !round.isActive });
    }
  };

  if (isUserLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings2 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Round Access Control</h1>
      </div>
      
      <Card className="border-primary/20 shadow-xl">
        <CardHeader className="bg-muted/30">
          <CardTitle>Global Round Management</CardTitle>
          <p className="text-sm text-muted-foreground">Toggle visibility and access for all competition participants in real-time.</p>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="h-32 flex flex-col items-center justify-center gap-2 text-muted-foreground">
               <Loader2 className="h-8 w-8 animate-spin" />
               <p>Connecting to database...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competition Stage</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Lock Status</TableHead>
                  <TableHead>Live Toggle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rounds.sort((a,b) => a.id.localeCompare(b.id)).map((round) => (
                  <TableRow key={round.id} className="hover:bg-muted/10 transition-colors">
                    <TableCell className="font-medium">{round.title}</TableCell>
                    <TableCell>
                      <Badge variant={round.isActive ? "default" : "secondary"} className={round.isActive ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}>
                        {round.isActive ? "Visible to Teams" : "Hidden from Teams"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Switch 
                          checked={round.isLocked} 
                          onCheckedChange={() => toggleLocked(round.id)}
                        />
                        <span className={`text-sm font-medium ${round.isLocked ? "text-destructive" : "text-green-500"}`}>
                          {round.isLocked ? "LOCKED" : "UNLOCKED"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Switch 
                          checked={round.isActive} 
                          onCheckedChange={() => toggleActive(round.id)}
                        />
                        <span className="text-sm text-muted-foreground font-medium">
                          {round.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <p className="text-xs text-muted-foreground italic">
          <strong>Tip:</strong> You can hide future rounds (Round 2 & 3) until the competition reaches that stage. Locking a round prevents participants from entering even if they can see it.
        </p>
      </div>
    </div>
  );
}
