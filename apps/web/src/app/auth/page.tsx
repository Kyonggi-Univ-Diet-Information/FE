'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import { useSocialCode } from '@/features/login/hooks';

import { Button, Loader } from '@/shared/ui';

function AuthContent() {
  const { isLoading, error } = useSocialCode();

  return (
    <section className='grid size-full place-items-center'>
      {isLoading && (
        <div>
          <Loader />
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

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <section className='grid size-full place-items-center'>
          <div>
            <Loader />
          </div>
        </section>
      }
    >
      <AuthContent />
    </Suspense>
  );
}

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className='w-full text-center text-xl'>{children}</p>;
};
