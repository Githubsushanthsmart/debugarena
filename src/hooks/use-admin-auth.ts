'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const useAdminAuth = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // We are on the client, and we can check localStorage
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

    if (!isAuthenticated && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [router, pathname]);
};
