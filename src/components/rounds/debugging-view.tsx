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
import { mockDebuggingProblem } from '@/lib/mock-data';
import { Play, Send } from 'lucide-react';
import { useAntiCheat } from '@/hooks/use-anti-cheat';
import { useRouter } from 'next/navigation';

export function DebuggingView() {
  const router = useRouter();

  const handleFinish = useCallback(() => {
    alert('Time is up!');
    router.push('/dashboard');
  }, [router]);
  
  const handleWarning = useCallback((warningCount: number) => {
    if (warningCount >= 3) {
      alert('You have reached the maximum number of warnings. Your test will be submitted automatically.');
      router.push('/dashboard');
    }
  }, [router]);

  useAntiCheat(handleWarning);


  const problem = mockDebuggingProblem;

  return (
    <div className="flex flex-col h-screen font-code">
      <RoundHeader
        round={2}
        title="Debugging Round"
        countdownDuration={15 * 60}
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
              <p className="font-body text-muted-foreground">{problem.description}</p>
              <div className="flex-1 bg-background rounded-md p-4 overflow-auto text-sm border">
                <pre><code>{problem.buggyCode}</code></pre>
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
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Send className="mr-2 h-4 w-4" /> Submit
            </Button>
          </div>
          <div className="flex-1 grid grid-rows-2 gap-4">
            <CodeEditor initialCode={problem.buggyCode} language={problem.language} />
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
