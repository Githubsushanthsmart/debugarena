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
import { Loader2 } from 'lucide-react';

type RoundConfig = {
  id: string;
  title: string;
  isLocked: boolean;
  isActive: boolean;
};

const DEFAULT_ROUNDS: RoundConfig[] = [
  { id: '1', title: 'MCQ Round', isLocked: false, isActive: true },
  { id: '2', title: 'Debugging Round', isLocked: true, isActive: false },
  { id: '3', title: 'Final Round', isLocked: true, isActive: false },
];

export default function AdminRoundsPage() {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  const roundsColRef = useMemoFirebase(() => user ? collection(db, 'competitionRounds') : null, [db, user]);
  const { data: firestoreRounds, isLoading } = useCollection<RoundConfig>(roundsColRef);

  // Merge cloud data with defaults to ensure all 3 rounds are always listed
  const rounds = useMemo(() => {
    return DEFAULT_ROUNDS.map(defaultRound => {
      const cloudRound = firestoreRounds?.find(r => r.id === defaultRound.id);
      return cloudRound ? { ...defaultRound, ...cloudRound } : defaultRound;
    });
  }, [firestoreRounds]);

  const updateRoundInCloud = (round: RoundConfig) => {
    const roundRef = doc(db, 'competitionRounds', round.id);
    // Ensure we send a clean object without the internal __memo or id properties if present
    const { ...payload } = round;
    setDocumentNonBlocking(roundRef, payload, { merge: true });
    
    toast({
      title: "Syncing...",
      description: `${round.title} status updated across all devices.`,
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

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8 flex items-center gap-2">
        Configure Rounds
        {(isLoading || !user) && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
      </h1>
      
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle>Cloud-Synced Access Control</CardTitle>
          <p className="text-sm text-muted-foreground">Changes here take effect immediately for all participants worldwide.</p>
        </CardHeader>
        <CardContent>
          {isLoading || !user ? (
            <div className="h-32 flex flex-col items-center justify-center gap-2 text-muted-foreground">
               <Loader2 className="h-8 w-8 animate-spin" />
               <p>Connecting to round configurations...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Round</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Is Locked</TableHead>
                  <TableHead>Is Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rounds.sort((a,b) => a.id.localeCompare(b.id)).map((round) => (
                  <TableRow key={round.id}>
                    <TableCell className="font-medium">{round.title}</TableCell>
                    <TableCell>
                      <Badge variant={round.isActive ? "default" : "secondary"}>
                        {round.isActive ? "Live" : "Hidden"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={round.isLocked} 
                          onCheckedChange={() => toggleLocked(round.id)}
                        />
                        <span className="text-sm text-muted-foreground">
                          {round.isLocked ? "Locked" : "Unlocked"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={round.isActive} 
                          onCheckedChange={() => toggleActive(round.id)}
                        />
                        <span className="text-sm text-muted-foreground">
                          {round.isActive ? "Visible" : "Hidden"}
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
    </div>
  );
}
