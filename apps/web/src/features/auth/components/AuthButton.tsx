'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common';
import { useAuth } from '../hooks';
import { logout } from '../action';
import { useTranslations } from 'next-intl';

export function AuthButton() {
  const { isAuthenticated, isLoading, refresh } = useAuth();
  const router = useRouter();
  const t = useTranslations('auth');

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
        {t('loading')}
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <Button variant='outline' size='sm' onClick={handleLogout}>
        {t('logout')}
      </Button>
    );
  }

  return (
    <Link href='/auth/login' prefetch>
      <Button variant='outline' size='sm'>
        {t('login')}
      </Button>
    </Link>
  );
}
