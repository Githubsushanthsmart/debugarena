'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type McqSetSelectorProps = {
  onSelectSet: (set: 'A' | 'B' | 'C' | 'D') => void;
};

export function McqSetSelector({ onSelectSet }: McqSetSelectorProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background via-gray-900/50 to-background">
      <Card className="w-full max-w-md animate-fade-in shadow-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center">
            Choose Your Question Set
          </CardTitle>
          <p className="text-center text-muted-foreground">Each set contains 20 unique debugging questions.</p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Button onClick={() => onSelectSet('A')} className="text-xl py-8 font-headline">
            Set A
          </Button>
          <Button onClick={() => onSelectSet('B')} variant="secondary" className="text-xl py-8 font-headline">
            Set B
          </Button>
          <Button onClick={() => onSelectSet('C')} variant="outline" className="text-xl py-8 font-headline border-primary/20 hover:bg-primary/10">
            Set C
          </Button>
          <Button onClick={() => onSelectSet('D')} variant="ghost" className="text-xl py-8 font-headline bg-muted/50 hover:bg-muted">
            Set D
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
