'use client';

import { useCallback, useState, useEffect } from 'react';
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
  const [output, setOutput] = useState(
    'Click "Run Code" to see the output here.'
  );
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isSolutionCorrect, setIsSolutionCorrect] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (rulesAccepted && !problem) {
      const assignedFinalProblemId = localStorage.getItem('assignedFinalProblemId');
      let assignedProblem: FinalProblem | undefined;

      if (assignedFinalProblemId) {
        assignedProblem = mockFinalProblems.find(p => p.id === assignedFinalProblemId);
      }

      if (!assignedProblem) {
        // Simple random assignment for Final Round
        assignedProblem = mockFinalProblems[Math.floor(Math.random() * mockFinalProblems.length)];
        localStorage.setItem('assignedFinalProblemId', assignedProblem.id);
      }

      setProblem(assignedProblem);
      setCode(assignedProblem.buggyCode);
    }
  }, [rulesAccepted, problem]);

  const handleRunCode = () => {
    if (!problem) return;
    setIsRunning(true);
    setOutput('Compiling and running tests...');

    // Simulate instant execution
    setTimeout(() => {
      const normalizedUserCode = code.replace(/\s+/g, '');
      const normalizedBuggyCode = problem.buggyCode.replace(/\s+/g, '');

      // Validation logic for each problem
      let isCorrect = false;
      if (problem.id === 'fin-1') {
        // Third Max
        isCorrect = code.includes('intValue()') || (code.includes('Integer') && code.includes('null') && code.includes('n == first'));
      } else if (problem.id === 'fin-2') {
        // Detect Cycle
        isCorrect = code.includes('fast != null && fast.next != null');
      } else if (problem.id === 'fin-3') {
        // Max Subarray
        isCorrect = code.includes('Math.max') && code.includes('nums[0]');
      }

      if (normalizedUserCode === normalizedBuggyCode) {
        setOutput(problem.buggyOutput || 'Error: Output does not match the expected result.');
      } else if (isCorrect) {
        setOutput('Success! All test cases passed.\n\nOutput:\nProgram executed successfully with the correct logic for the final challenge.');
      } else {
        setOutput('Compilation Error or Output Mismatch: The logic provided does not handle edge cases correctly. Please ensure you are addressing the specific bugs mentioned in the requirements.');
      }
      setIsRunning(false);
    }, 100);
  };

  const endRound = useCallback(
    (isCorrect: boolean) => {
      const score = isCorrect ? 200 : 0;
      const teamData = localStorage.getItem('currentTeam');
      if (teamData) {
        const currentTeam: Team = JSON.parse(teamData);
        const newTotalScore = (currentTeam.score || 0) + score;

        const leaderboardStr = localStorage.getItem('liveLeaderboard');
        let leaderboard: Team[] = leaderboardStr ? JSON.parse(leaderboardStr) : [];
        const teamIndex = leaderboard.findIndex((t) => t.id === currentTeam.id);
        if (teamIndex !== -1) {
          leaderboard[teamIndex].score = newTotalScore;
        }

        localStorage.setItem('liveLeaderboard', JSON.stringify(leaderboard));
        localStorage.setItem('currentTeam', JSON.stringify({ ...currentTeam, score: newTotalScore }));
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
  
  const handleSubmit = () => {
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
  };
  
  const handleFinish = useCallback(() => {
    toast({ title: "Time's Up!", description: "Submitting your final solution automatically."});
    handleSubmit();
  }, [handleSubmit, toast]);

  const handleWarning = useCallback(
    (warningCount: number) => {
      if (warningCount >= 3) {
        toast({ variant: 'destructive', title: 'Disqualified', description: 'Maximum warnings reached. Your final submission is being recorded.'});
        endRound(false);
      }
    },
    [endRound, toast]
  );

  useAntiCheat(handleWarning);

  if (!rulesAccepted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-gray-900/50 to-background p-4">
        <Card className="w-full max-w-4xl animate-fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-center">Final Round – Official Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-6">
              <div className="prose prose-invert max-w-none font-body text-muted-foreground">
                <p><strong>Rule:</strong> You have 25 minutes to solve the final challenge.</p>
                <p><strong>Switching tabs or windows will result in disqualification after 3 warnings.</strong></p>
                <p>The final problem is worth 200 points.</p>
                <p><strong>Language:</strong> Java</p>
                <p><strong>Challenge:</strong> You will be assigned a specific Java algorithm with a hidden bug. You must fix the code to pass all test cases including edge cases.</p>
              </div>
            </ScrollArea>
            <Button onClick={() => setRulesAccepted(true)} className="w-full mt-8">Start Final Round</Button>
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
          <CardHeader><CardTitle className="font-headline">{problem.title}</CardTitle></CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <ScrollArea className="h-full pr-4">
              <div className="prose prose-invert max-w-none font-body">
                <div dangerouslySetInnerHTML={{ __html: problem.problemStatement.replace(/\n/g, '<br/>') }} />
                <h3 className="font-headline mt-4">Provided Buggy Code:</h3>
                <div className="bg-background rounded-md p-4 text-sm border">
                  <pre><code>{problem.buggyCode}</code></pre>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center gap-4">
            <Select defaultValue="java" disabled>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select Language" /></SelectTrigger>
              <SelectContent><SelectItem value="java">Java</SelectItem></SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="secondary" onClick={handleRunCode} disabled={isRunning}>
              <Play className="mr-2 h-4 w-4" /> {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Send className="mr-2 h-4 w-4" /> Submit
            </Button>
          </div>
          <div className="flex-1 grid grid-rows-2 gap-4 overflow-hidden">
            <CodeEditor code={code} onCodeChange={setCode} language="java" />
            <Card className="flex flex-col">
              <CardHeader><CardTitle className="font-headline text-lg">Output Console</CardTitle></CardHeader>
              <CardContent className="flex-1 bg-background rounded-b-md p-4 overflow-auto">
                <pre className={`text-sm whitespace-pre-wrap ${output.includes('Success') ? 'text-green-400' : 'text-muted-foreground'}`}>{output}</pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-headline">Final Submission Received</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">Your response has been recorded. The competition is now over.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => endRound(isSolutionCorrect)}>Finish Competition</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

