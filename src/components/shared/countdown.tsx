'use client';

import { useState, useEffect } from 'react';

type CountdownProps = {
  durationInSeconds: number;
  onFinish: () => void;
};

export function Countdown({ durationInSeconds, onFinish }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onFinish]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const isLowTime = timeLeft <= 60;

  return (
    <div className="flex items-center justify-center bg-muted/50 rounded-lg px-4 py-2">
      <div
        className={`font-mono text-2xl font-bold tracking-widest ${
          isLowTime ? 'text-destructive animate-pulse' : 'text-foreground'
        }`}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}
