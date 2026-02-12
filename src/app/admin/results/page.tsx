import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockLeaderboard } from "@/lib/mock-data";
import { Download } from "lucide-react";

export default function AdminResultsPage() {

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Live Leaderboard</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Team Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaderboard.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.rank}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.college}</TableCell>
                  <TableCell>{team.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
