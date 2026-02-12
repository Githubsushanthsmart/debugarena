'use client';

import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';

interface CodeEditorProps {
  initialCode: string;
  language: 'python' | 'java';
}

export function CodeEditor({ initialCode, language }: CodeEditorProps) {
  // This is a placeholder for the Monaco Editor.
  // In a real implementation, you would use the `monaco-editor` package here.
  return (
    <Card className="flex-1 flex flex-col w-full h-full">
      <Textarea
        defaultValue={initialCode}
        className="flex-1 w-full h-full font-code text-base bg-background border-0 rounded-md resize-none focus-visible:ring-1 focus-visible:ring-primary"
        placeholder={`Write your ${language} code here...`}
      />
    </Card>
  );
}
