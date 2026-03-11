'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import { RoundHeader } from './round-header';
import { CodeEditor } from '@/components/shared/code-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { mockFinalProblems } from '@/lib/mock-data';
import { Play, Send, ShieldAlert, Timer, Trophy, AlertCircle, FileCode2, Zap, Target } from 'lucide-react';
import { useAntiCheat } from '@/hooks/use-anti-cheat';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import type { Team, FinalProblem } from '@/lib/types';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export function FinalRoundView() {
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const router = useRouter();
  const db = useFirestore();
  const { toast } = useToast();
  const [problem, setProblem] = useState<FinalProblem | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('Click "Run Code" to see the output here.');
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isSolutionCorrect, setIsSolutionCorrect] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  const teamId = typeof window !== 'undefined' ? localStorage.getItem('currentTeamId') : null;
  const teamRef = useMemoFirebase(() => teamId ? doc(db, 'teams', teamId) : null, [db, teamId]);
  const { data: team } = useDoc<Team>(teamRef);

  useEffect(() => {
    if (rulesAccepted && problem && !startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
  }, [rulesAccepted, problem]);

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!rulesAccepted) return;

    const assignedId = localStorage.getItem(`assignedFinalProblemId_${team?.id || 'anon'}`);
    let selectedProblem: FinalProblem | undefined;

    if (assignedId) {
      selectedProblem = mockFinalProblems.find(p => p.id === assignedId);
    }

    if (!selectedProblem) {
      if (team) {
        const hash = team.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        selectedProblem = mockFinalProblems[hash % mockFinalProblems.length];
      } else {
        selectedProblem = mockFinalProblems[Math.floor(Math.random() * mockFinalProblems.length)];
      }
      
      if (selectedProblem) {
        localStorage.setItem(`assignedFinalProblemId_${team?.id || 'anon'}`, selectedProblem.id);
      }
    }

    if (selectedProblem) {
      setProblem(selectedProblem);
      setCode(selectedProblem.buggyCode);
    }
  }, [rulesAccepted, team]);

  const validateSolution = (userCode: string, probId: string): boolean => {
    const normalized = userCode.replace(/\s+/g, '');
    
    switch (probId) {
      case 'fin-1': // Bank Account
        return normalized.includes('deposit(self,amount):') && 
               normalized.includes('ifamount>self.balance:') &&
               normalized.includes('else:');
      case 'fin-2': // Library Management
        return normalized.includes('ifbook_nameinbooks:') && 
               normalized.includes('else:');
      case 'fin-3': // Student Result
        return normalized.includes('intmarks[]={85,72,91};') && 
               normalized.includes('Grade:A");') &&
               normalized.includes('Grade:B");');
      default:
        return false;
    }
  };

  const handleRunCode = () => {
    if (!problem) return;
    setIsRunning(true);
    setOutput('Compiling and running tests...');

    setTimeout(() => {
      const isCorrect = validateSolution(code, problem.id);

      if (isCorrect) {
        let finalOutput = 'Success! All test cases passed.\n\nOutput:\n';
        if (problem.id === 'fin-1') finalOutput += 'Deposited: 500\nWithdrawn: 300\nAccount Holder: Your Name\nBalance: 1200';
        else if (problem.id === 'fin-2') finalOutput += 'Python borrowed successfully\nJava borrowed successfully\nAvailable books: [\'C++\', \'AI\']\nPython returned successfully\nAvailable books: [\'C++\', \'AI\', \'Python\']';
        else if (problem.id === 'fin-3') finalOutput += 'Enter Any Three Names Grade: B\nEnter Any Three Names Grade: C\nEnter Any Three Names Grade: A';
        
        setOutput(finalOutput);
        setIsSolutionCorrect(true);
      } else {
        setOutput('Runtime Error: Logical mismatch detected. Check your syntax and colons/semicolons carefully.');
        setIsSolutionCorrect(false);
      }
      setIsRunning(false);
    }, 600);
  };

  const endRound = useCallback(
    (isCorrect: boolean) => {
      if (!team || !teamRef) return;

      const finishTime = Date.now();
      const durationMs = startTimeRef.current ? finishTime - startTimeRef.current : 0;
      const durationStr = formatDuration(durationMs);
      const score = isCorrect ? 200 : 0;
      const timestamp = new Date().toLocaleTimeString();
      
      updateDocumentNonBlocking(teamRef, {
        round3Score: score,
        round3Time: durationStr,
        score: (team.round1Score || 0) + (team.round2Score || 0) + score,
        timeTaken: timestamp
      });

      router.push('/dashboard');
    },
    [router, team, teamRef]
  );
  
  const handleSubmit = useCallback(() => {
    if (!problem) return;
    const isCorrect = validateSolution(code, problem.id);
    setIsSolutionCorrect(isCorrect);
    setShowResultDialog(true);
  }, [code, problem]);
  
  const handleFinish = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const handleWarning = useCallback(
    (warningCount: number) => {
      if (warningCount >= 3) {
        endRound(false);
      }
    },
    [endRound]
  );

  useAntiCheat(handleWarning);

  if (!rulesAccepted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-gray-900/50 to-background p-4">
        <Card className="w-full max-w-4xl animate-fade-in border-primary/20 shadow-2xl">
          <CardHeader className="text-center border-b bg-muted/30 pb-8">
            <Badge className="mx-auto mb-2 w-fit bg-accent/20 text-accent hover:bg-accent/30 font-bold tracking-widest">FINAL ROUND</Badge>
            <CardTitle className="font-headline text-4xl text-primary mb-2">
              Championship Round (HARD)
            </CardTitle>
            <p className="text-muted-foreground italic">Find the best debugger. This is where champions are made.</p>
          </CardHeader>
          <CardContent className="pt-8">
            <ScrollArea className="h-[55vh] pr-6">
              <div className="space-y-8 font-body">
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <h3>Purpose: The Ultimate Challenge</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Tests mastery over complex algorithms and real-world system debugging.</li>
                    <li><strong>Time:</strong> 25 minutes. Final, non-negotiable deadline.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Target className="h-5 w-5 text-accent" />
                    <h3>Round Guidelines</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Hidden Test Cases:</strong> Unlike previous rounds, test cases are strictly hidden and harder.</li>
                    <li><strong>Strict Logic Check:</strong> High-level errors (Login systems, Sort/Search algorithms).</li>
                  </ul>
                </section>
              </div>
            </ScrollArea>
            <Button onClick={() => setRulesAccepted(true)} className="w-full mt-8 text-lg py-7 font-headline font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 transition-all duration-300">
              Enter The Championship
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!problem) return null;

  return (
    <div className="flex flex-col h-screen font-code">
      <RoundHeader round={3} title="Final Round" countdownDuration={25 * 60} onFinish={handleFinish} />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        <Card className="flex flex-col overflow-hidden border-primary/10 shadow-lg">
          <CardHeader className="bg-muted/30 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline text-primary">{problem.title}</CardTitle>
              <Badge className="bg-primary/10 text-primary border-primary/20">Difficulty: Hard</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-6">
            <ScrollArea className="h-full">
              <div className="prose prose-invert max-w-none font-body">
                <p className="whitespace-pre-wrap">{problem.problemStatement}</p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-lg border border-primary/10 shadow-md">
            <Select value={problem.language} disabled>
              <SelectTrigger className="w-[180px] bg-background border-primary/10"><SelectValue placeholder="Select Language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="secondary" onClick={handleRunCode} disabled={isRunning} className="shadow-sm">
              <Play className="mr-2 h-4 w-4" /> {isRunning ? 'Checking...' : 'Run Tests'}
            </Button>
            <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm">
              <Send className="mr-2 h-4 w-4" /> Submit Solution
            </Button>
          </div>
          <div className="flex-1 grid grid-rows-2 gap-4 overflow-hidden">
             <CodeEditor code={code} onCodeChange={setCode} language={problem.language} />
            <Card className="flex flex-col border-primary/20 shadow-xl overflow-hidden bg-black/20">
              <CardHeader className="py-2 px-4 border-b bg-muted/20">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  <FileCode2 className="h-3 w-3" /> System Console
                </div>
              </CardHeader>
              <CardContent className="flex-1 bg-black/40 p-4 overflow-auto font-mono">
                <pre className={`text-sm whitespace-pre-wrap ${output.includes('Success') ? 'text-green-400' : 'text-blue-200'}`}>{output}</pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent className="border-primary/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-headline text-primary">Final Submission Received</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              Congratulations! The competition is now complete for your team. Your final results have been recorded in the cloud leaderboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => endRound(isSolutionCorrect)} className="bg-primary hover:bg-primary/90">
              Finish & Return to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full border uppercase tracking-wider", className)}>
    {children}
  </div>
);

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
