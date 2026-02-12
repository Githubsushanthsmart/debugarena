import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ListChecks, FileCode2, Trophy } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { title: 'Teams Registered', value: '20', icon: Users, color: 'text-blue-400' },
  { title: 'MCQs Added', value: '40', icon: ListChecks, color: 'text-green-400' },
  { title: 'Debug Problems', value: '10', icon: FileCode2, color: 'text-yellow-400' },
  { title: 'Rounds Configured', value: '3', icon: Trophy, color: 'text-purple-400' },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard" target="_blank">View Live Site</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                Total count
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="outline" asChild><Link href="/admin/mcqs">Manage MCQs</Link></Button>
          <Button variant="outline" asChild><Link href="/admin/problems">Manage Problems</Link></Button>
          <Button variant="outline" asChild><Link href="/admin/rounds">Configure Rounds</Link></Button>
          <Button variant="outline" asChild><Link href="/admin/results">View Leaderboard</Link></Button>
        </CardContent>
      </Card>
    </div>
  );
}
