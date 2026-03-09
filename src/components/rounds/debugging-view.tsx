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
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export function DebuggingView() {
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const router = useRouter();
  const db = useFirestore();
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

  const validateCode = (userCode: string, problemId: string): boolean => {
    const normalized = userCode.replace(/\s+/g, '').replace(/#.*$/gm, '').replace(/\/\/.*/g, '');
    
    switch (problemId) {
      // PYTHON PROBLEMS
      case 'dbg-py-1': return !normalized.includes('avg=85.0') && normalized.includes('returnavg');
      case 'dbg-py-2': return !normalized.includes("open(filename,'r')") && normalized.includes('scores=[85,92,78,95,88]');
      case 'dbg-py-3': return !normalized.includes('batch[i+1]') && normalized.includes('processed.append(item*2)');
      case 'dbg-py-4': return normalized.includes('ifcartisNone:cart=[]');
      case 'dbg-py-5': return normalized.includes('len(line.split())');
      case 'dbg-py-6': return normalized.includes('protocol,rest=url.split') || normalized.includes('split(\'://\',1)');
      case 'dbg-py-7': return !normalized.includes('time.time()-time.time()') && normalized.includes('rate=(current-previous)/1.0');
      
      // NEW JAVA PROBLEMS
      case 'dbg-java-1': return normalized.includes('y=2') || normalized.includes('y!=0');
      case 'dbg-java-2': return normalized.includes('i<3') || normalized.includes('i<=2');
      case 'dbg-java-3': return normalized.includes('returnb');
      case 'dbg-java-4': return normalized.includes('inti;for(i=0');
      case 'dbg-java-5': return normalized.includes('catch(ArithmeticExceptione)') || normalized.includes('catch(Exceptione)');
      case 'dbg-java-6': return normalized.includes('int[]arr={1,2,3}') || normalized.includes('newint[]{1,2,3}');
      case 'dbg-java-7': return !normalized.includes('}break;');
      case 'dbg-java-8': return normalized.includes('i<books.size()') && normalized.includes('Librarylib=newLibrary()') && normalized.includes('if(choice==4)break');
      
      default: return false;
    }
  };

  const handleRunCode = () => {
    if (!problem) return;
    setIsRunning(true);
    setOutput('Compiling and running tests...');

    setTimeout(() => {
      const isCorrect = validateCode(code, problem.id);

      if (code.replace(/\s+/g, '') === problem.buggyCode.replace(/\s+/g, '')) {
        setOutput(problem.buggyOutput || 'Error: Output does not match the expected result.');
      } else if (isCorrect) {
        let finalOutput = 'Success! All test cases passed.\n\nOutput:\n';
        if (problem.id === 'dbg-py-1') finalOutput += '85.0';
        else if (problem.id === 'dbg-py-2') finalOutput += '[True, True, False, True, True]\nAverage: 87.6';
        else if (problem.id === 'dbg-py-3') finalOutput += '[[300], [400, 600]]';
        else if (problem.id === 'dbg-py-4') finalOutput += 'Added Laptop, Total: $999.99\nAdded Mouse, Total: $25.99';
        else if (problem.id === 'dbg-py-5') finalOutput += 'Words in file: 8';
        else if (problem.id === 'dbg-py-6') finalOutput += 'http://example.com/api/users';
        else if (problem.id === 'dbg-py-7') finalOutput += 'discharging';
        else if (problem.id === 'dbg-java-1') finalOutput += 'Before\n5';
        else if (problem.id === 'dbg-java-2') finalOutput += '123';
        else if (problem.id === 'dbg-java-3') finalOutput += '20';
        else if (problem.id === 'dbg-java-4') finalOutput += '0123';
        else if (problem.id === 'dbg-java-5') finalOutput += 'Error';
        else if (problem.id === 'dbg-java-6') finalOutput += '1';
        else if (problem.id === 'dbg-java-7') finalOutput += '012';
        else if (problem.id === 'dbg-java-8') finalOutput += '1. Display 2. Issue 3. Return 4. Exit\n1\nJava Basics - Available\nData Structures - Available\nAlgorithms - Available\n1. Display 2. Issue 3. Return 4. Exit\n2\nBook index: 0\n1. Display 2. Issue 3. Return 4. Exit\n1\nJava Basics - Issued\nData Structures - Available\nAlgorithms - Available';
        else finalOutput += 'Program executed successfully.';
        
        setOutput(finalOutput);
      } else {
        setOutput('Runtime Error: Logical mismatch detected. Your output does not match the expected results. Keep debugging!');
      }
      setIsRunning(false);
    }, 400);
  };

  const endRound = useCallback(
    (isCorrect: boolean) => {
      if (!team || !teamRef) return;

      const finishTime = Date.now();
      const durationMs = startTimeRef.current ? finishTime - startTimeRef.current : 0;
      const durationStr = formatDuration(durationMs);
      const score = isCorrect ? 100 : 0;
      const timestamp = new Date().toLocaleTimeString();
      
      updateDocumentNonBlocking(teamRef, {
        round2Score: score,
        round2Time: durationStr,
        score: (team.round1Score || 0) + score + (team.round3Score || 0),
        timeTaken: timestamp
      });

      router.push('/dashboard');
    },
    [router, team, teamRef]
  );

  const handleSubmit = () => {
    if (!problem) return;
    const isCorrect = validateCode(code, problem.id);
    setIsSolutionCorrect(isCorrect);
    setShowResultDialog(true);
  };

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
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xl font-headline text-foreground">
                    <FileCode2 className="h-5 w-5 text-accent" />
                    <h3>4. Output Must Match Exactly</h3>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Program output must match the expected output exactly.</li>
                  </ul>
                </section>
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
