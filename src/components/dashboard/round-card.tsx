'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';
import { Lock, PlayCircle, ListChecks, FileCode2, Trophy, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const iconMap: Record<string, LucideIcon> = {
  ListChecks,
  FileCode2,
  Trophy,
};

type RoundCardProps = {
  round: number;
  title: string;
  description: string;
  status: 'Locked' | 'Unlocked' | 'Completed';
  icon: string;
  href: string;
};

export function RoundCard({
  round,
  title,
  description,
  status,
  icon,
  href,
}: RoundCardProps) {
  const router = useRouter();
  const isLocked = status === 'Locked';
  const isCompleted = status === 'Completed';
  const Icon = iconMap[icon];

  return (
    <Card
      className={cn(
        'flex flex-col transition-all hover:shadow-lg',
        (isLocked || isCompleted) && 'bg-muted/30 text-muted-foreground hover:shadow-none'
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge
            variant={isLocked || isCompleted ? 'secondary' : 'default'}
            className={cn(!(isLocked || isCompleted) && 'bg-primary/10 text-primary border-primary/20')}
          >
            Round {round}
          </Badge>
          {Icon && <Icon className={cn('h-6 w-6', (isLocked || isCompleted) ? 'text-muted-foreground' : 'text-primary')} />}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          className={cn('w-full', status === 'Unlocked' && 'bg-accent hover:bg-accent/90 text-accent-foreground')}
          disabled={status !== 'Unlocked'}
          onClick={() => router.push(href)}
        >
          {status === 'Completed' ? (
            <><CheckCircle className="mr-2 h-4 w-4" /> Round Completed</>
          ) : status === 'Locked' ? (
            <><Lock className="mr-2 h-4 w-4" /> Round Locked</>
          ) : (
            <><PlayCircle className="mr-2 h-4 w-4" /> Start Round</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
