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
import { mockDebuggingProblem } from '@/lib/mock-data';
import { Play, Send } from 'lucide-react';
import { useAntiCheat } from '@/hooks/use-anti-cheat';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '../ui/scroll-area';

export function DebuggingView() {
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    alert('Submitting solution...');
    const completedRounds = JSON.parse(
      localStorage.getItem('completedRounds') || '[]'
    );
    if (!completedRounds.includes('2')) {
      completedRounds.push('2');
      localStorage.setItem('completedRounds', JSON.stringify(completedRounds));
    }
    router.push('/dashboard');
  }, [router]);

  const handleFinish = useCallback(() => {
    alert('Time is up!');
    handleSubmit();
  }, [handleSubmit]);

  const handleWarning = useCallback(
    (warningCount: number) => {
      if (warningCount >= 3) {
        alert(
          'You have reached the maximum number of warnings. Your test will be submitted automatically.'
        );
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  useAntiCheat(handleWarning);

  const problem = mockDebuggingProblem;

  if (!rulesAccepted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-gray-900/50 to-background p-4">
        <Card className="w-full max-w-4xl animate-fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-center">
              Debugging Round – Official Rules & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-6">
              <div className="prose prose-invert max-w-none font-body text-muted-foreground">
                <h3>1. Time Limit Rule</h3>
                <p>
                  <strong>Rule:</strong> Each team will be given 60–90 minutes to
                  debug the problems.
                </p>
                <h4>Details:</h4>
                <ul>
                  <li>3–5 debugging questions.</li>
                  <li>
                    Each question contains intentional syntax, logical, or
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
        round={2}
        title="Debugging Round"
        countdownDuration={60 * 60}
        onFinish={handleFinish}
      />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-auto">
        {/* Left Panel: Problem */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">{problem.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <p className="font-body text-muted-foreground">
                {problem.description}
              </p>
              <div className="flex-1 bg-background rounded-md p-4 overflow-auto text-sm border">
                <pre>
                  <code>{problem.buggyCode}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Editor & Console */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Select defaultValue="python">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Button variant="secondary">
              <Play className="mr-2 h-4 w-4" /> Run Code
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Send className="mr-2 h-4 w-4" /> Submit
            </Button>
          </div>
          <div className="flex-1 grid grid-rows-2 gap-4">
            <CodeEditor
              initialCode={problem.buggyCode}
              language={problem.language}
            />
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-lg">
                  Output Console
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 bg-background rounded-b-md p-4 overflow-auto">
                <pre className="text-sm text-muted-foreground">
                  Click "Run Code" to see the output here.
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
