import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockMcqSetA, mockMcqSetB, mockMcqSetC, mockMcqSetD } from "@/lib/mock-data";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminMcqsPage() {
  const sets = [
    { id: 'A', data: mockMcqSetA },
    { id: 'B', data: mockMcqSetB },
    { id: 'C', data: mockMcqSetC },
    { id: 'D', data: mockMcqSetD }
  ];

  const totalQuestions = sets.reduce((acc, set) => acc + set.data.length, 0);

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Manage MCQs</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add MCQ
        </Button>
      </div>

      <div className="mb-8">
        <p className="text-muted-foreground">Total Questions in Bank: <strong>{totalQuestions}</strong> across 4 sets.</p>
      </div>

      <Tabs defaultValue="A" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-md mb-8">
          <TabsTrigger value="A">Set A</TabsTrigger>
          <TabsTrigger value="B">Set B</TabsTrigger>
          <TabsTrigger value="C">Set C</TabsTrigger>
          <TabsTrigger value="D">Set D</TabsTrigger>
        </TabsList>

        {sets.map((set) => (
          <TabsContent key={set.id} value={set.id}>
            <Card>
              <CardHeader>
                <CardTitle>Question Set {set.id} ({set.data.length} Questions)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Answer</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {set.data.map((mcq, idx) => (
                      <TableRow key={mcq.id}>
                        <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                        <TableCell className="font-medium max-w-lg truncate">{mcq.question}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                             {String.fromCharCode(65 + mcq.correctAnswerIndex)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
