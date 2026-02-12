'use client';

import type { ReactNode } from 'react';
import { Header } from './header';

type PageWrapperProps = {
  children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-8">{children}</div>
      </main>
    </div>
  );
}
