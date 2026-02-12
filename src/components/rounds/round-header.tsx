'use client';
import { Button } from '@/components/ui/button';
import { Countdown } from '@/components/shared/countdown';
import { Flag } from 'lucide-react';

type RoundHeaderProps = {
  round: number;
  title: string;
  countdownDuration: number;
  onFinish: () => void;
};

export function RoundHeader({ round, title, countdownDuration, onFinish }: RoundHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4">
        <div className="flex-1 flex items-center">
          <div className="mr-6 hidden sm:block">
            <span className="font-bold text-primary font-headline">R{round}</span>
          </div>
          <h1 className="text-lg font-semibold font-headline">{title}</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Countdown durationInSeconds={countdownDuration} onFinish={onFinish} />
        </div>
        <div className="flex-1 flex items-center justify-end">
          <Button variant="destructive" onClick={onFinish}>
            <Flag className="mr-2 h-4 w-4" />
            Finish Round
          </Button>
        </div>
      </div>
    </header>
  );
}
