'use client';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AuthForm() {
  const router = useRouter();

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd handle Firebase auth here.
    // On successful login/registration, redirect to the dashboard.
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center text-center">
      <Code2 className="h-12 w-12 text-primary" />
      <h1 className="text-4xl font-headline font-bold mt-4">DebugArena</h1>
      <p className="text-muted-foreground mt-2 mb-8">
        The Ultimate Online Debugging Competition
      </p>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Team Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Team Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the competition.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="team@example.com"
                    required
                  />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Login to Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>New Team Registration</CardTitle>
              <CardDescription>
                Fill out the form to register your team for the event.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input id="team-name" placeholder="The Bug Slayers" required />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="college-name">College Name</Label>
                  <Input id="college-name" placeholder="Tech University" required />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="team@example.com"
                    required
                  />
                </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Register and Proceed
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
