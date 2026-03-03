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
import { Play, Send } from 'lucide-react';
import { useAntiCheat } from '@/hooks/use-anti-cheat';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import type { Team, FinalProblem } from '@/lib/types';

export function FinalRoundView() {
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [problem, setProblem] = useState<FinalProblem | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('Click "Run Code" to see the output here.');
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isSolutionCorrect, setIsSolutionCorrect] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  // Set Start Time exactly when rules are accepted and the problem is assigned
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

    const teamData = localStorage.getItem('currentTeam');
    const team: Team | null = teamData ? JSON.parse(teamData) : null;
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
  }, [rulesAccepted]);

  const handleRunCode = () => {
    if (!problem) return;
    setIsRunning(true);
    setOutput('Running Java tests...');

    setTimeout(() => {
      let isCorrect = false;
      if (problem.id === 'fin-1') {
        isCorrect = code.includes('intValue()') || (code.includes('Integer') && code.includes('null'));
      } else if (problem.id === 'fin-2') {
        isCorrect = code.includes('fast != null && fast.next != null');
      } else if (problem.id === 'fin-3') {
        isCorrect = code.includes('Math.max') && code.includes('nums[0]');
      }

      if (isCorrect) {
        setOutput('Success! All test cases passed.');
      } else {
        setOutput('Error: Your solution did not pass verification.');
      }
      setIsRunning(false);
    }, 100);
  };

  const endRound = useCallback(
    (isCorrect: boolean) => {
      const finishTime = Date.now();
      const durationMs = startTimeRef.current ? finishTime - startTimeRef.current : 0;
      const durationStr = formatDuration(durationMs);
      const score = isCorrect ? 200 : 0;
      const timestamp = new Date().toLocaleTimeString();
      const teamData = localStorage.getItem('currentTeam');
      
      if (teamData) {
        const currentTeam: Team = JSON.parse(teamData);
        const leaderboardStr = localStorage.getItem('liveLeaderboard');
        let leaderboard: Team[] = leaderboardStr ? JSON.parse(leaderboardStr) : [];
        const teamIndex = leaderboard.findIndex((t) => t.id === currentTeam.id);
        
        if (teamIndex !== -1) {
          const team = leaderboard[teamIndex];
          team.round3Score = score;
          team.round3Time = durationStr;
          team.score = (team.round1Score || 0) + (team.round2Score || 0) + (team.round3Score || 0);
          team.timeTaken = timestamp;
          
          localStorage.setItem('currentTeam', JSON.stringify(team));
        }

        localStorage.setItem('liveLeaderboard', JSON.stringify(leaderboard));
      }

      const completedRounds = JSON.parse(localStorage.getItem('completedRounds') || '[]');
      if (!completedRounds.includes('3')) {
        completedRounds.push('3');
        localStorage.setItem('completedRounds', JSON.stringify(completedRounds));
      }
      router.push('/dashboard');
    },
    [router]
  );
  
  const handleSubmit = useCallback(() => {
    if (!problem) return;
    
    let isCorrect = false;
    if (problem.id === 'fin-1') {
      isCorrect = code.includes('intValue()') || (code.includes('Integer') && code.includes('null'));
    } else if (problem.id === 'fin-2') {
      isCorrect = code.includes('fast != null && fast.next != null');
    } else if (problem.id === 'fin-3') {
      isCorrect = code.includes('Math.max') && code.includes('nums[0]');
    }

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
        <Card className="w-full max-w-4xl animate-fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-center">Final Round</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-6">
              <div className="prose prose-invert max-w-none font-body text-muted-foreground">
                <p><strong>Time Limit:</strong> 25 minutes.</p>
                <p>Your completion time will be recorded for tie-breaking.</p>
              </div>
            </ScrollArea>
            <Button onClick={() => setRulesAccepted(true)} className="w-full mt-8">Start Round</Button>
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
        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="font-headline text-primary">{problem.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-6">
            <ScrollArea className="h-full">
              <div className="prose prose-invert max-w-none font-body">
                <div dangerouslySetInnerHTML={{ __html: problem.problemStatement.replace(/\n/g, '<br/>') }} />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-lg border">
            <Select defaultValue="java" disabled>
              <SelectTrigger className="w-[180px] bg-background"><SelectValue placeholder="Select Language" /></SelectTrigger>
              <SelectContent><SelectItem value="java">Java</SelectItem></SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="secondary" onClick={handleRunCode} disabled={isRunning}>
              <Play className="mr-2 h-4 w-4" /> Run
            </Button>
            <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Send className="mr-2 h-4 w-4" /> Submit
            </Button>
          </div>
          <div className="flex-1 grid grid-rows-2 gap-4 overflow-hidden">
             <CodeEditor code={code} onCodeChange={setCode} language="java" />
            <Card className="flex flex-col border-primary/20 shadow-xl overflow-hidden">
              <CardContent className="flex-1 bg-black/40 p-4 overflow-auto font-mono">
                <pre className={`text-sm whitespace-pre-wrap ${output.includes('Success') ? 'text-green-400' : 'text-blue-200'}`}>{output}</pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-headline">Final Submission Received</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              The competition is now complete. Your results have been recorded.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => endRound(isSolutionCorrect)}>Finish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
