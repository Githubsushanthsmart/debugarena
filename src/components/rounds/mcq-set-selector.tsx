'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type McqSetSelectorProps = {
  onSelectSet: (set: 'A' | 'B') => void;
};

export function McqSetSelector({ onSelectSet }: McqSetSelectorProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background via-gray-900/50 to-background">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center">
            Choose Your Question Set
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <Button onClick={() => onSelectSet('A')} className="text-lg py-6 px-12">
            Set A
          </Button>
          <Button onClick={() => onSelectSet('B')} variant="secondary" className="text-lg py-6 px-12">
            Set B
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
