'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type RoundConfig = {
  id: number;
  title: string;
  isLocked: boolean;
  isActive: boolean;
};

const DEFAULT_ROUNDS: RoundConfig[] = [
  { id: 1, title: 'MCQ Round', isLocked: false, isActive: true },
  { id: 2, title: 'Debugging Round', isLocked: true, isActive: false },
  { id: 3, title: 'Final Round', isLocked: true, isActive: false },
];

export default function AdminRoundsPage() {
  const [rounds, setRounds] = useState<RoundConfig[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem('competitionRounds');
    if (stored) {
      setRounds(JSON.parse(stored));
    } else {
      setRounds(DEFAULT_ROUNDS);
      localStorage.setItem('competitionRounds', JSON.stringify(DEFAULT_ROUNDS));
    }
  }, []);

  const updateRounds = (newRounds: RoundConfig[]) => {
    setRounds(newRounds);
    localStorage.setItem('competitionRounds', JSON.stringify(newRounds));
    toast({
      title: "Settings Updated",
      description: "Round status has been updated successfully.",
    });
  };

  const toggleLocked = (id: number) => {
    const newRounds = rounds.map(r => 
      r.id === id ? { ...r, isLocked: !r.isLocked } : r
    );
    updateRounds(newRounds);
  };

  const toggleActive = (id: number) => {
    const newRounds = rounds.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    );
    updateRounds(newRounds);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Configure Rounds</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Round Access Control</CardTitle>
        </CardHeader>
        <CardContent>
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
              {rounds.map((round) => (
                <TableRow key={round.id}>
                  <TableCell className="font-medium">{round.title}</TableCell>
                  <TableCell>
                    <Badge variant={round.isActive ? "default" : "secondary"}>
                      {round.isActive ? "Live" : "Inactive"}
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
                        {round.isActive ? "Active" : "Hidden"}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}