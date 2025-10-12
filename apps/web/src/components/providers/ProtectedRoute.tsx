'use client';

import { useRouter } from 'next/navigation';

import { useEffect, type ReactNode } from 'react';

import { Loader } from '../common';

import { useAuth } from '@/features/auth/hooks';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className='grid size-full place-items-center'>
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
