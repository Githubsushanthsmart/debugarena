'use client';

import { useCallback } from 'react';
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
import { mockFinalProblem } from '@/lib/mock-data';
import { Play, Send } from 'lucide-react';
import { useAntiCheat } from '@/hooks/use-anti-cheat';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

export function FinalRoundView() {
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    alert('Submitting final solution...');
    const completedRounds = JSON.parse(localStorage.getItem('completedRounds') || '[]');
    if (!completedRounds.includes('3')) {
        completedRounds.push('3');
        localStorage.setItem('completedRounds', JSON.stringify(completedRounds));
    }
    router.push('/leaderboard');
  }, [router]);

  const handleFinish = useCallback(() => {
    alert('Time is up!');
    handleSubmit();
  }, [handleSubmit]);
  
  const handleWarning = useCallback((warningCount: number) => {
    if (warningCount >= 3) {
      alert('You have reached the maximum number of warnings. Your test will be submitted automatically.');
      handleSubmit();
    }
  }, [handleSubmit]);

  useAntiCheat(handleWarning);


  const problem = mockFinalProblem;

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
                <p className="text-muted-foreground">Read the problem statement carefully and fix the buggy code provided.</p>
                <div dangerouslySetInnerHTML={{ __html: problem.problemStatement.replace(/\n/g, '<br/>') }} />
                <h3 className="font-headline">Buggy Code:</h3>
                <div className="bg-background rounded-md p-4 text-sm border">
                    <pre><code>{problem.buggyCode}</code></pre>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Panel: Editor & Console */}
        <div className="flex flex-col gap-4 overflow-hidden">
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
            <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Send className="mr-2 h-4 w-4" /> Submit
            </Button>
          </div>
          <div className="flex-1 grid grid-rows-2 gap-4 overflow-hidden">
            <CodeEditor initialCode={problem.buggyCode} language="python" />
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-lg">Output Console</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 bg-background rounded-b-md p-4 overflow-auto">
                <pre className="text-sm text-muted-foreground">Click "Run Code" to see the output here.</pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
