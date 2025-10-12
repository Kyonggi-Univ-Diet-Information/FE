'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button, Loader } from '@/components/common';

import { handleKakaoLogin } from '@/features/auth/action';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (code) {
      login();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const login = async () => {
    if (!code) {
      setError(true);
      return;
    }

    setIsLoading(true);
    try {
      const result = await handleKakaoLogin(code);

      if (result.success) {
        router.replace('/');
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='grid size-full place-items-center'>
      {isLoading && (
        <div>
          <Loader />
          <Description>로그인 중...</Description>
        </div>
      )}
      {error && (
        <div className='flex h-fit w-fit flex-col gap-y-2'>
          <Description>로그인에 실패했습니다.</Description>
          <Link href='/'>
            <Button variant='outline' size='lg'>
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className='w-full text-center text-xl'>{children}</p>;
};
