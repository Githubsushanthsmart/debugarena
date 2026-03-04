'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Code2,
  ChevronDown,
  LogOut,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Team } from '@/lib/types';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const db = useFirestore();

  const teamId = typeof window !== 'undefined' ? localStorage.getItem('currentTeamId') : null;
  const teamRef = useMemoFirebase(() => teamId ? doc(db, 'teams', teamId) : null, [db, teamId]);
  const { data: team } = useDoc<Team>(teamRef);

  const navLinks = [{ href: '/dashboard', label: 'Dashboard' }];

  if (!team) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-4">
          <div className="mr-4 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">DebugArena</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const teamNameInitials = team.name
    .split(' ')
    .map((s) => s[0])
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('currentTeamId');
    router.push('/register');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        <div className="mr-4 flex items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">DebugArena</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-9 px-2 md:px-4">
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    src={`https://picsum.photos/seed/${team.id}/32/32`}
                  />
                  <AvatarFallback>{teamNameInitials}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline max-w-[150px] truncate">{team.name}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <p className="font-bold truncate">{team.name}</p>
                <p className="text-xs text-muted-foreground font-normal truncate">
                  {team.college}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-default focus:bg-transparent">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {team.members?.join(', ')}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
