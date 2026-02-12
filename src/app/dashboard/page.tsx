import { PageWrapper } from '@/components/layout/page-wrapper';
import { RoundCard } from '@/components/dashboard/round-card';
import { Button } from '@/components/ui/button';
import { BarChart } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const rounds = [
    {
      round: 1,
      title: 'MCQ Round',
      description: '15 minutes to answer 20 multiple-choice questions.',
      status: 'Unlocked',
      icon: 'ListChecks',
      href: '/round/1',
    },
    {
      round: 2,
      title: 'Debugging Round',
      description: '15 minutes to find and fix bugs in the given code.',
      status: 'Locked',
      icon: 'FileCode2',
      href: '/round/2',
    },
    {
      round: 3,
      title: 'CodeTantra Final',
      description: '25 minutes to solve the final coding challenge.',
      status: 'Locked',
      icon: 'Trophy',
      href: '/round/3',
    },
  ];

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold">
            Welcome, The Bug Slayers!
          </h1>
          <p className="text-muted-foreground">
            The competition is live. Choose a round to begin.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/leaderboard">
            <BarChart className="mr-2 h-4 w-4" />
            View Leaderboard
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rounds.map((round) => (
          <RoundCard key={round.round} {...round} />
        ))}
      </div>
    </PageWrapper>
  );
}
