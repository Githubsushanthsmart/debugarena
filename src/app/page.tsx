import { AuthForm } from '@/components/auth/auth-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-gray-900/50 to-background">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </main>
  );
}
