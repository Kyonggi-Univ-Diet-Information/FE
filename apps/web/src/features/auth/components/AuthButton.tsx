'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui';

import { useAuth } from '../hooks';
import { logout } from '../lib/logout';

export function AuthButton() {
  const { isAuthenticated, isLoading, refresh } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      await refresh();
      router.push('/');
    }
  };

  if (isLoading) {
    return (
      <Button variant='outline' size='sm' disabled>
        로딩 중...
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <Button variant='outline' size='sm' onClick={handleLogout}>
        로그아웃
      </Button>
    );
  }

  return (
    <Link href='/auth/login' prefetch>
      <Button variant='outline' size='sm'>
        로그인
      </Button>
    </Link>
  );
}
