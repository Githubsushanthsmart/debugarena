'use client';

import { PageWrapper } from '@/components/layout/page-wrapper';
import { RoundCard } from '@/components/dashboard/round-card';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore, useDoc, useCollection, useMemoFirebase, useUser } from '@/firebase';
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
  const { isUserLoading: isAuthLoading, user } = useUser();
  const [teamId, setTeamId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('currentTeamId');
    if (!id && !isAuthLoading) {
      router.replace('/register');
    } else {
      setTeamId(id);
    }
  }, [router, isAuthLoading]);

  const teamRef = useMemoFirebase(() => teamId ? doc(db, 'teams', teamId) : null, [db, teamId]);
  const { data: team, isLoading: isTeamLoading } = useDoc<Team>(teamRef);

  const roundsColRef = useMemoFirebase(() => user ? collection(db, 'competitionRounds') : null, [db, user]);
  const { data: adminRounds, isLoading: isRoundsLoading } = useCollection(roundsColRef);

  const [displayRounds, setDisplayRounds] = useState(initialRounds);

  useEffect(() => {
    if (!team) return;

    const isRound1Done = !!(team.round1Time);
    const isRound2Done = !!(team.round2Time);
    const isRound3Done = !!(team.round3Time);

    const newRounds = initialRounds.map((r) => {
      const adminConfig = adminRounds?.find((ar: any) => ar.id === String(r.round));
      let status: 'Locked' | 'Unlocked' | 'Completed' = 'Locked';
      
      if (r.round === 1) {
        if (isRound1Done) status = 'Completed';
        else status = (adminConfig?.isLocked) ? 'Locked' : 'Unlocked';
      } 
      else if (r.round === 2) {
        if (isRound2Done) status = 'Completed';
        else if (isRound1Done) {
          status = (adminConfig?.isLocked) ? 'Locked' : 'Unlocked';
        } else {
          status = 'Locked';
        }
      } 
      else if (r.round === 3) {
        if (isRound3Done) status = 'Completed';
        else if (isRound2Done) {
          status = (adminConfig?.isLocked) ? 'Locked' : 'Unlocked';
        } else {
          status = 'Locked';
        }
      }

      return { ...r, status };
    });

    const filteredRounds = newRounds.filter(r => {
      const adminConfig = adminRounds?.find((ar: any) => ar.id === String(r.round));
      return adminConfig ? adminConfig.isActive : true;
    });

    setDisplayRounds(filteredRounds);
  }, [team, adminRounds]);

  if (isAuthLoading || isTeamLoading || isRoundsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!team) return null;

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
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
