'use client';

import { useCallback, useState } from 'react';
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
import { mockFinalProblem } from '@/lib/mock-data';
import { Play, Send } from 'lucide-react';
import { useAntiCheat } from '@/hooks/use-anti-cheat';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import type { Team } from '@/lib/types';

export function FinalRoundView() {
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [code, setCode] = useState(mockFinalProblem.buggyCode);
  const [output, setOutput] = useState(
    'Click "Run Code" to see the output here.'
  );
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isSolutionCorrect, setIsSolutionCorrect] = useState(false);

  const problem = mockFinalProblem;

  const handleRunCode = () => {
    if (!problem) return;

    const normalizedUserCode = code.replace(/\s+/g, '');
    const normalizedBuggyCode = problem.buggyCode.replace(/\s+/g, '');
    const normalizedSolutionCode = problem.solutionCode.replace(/\s+/g, '');

    if (normalizedUserCode === normalizedBuggyCode) {
      setOutput(
        problem.buggyOutput ||
          'The initial code has bugs. Running it produces an error or incorrect output.'
      );
    } else if (normalizedUserCode === normalizedSolutionCode) {
      setOutput('Success! The code seems to be correct and runs without errors.');
    } else {
      setOutput(
        'Executing your modified code...\n\nThis is a simulation. If the code is still buggy, it may produce an incorrect output. Keep debugging!'
      );
    }
  };

  const endRound = useCallback(
    (isCorrect: boolean) => {
      // Final round could be worth more, e.g., 200 points
      const score = isCorrect ? 200 : 0;

      const teamData = localStorage.getItem('currentTeam');
      if (teamData) {
        const currentTeam: Team = JSON.parse(teamData);
        const newTotalScore = (currentTeam.score || 0) + score;

        const leaderboardStr = localStorage.getItem('liveLeaderboard');
        let leaderboard: Team[] = leaderboardStr
          ? JSON.parse(leaderboardStr)
          : [];

        const teamIndex = leaderboard.findIndex((t) => t.id === currentTeam.id);
        if (teamIndex !== -1) {
          leaderboard[teamIndex].score = newTotalScore;
        }

        localStorage.setItem('liveLeaderboard', JSON.stringify(leaderboard));
        localStorage.setItem(
          'currentTeam',
          JSON.stringify({ ...currentTeam, score: newTotalScore })
        );
      }

      const completedRounds = JSON.parse(
        localStorage.getItem('completedRounds') || '[]'
      );
      if (!completedRounds.includes('3')) {
        completedRounds.push('3');
        localStorage.setItem('completedRounds', JSON.stringify(completedRounds));
      }
      router.push('/dashboard');
    },
    [router]
  );
  
  const handleSubmit = () => {
    // A simple way to check correctness is to remove all whitespace and compare.
    const isCorrect =
      code.replace(/\s+/g, '') === problem.solutionCode.replace(/\s+/g, '');
    setIsSolutionCorrect(isCorrect);
    setShowResultDialog(true);
  };
  
  const handleDialogContinue = () => {
    setShowResultDialog(false);
    endRound(isSolutionCorrect);
  };

  const handleFinish = useCallback(() => {
    toast({ title: "Time's Up!", description: "Submitting your final solution automatically."});
    endRound(false);
  }, [endRound, toast]);

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
            <CardTitle className="font-headline text-3xl text-center">
              Final Round – Official Rules & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-6">
              <div className="prose prose-invert max-w-none font-body text-muted-foreground">
                <h3>1. Time Limit Rule</h3>
                <p>
                  <strong>Rule:</strong> Each team will be given 25 minutes to
                  solve the final problem.
                </p>
                <h4>Details:</h4>
                <ul>
                  <li>1 final problem.</li>
                  <li>
                    The problem contains intentional syntax, logical, or
                    runtime errors.
                  </li>
                  <li>Submission after time ends will not be accepted.</li>
                </ul>
                <p>
                  <strong>Why?</strong> Tests pressure handling and real-time
                  problem-solving ability.
                </p>

                <hr />

                <h3>2. No Internet / No AI Rule</h3>
                <p>
                  <strong>Rule:</strong> Participants are not allowed to use:
                </p>
                <ul>
                  <li>Internet</li>
                  <li>ChatGPT or any AI tools</li>
                  <li>Stack Overflow</li>
                  <li>External code editors (if restricted)</li>
                </ul>
                <h4>Allowed:</h4>
                <ul>
                  <li>Offline IDE (Eclipse, VS Code, IntelliJ, etc.)</li>
                  <li>Compiler</li>
                  <li>Built-in documentation (optional)</li>
                </ul>
                <p>
                  <strong>Why?</strong> Ensures fair competition and checks actual
                  debugging skills.
                </p>

                <hr />

                <h3>3. No Changing Logic Rule</h3>
                <p>
                  <strong>Rule:</strong> Participants must fix only errors, not
                  rewrite the entire program.
                </p>
                <h4>Details:</h4>
                <ul>
                  <li>
                    They should correct syntax, logical, or runtime errors.
                  </li>
                  <li>
                    Major logic modification will lead to disqualification or
                    marks deduction.
                  </li>
                </ul>
                <p>
                  <strong>Why?</strong> Debugging means fixing — not redesigning.
                </p>

                <hr />

                <h3>4. Output Must Match Exactly</h3>
                <p>
                  <strong>Rule:</strong> Program output must match the expected
                  output exactly.
                </p>
                <h4>Details:</h4>
                <ul>
                  <li>Case-sensitive (if programming language requires).</li>
                  <li>Format matters (spacing, punctuation).</li>
                  <li>Extra print statements → marks deduction.</li>
                </ul>
                <p>
                  <strong>Why?</strong> Checks attention to detail.
                </p>

                <hr />

                <h3>5. Marking Criteria Rule</h3>
                <p>You can divide marks like this:</p>
                <table>
                  <thead>
                    <tr>
                      <th>Criteria</th>
                      <th>Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Syntax Error Fix</td>
                      <td>30%</td>
                    </tr>
                    <tr>
                      <td>Logical Error Fix</td>
                      <td>30%</td>
                    </tr>
                    <tr>
                      <td>Runtime Error Fix</td>
                      <td>20%</td>
                    </tr>
                    <tr>
                      <td>Code Cleanliness</td>
                      <td>10%</td>
                    </tr>
                    <tr>
                      <td>Time of Submission</td>
                      <td>10%</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  <strong>Bonus:</strong> First correct submission gets extra
                  points.
                </p>

                <hr />

                <h3>6. Team Formation Rule</h3>
                <p>
                  <strong>Rule:</strong>
                </p>
                <ul>
                  <li>Maximum 2–3 members per team.</li>
                  <li>Cross-college teams allowed (optional).</li>
                  <li>One laptop per team.</li>
                </ul>
                <p>
                  <strong>Why?</strong> Encourages teamwork but prevents crowd
                  coding.
                </p>

                <hr />

                <h3>7. Tie-Breaker Rule 🏆</h3>
                <p>If two teams get equal marks:</p>
                <ol>
                  <li>Earlier submission wins.</li>
                  <li>Fewer compilation attempts wins.</li>
                  <li>Bonus surprise debugging question (5 minutes).</li>
                </ol>

                <hr />

                <h3>Extra Professional Rules</h3>
                <ul>
                  <li>
                    No plagiarism (checking through manual observation).
                  </li>
                  <li>Phones must be kept aside.</li>
                  <li>Any misconduct → immediate disqualification.</li>
                  <li>Only provided problem files should be used.</li>
                </ul>
              </div>
            </ScrollArea>
            <Button
              onClick={() => setRulesAccepted(true)}
              className="w-full mt-8"
            >
              I Understand and Agree, Start Round
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen font-code">
      <RoundHeader
        round={3}
        title="Final Round"
        countdownDuration={25 * 60}
        onFinish={handleFinish}
      />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        {/* Left Panel: Problem */}
        <Card className="flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle className="font-headline">{problem.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <ScrollArea className="h-full pr-4">
              <div className="prose prose-invert max-w-none font-body">
                <p className="text-muted-foreground">
                  Read the problem statement carefully and fix the buggy code
                  provided.
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: problem.problemStatement.replace(/\n/g, '<br/>'),
                  }}
                />
                <h3 className="font-headline">Buggy Code:</h3>
                <div className="bg-background rounded-md p-4 text-sm border">
                  <pre>
                    <code>{problem.buggyCode}</code>
                  </pre>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Panel: Editor & Console */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center gap-4">
            <Select defaultValue="python" disabled>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="secondary" onClick={handleRunCode}>
              <Play className="mr-2 h-4 w-4" /> Run Code
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Send className="mr-2 h-4 w-4" /> Submit
            </Button>
          </div>
          <div className="flex-1 grid grid-rows-2 gap-4 overflow-hidden">
            <CodeEditor
              code={code}
              onCodeChange={setCode}
              language="python"
            />
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-lg">
                  Output Console
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 bg-background rounded-b-md p-4 overflow-auto">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {output}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
       <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Submission Received
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your solution has been submitted. The competition is now over. You will be redirected back to the dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogContinue}>
              Continue to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
