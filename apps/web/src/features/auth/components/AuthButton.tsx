'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Link } from '@/shared/i18n/routing';
import { Button } from '@/shared/ui';

import { logout } from '../action';
import { useAuth } from '../hooks';

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
