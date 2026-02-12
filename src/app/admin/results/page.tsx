import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockLeaderboard } from "@/lib/mock-data";
import { MoreHorizontal, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AdminResultsPage() {

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Competition Results</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export as CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Final Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaderboard.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.rank}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.college}</TableCell>
                  <TableCell>{team.score}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Manual Override</DropdownMenuLabel>
                        <DropdownMenuItem>Adjust Score</DropdownMenuItem>
                        <DropdownMenuItem>View Submissions</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
