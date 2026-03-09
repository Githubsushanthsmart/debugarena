'use client';

import { useRef } from 'react';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: 'python' | 'java';
}

export function CodeEditor({
  code,
  onCodeChange,
  language,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      // Insert 4 spaces for Tab
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      onCodeChange(newCode);

      // Reset cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }

    if (e.key === 'Enter') {
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const lines = code.substring(0, start).split('\n');
      const currentLine = lines[lines.length - 1];
      
      // Get current indentation (leading whitespace)
      const indentMatch = currentLine.match(/^\s*/);
      const currentIndent = indentMatch ? indentMatch[0] : '';
      
      // Check if we should increase indentation
      let extraIndent = '';
      const trimmedLine = currentLine.trim();
      if (trimmedLine.endsWith(':') || trimmedLine.endsWith('{')) {
        extraIndent = '    ';
      }

      // If we are at the end of a line, handle auto-indent
      e.preventDefault();
      const before = code.substring(0, start);
      const after = code.substring(start);
      const newCode = before + '\n' + currentIndent + extraIndent + after;
      onCodeChange(newCode);

      // Reset cursor position to after the new indent
      setTimeout(() => {
        if (textareaRef.current) {
          const newPos = start + 1 + currentIndent.length + extraIndent.length;
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newPos;
        }
      }, 0);
    }
  };

  return (
    <Card className="flex-1 flex flex-col w-full h-full overflow-hidden border-primary/20 bg-black/40">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-primary/10">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {language} editor
        </span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
      </div>
      <Textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 w-full h-full font-code text-base bg-transparent border-0 rounded-none resize-none focus-visible:ring-0 p-6 leading-relaxed caret-primary selection:bg-primary/20"
        placeholder={`Write your ${language} code here...`}
        spellCheck={false}
      />
    </Card>
  );
}
