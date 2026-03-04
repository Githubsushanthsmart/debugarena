'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code2, Loader2 } from 'lucide-react';
import { useFirestore, useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { Team } from '@/lib/types';

export default function RegisterPage() {
  const router = useRouter();
  const db = useFirestore();
  const auth = useAuth();
  const [teamName, setTeamName] = useState('');
  const [college, setCollege] = useState('');
  const [members, setMembers] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !members.trim() || !college.trim()) return;

    setIsSubmitting(true);
    try {
      // 1. Sign in anonymously to get a stable cross-device ID
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;

      const teamInfo: Team = {
        id: uid,
        name: teamName.trim(),
        members: members.trim().split(',').map((m) => m.trim()),
        college: college.trim(),
        rank: 0,
        score: 0,
        timeTaken: '',
        round1Score: 0,
        round1Time: '',
        round2Score: 0,
        round2Time: '',
        round3Score: 0,
        round3Time: '',
        registeredAt: new Date().toISOString()
      };

      // 2. Save to Firestore for real-time syncing
      const teamRef = doc(db, 'teams', uid);
      setDocumentNonBlocking(teamRef, teamInfo, { merge: true });

      // 3. Keep local copy for immediate session tracking
      localStorage.setItem('currentTeamId', uid);
      
      router.push('/dashboard');
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Code2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">
            DebugArena
          </CardTitle>
          <CardDescription>
            Register your team to start the competition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                placeholder="e.g., The Bug Slayers"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Input
                id="college"
                placeholder="e.g., Institute of Technology"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="members">Member Names (comma-separated)</Label>
              <Input
                id="members"
                placeholder="e.g., John Doe, Jane Smith"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" className="w-full py-6 text-lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Joining...</>
              ) : (
                'Start Competition'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
