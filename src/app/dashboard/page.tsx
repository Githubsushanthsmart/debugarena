'use client';

import { PageWrapper } from '@/components/layout/page-wrapper';
import { RoundCard } from '@/components/dashboard/round-card';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Team } from '@/lib/types';

const initialRounds = [
  {
    round: 1,
    title: 'MCQ Round',
    description: '20 minutes to answer 20 multiple-choice questions.',
    status: 'Locked',
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

export default function DashboardPage() {
  const router = useRouter();
  const [rounds, setRounds] = useState(initialRounds);
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const teamData = localStorage.getItem('currentTeam');
    if (!teamData) {
      router.replace('/register');
      return;
    }
    setTeam(JSON.parse(teamData));

    const completedRoundsStr = localStorage.getItem('completedRounds');
    const completedRounds = completedRoundsStr
      ? JSON.parse(completedRoundsStr)
      : [];

    const newRounds = initialRounds.map((r) => {
      if (completedRounds.includes(String(r.round))) {
        return { ...r, status: 'Completed' };
      }
      // Unlock current round if previous is completed, or if it's the first round.
      if (
        r.round === 1 ||
        (completedRounds.includes(String(r.round - 1)) &&
          !completedRounds.includes(String(r.round)))
      ) {
        return { ...r, status: 'Unlocked' };
      }
      return r;
    });

    setRounds(newRounds);
  }, [router]);

  if (!team) {
    return null; // or a loading spinner
  }

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold">
            Welcome, {team.name}!
          </h1>
          <p className="text-muted-foreground">
            The competition is live. Choose a round to begin.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rounds.map((round) => (
          <RoundCard key={round.round} {...round} />
        ))}
      </div>
    </PageWrapper>
  );
}
