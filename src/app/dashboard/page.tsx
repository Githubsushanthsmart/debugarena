'use client';

import { PageWrapper } from '@/components/layout/page-wrapper';
import { RoundCard } from '@/components/dashboard/round-card';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import type { Team } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const initialRounds = [
  {
    round: 1,
    title: 'MCQ Round',
    description: '15 minutes to answer 20 multiple-choice questions.',
    status: 'Locked' as const,
    icon: 'ListChecks',
    href: '/round/1',
  },
  {
    round: 2,
    title: 'Debugging Round',
    description: '15 minutes to find and fix bugs in the given code.',
    status: 'Locked' as const,
    icon: 'FileCode2',
    href: '/round/2',
  },
  {
    round: 3,
    title: 'Final Round',
    description: '25 minutes to solve the final coding challenge.',
    status: 'Locked' as const,
    icon: 'Trophy',
    href: '/round/3',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const db = useFirestore();
  const [teamId, setTeamId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('currentTeamId');
    if (!id) {
      router.replace('/register');
    } else {
      setTeamId(id);
    }
  }, [router]);

  const teamRef = useMemoFirebase(() => teamId ? doc(db, 'teams', teamId) : null, [db, teamId]);
  const { data: team, isLoading: isTeamLoading } = useDoc<Team>(teamRef);

  const roundsColRef = useMemoFirebase(() => collection(db, 'competitionRounds'), [db]);
  const { data: adminRounds, isLoading: isRoundsLoading } = useCollection(roundsColRef);

  const [displayRounds, setDisplayRounds] = useState(initialRounds);

  useEffect(() => {
    if (!team) return;

    const completedRounds = [];
    if (team.round1Score !== undefined && team.round1Time) completedRounds.push('1');
    if (team.round2Score !== undefined && team.round2Time) completedRounds.push('2');
    if (team.round3Score !== undefined && team.round3Time) completedRounds.push('3');

    const newRounds = initialRounds.map((r) => {
      const adminConfig = adminRounds?.find((ar: any) => ar.id === String(r.round));

      if (completedRounds.includes(String(r.round))) {
        return { ...r, status: 'Completed' as const };
      }

      if (adminConfig && adminConfig.isLocked) {
        return { ...r, status: 'Locked' as const };
      }

      if (
        r.round === 1 ||
        (completedRounds.includes(String(r.round - 1)) &&
          !completedRounds.includes(String(r.round)))
      ) {
        return { ...r, status: 'Unlocked' as const };
      }
      return r;
    });

    const filteredRounds = newRounds.filter(r => {
      const adminConfig = adminRounds?.find((ar: any) => ar.id === String(r.round));
      return adminConfig ? adminConfig.isActive : true;
    });

    setDisplayRounds(filteredRounds);
  }, [team, adminRounds]);

  if (isTeamLoading || isRoundsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!team) return null;

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
        {displayRounds.map((round) => (
          <RoundCard key={round.round} {...round} />
        ))}
      </div>
    </PageWrapper>
  );
}
