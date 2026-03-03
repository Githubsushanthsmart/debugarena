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
import { mockDebuggingProblems } from '@/lib/mock-data';
import { Play, Send, ShieldAlert, Timer, FileCode2, AlertCircle, Ban, Target, Trophy, Scale, Users } from 'lucide-react';
import { useAntiCheat } from '@/hooks/use-anti-cheat';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '../ui/scroll-area';
import type { Team, DebuggingProblem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function DebuggingView() {
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [problem, setProblem] = useState<DebuggingProblem | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(
    'Click "Run Code" to see the output here.'
  );
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isSolutionCorrect, setIsSolutionCorrect] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);

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

  const handleLanguageSelect = (lang: 'python' | 'java') => {
    const allProblemsForLang = mockDebuggingProblems.filter((p) => p.language === lang);
    const assignedProblemIdsStr = localStorage.getItem('assignedDebugProblems');
    let assignedProblemIds: string[] = assignedProblemIdsStr ? JSON.parse(assignedProblemIdsStr) : [];
    let unassignedProblems = allProblemsForLang.filter(p => !assignedProblemIds.includes(p.id));

    if (unassignedProblems.length === 0) {
      unassignedProblems = allProblemsForLang;
      assignedProblemIds = [];
    }
    
    const randomProblem = unassignedProblems[Math.floor(Math.random() * unassignedProblems.length)];
    
    if (randomProblem) {
      assignedProblemIds.push(randomProblem.id);
      localStorage.setItem('assignedDebugProblems', JSON.stringify(assignedProblemIds));
      setProblem(randomProblem);
      setCode(randomProblem.buggyCode);
    }
  };

  const handleRunCode = () => {
    if (!problem) return;
    setIsRunning(true);
    setOutput('Compiling and running tests...');

    setTimeout(() => {
      const normalizedUserCode = code.replace(/\s+/g, '');
      const normalizedBuggyCode = problem.buggyCode.replace(/\s+/g, '');
      const normalizedSolutionCode = problem.solutionCode.replace(/\s+/g, '');

      if (normalizedUserCode === normalizedBuggyCode) {
        setOutput(problem.buggyOutput || 'Error: Output does not match the expected result.');
      } else if (normalizedUserCode === normalizedSolutionCode) {
        setOutput('Success! All test cases passed.\n\nOutput:\nProgram executed successfully.');
      } else {
        setOutput('Runtime Error: Logical mismatch detected. Keep debugging!');
      }
      setIsRunning(false);
    }, 150);
  };

  const endRound = useCallback(
    (isCorrect: boolean) => {
      const finishTime = Date.now();
      const durationMs = startTimeRef.current ? finishTime - startTimeRef.current : 0;
      const durationStr = formatDuration(durationMs);
      const score = isCorrect ? 100 : 0;
      const timestamp = new Date().toLocaleTimeString();
      const teamData = localStorage.getItem('currentTeam');
      
      if (teamData) {
        const currentTeam: Team = JSON.parse(teamData);
        const leaderboardStr = localStorage.getItem('liveLeaderboard');
        let leaderboard: Team[] = leaderboardStr ? JSON.parse(leaderboardStr) : [];
        const teamIndex = leaderboard.findIndex((t) => t.id === currentTeam.id);
        
        if (teamIndex !== -1) {
          const team = leaderboard[teamIndex];
          team.round2Score = score;
          team.round2Time = durationStr;
          team.score = (team.round1Score || 0) + (team.round2Score || 0) + (team.round3Score || 0);
          team.timeTaken = timestamp;
          
          localStorage.setItem('currentTeam', JSON.stringify(team));
        }

        localStorage.setItem('liveLeaderboard', JSON.stringify(leaderboard));
      }

      const completedRounds = JSON.parse(localStorage.getItem('completedRounds') || '[]');
      if (!completedRounds.includes('2')) {
        completedRounds.push('2');
        localStorage.setItem('completedRounds', JSON.stringify(completedRounds));
      }
      router.push('/dashboard');
    },
    [router]
  );

  const handleSubmit = () => {
    if (!problem) return;
    const isCorrect = code.replace(/\s+/g, '') === problem.solutionCode.replace(/\s+/g, '');
    setIsSolutionCorrect(isCorrect);
    setShowResultDialog(true);
  };

  const handleFinish = useCallback(() => {
    endRound(false);
  }, [endRound]);

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
        <Card className="w-full max-w-4xl animate-fade-in border-primary/20">
          <CardHeader className="text-center border-b bg-muted/30 pb-8">
            <Badge className="mx-auto mb-2 w-fit bg-accent/20 text-accent hover:bg-accent/30">ROUND 2</Badge>
            <CardTitle className="font-headline text-4xl text-primary mb-2">
              Debugging Round: Official Rules
            </CardTitle>
            <p className="text-muted-foreground italic">Identify and fix logical errors. Debugging means fixing — not redesigning.</p>
          </CardHeader>
          <CardContent className="pt-8">
            <ScrollArea className="h-[55vh] pr-6">
              <div className="space-y-8 font-body">
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Timer className="h-5 w-5 text-accent" />
                    <h3>1. Time Limit Rule</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Each team will be given <strong>15 - 30 minutes</strong> to debug the problems.</li>
                    <li>Submission after the timer ends will not be accepted.</li>
                    <li>Tests pressure handling and real-time problem-solving ability.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Ban className="h-5 w-5 text-destructive" />
                    <h3>2. No Internet / No AI Rule</h3>
                  </div>
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg">
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li><strong>Prohibited:</strong> Internet, ChatGPT/AI tools, Stack Overflow, External editors.</li>
                      <li><strong>Allowed:</strong> Provided Monaco code editor and built-in compiler results.</li>
                    </ul>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Target className="h-5 w-5 text-primary" />
                    <h3>3. No Changing Logic Rule</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Participants must fix only errors, not rewrite the entire program.</li>
                    <li>Correct syntax, logical, or runtime errors.</li>
                    <li><strong>Major logic modification</strong> will lead to disqualification or marks deduction.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <FileCode2 className="h-5 w-5 text-accent" />
                    <h3>4. Output Must Match Exactly</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Program output must match the expected output <strong>exactly</strong>.</li>
                    <li>Case-sensitive and format-sensitive (spacing, punctuation).</li>
                    <li>Extra print statements may result in marks deduction.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Scale className="h-5 w-5 text-primary" />
                    <h3>5. Marking Criteria</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground border p-4 rounded-lg">
                    <div>Syntax Error Fix: 30%</div>
                    <div>Logical Error Fix: 30%</div>
                    <div>Runtime Error Fix: 20%</div>
                    <div>Code Cleanliness: 10%</div>
                    <div>Time of Submission: 10%</div>
                    <div className="col-span-2 text-accent font-bold">Bonus: First correct submission gets extra points.</div>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Users className="h-5 w-5 text-accent" />
                    <h3>6. Team Formation Rule</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Maximum 2–3 members per team.</li>
                    <li>One laptop per team to prevent crowd coding.</li>
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <h3>7. Tie-Breaker Rule</h3>
                  </div>
                  <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                    <li>Earlier submission wins.</li>
                    <li>Fewer compilation attempts wins.</li>
                    <li>Bonus surprise debugging question (5 minutes) if still tied.</li>
                  </ol>
                </section>

                <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <ShieldAlert className="h-6 w-6 text-accent shrink-0" />
                  <p className="text-sm text-muted-foreground italic">
                    <strong>Extra Professional Rules:</strong> No plagiarism (manual observation active). Phones must be kept aside. Any misconduct leads to immediate disqualification.
                  </p>
                </div>
              </div>
            </ScrollArea>
            <Button onClick={() => setRulesAccepted(true)} className="w-full mt-8 text-lg py-7 font-headline font-bold uppercase tracking-wider bg-primary hover:bg-primary/90">
              I Accept & Start Challenge
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex flex-col h-screen font-code">
        <RoundHeader round={2} title="Debugging Round" countdownDuration={15 * 60} onFinish={handleFinish} />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-gray-900/50 to-background">
          <Card className="w-full max-w-md animate-fade-in">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-center">Choose Your Language</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
              <Button onClick={() => handleLanguageSelect('python')} className="text-lg py-6 px-12">Python</Button>
              <Button onClick={() => handleLanguageSelect('java')} variant="secondary" className="text-lg py-6 px-12">Java</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen font-code">
      <RoundHeader round={2} title="Debugging Round" countdownDuration={15 * 60} onFinish={handleFinish} />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-auto">
        <div className="flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader><CardTitle className="font-headline">{problem.title}</CardTitle></CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <p className="font-body text-muted-foreground">{problem.description}</p>
              <div className="flex-1 bg-background rounded-md p-4 overflow-auto text-sm border">
                <pre><code>{problem.buggyCode}</code></pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Select value={problem.language} disabled>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select Language" /></SelectTrigger>
              <SelectContent><SelectItem value="python">Python</SelectItem><SelectItem value="java">Java</SelectItem></SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="secondary" onClick={handleRunCode} disabled={isRunning}>
              <Play className="mr-2 h-4 w-4" /> {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Send className="mr-2 h-4 w-4" /> Submit
            </Button>
          </div>
          <div className="flex-1 grid grid-rows-2 gap-4">
            <CodeEditor code={code} onCodeChange={setCode} language={problem.language} />
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
            <AlertDialogTitle className="text-2xl font-headline">Round Submitted</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              Your solution has been submitted. The competition continues.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => endRound(isSolutionCorrect)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("px-2 py-0.5 text-xs font-semibold rounded-full border", className)}>
    {children}
  </div>
);

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
