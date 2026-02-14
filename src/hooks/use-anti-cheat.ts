'use client';
import { useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Team } from '@/lib/types';

export const useAntiCheat = (
  onWarning: (warningCount: number) => void,
  maxWarnings = 3
) => {
  const { toast } = useToast();
  const warningCount = useRef(0);
  const isEnabled = useRef(true);

  const handleDisqualification = useCallback(() => {
    const teamDataStr = localStorage.getItem('currentTeam');
    if (!teamDataStr) return;

    const team: Team = JSON.parse(teamDataStr);
    
    // Add to disqualified list
    const disqualifiedTeamsStr = localStorage.getItem('disqualifiedTeams');
    const disqualifiedTeams: Team[] = disqualifiedTeamsStr ? JSON.parse(disqualifiedTeamsStr) : [];
    if (!disqualifiedTeams.some(t => t.id === team.id)) {
        disqualifiedTeams.push(team);
        localStorage.setItem('disqualifiedTeams', JSON.stringify(disqualifiedTeams));
    }

    // Remove from live leaderboard
    const leaderboardStr = localStorage.getItem('liveLeaderboard');
    if (leaderboardStr) {
      let leaderboard: Team[] = JSON.parse(leaderboardStr);
      leaderboard = leaderboard.filter(t => t.id !== team.id);
      localStorage.setItem('liveLeaderboard', JSON.stringify(leaderboard));
    }
  }, []);

  const showWarning = useCallback((message: string) => {
    if (!isEnabled.current) return;

    warningCount.current += 1;
    toast({
      variant: 'destructive',
      title: `Warning ${warningCount.current}/${maxWarnings}`,
      description: message,
    });
    
    if (warningCount.current >= maxWarnings) {
        isEnabled.current = false;
        handleDisqualification();
    }
    
    onWarning(warningCount.current);

  }, [toast, maxWarnings, onWarning, handleDisqualification]);


  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showWarning('Right-click is disabled during the competition.');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'v')) ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i')
      ) {
        e.preventDefault();
        showWarning('This browser action is disabled.');
      }
    };

    const handleBlur = () => {
      // This detects when the user switches tabs or windows
      showWarning('Switching tabs or windows is not allowed.');
    };
    
    // Disable copy-paste from events as an extra layer
    const disableAction = (e: Event) => e.preventDefault();
    document.addEventListener('copy', disableAction);
    document.addEventListener('paste', disableAction);
    document.addEventListener('cut', disableAction);
    
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('copy', disableAction);
      document.removeEventListener('paste', disableAction);
      document.removeEventListener('cut', disableAction);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
    };
  }, [showWarning]);
};
