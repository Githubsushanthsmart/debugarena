import { PageWrapper } from '@/components/layout/page-wrapper';
import { LeaderboardTable } from '@/components/leaderboard/leaderboard-table';

export default function LeaderboardPage() {
  return (
    <PageWrapper>
      <h1 className="text-3xl font-headline font-bold mb-2">Live Leaderboard</h1>
      <p className="text-muted-foreground mb-8">
        Rankings are updated in real-time. Good luck, teams!
      </p>
      <LeaderboardTable />
    </PageWrapper>
  );
}
