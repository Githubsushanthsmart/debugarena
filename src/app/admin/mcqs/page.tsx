import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockMcqSetA, mockMcqSetB } from "@/lib/mock-data";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function AdminMcqsPage() {
  const allMcqs = [
    ...mockMcqSetA.map(q => ({ ...q, set: 'A' })),
    ...mockMcqSetB.map(q => ({ ...q, set: 'B' }))
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Manage MCQs</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add MCQ
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question Bank ({allMcqs.length} Questions)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Set</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allMcqs.map((mcq) => (
                <TableRow key={mcq.id}>
                  <TableCell className="font-medium max-w-lg truncate">{mcq.question}</TableCell>
                  <TableCell>
                    <Badge variant={mcq.set === 'A' ? 'default' : 'secondary'}>
                      Set {mcq.set}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
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
