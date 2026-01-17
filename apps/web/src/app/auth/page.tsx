'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Suspense } from 'react';

import { useSocialCode } from '@/features/login/hooks';

import { Button, Loader } from '@/shared/ui';

function AuthContent() {
  const { isLoading, error } = useSocialCode();

  return (
    <main className='relative inset-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F9FAFB]'>
      <div className='pointer-events-none absolute -bottom-24 -right-24 h-[500px] w-screen rounded-full bg-orange-100 blur-[120px]' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className='z-20 w-full max-w-[400px] px-6'
      >
        <div className='rounded-[32px] bg-white/80 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] ring-1 ring-black/5 backdrop-blur-2xl'>
          <div className='flex flex-col items-center text-center'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-point mb-6 flex size-16 items-center justify-center rounded-2xl shadow-lg shadow-orange-200'
            >
              <span className='font-brBold text-xl text-white'>기밥</span>
            </motion.div>

            {isLoading ? (
              <div className='flex flex-col items-center gap-y-4 py-8'>
                <Loader />
                <p className='font-medium text-gray-500'>로그인 처리 중입니다...</p>
              </div>
            ) : error ? (
              <div className='flex flex-col items-center gap-y-6'>
                <div>
                  <h1 className='font-brBold mb-2 text-2xl tracking-tight text-gray-900'>
                    로그인 실패
                  </h1>
                  <p className='text-balance text-sm leading-relaxed text-gray-500'>
                    로그인 처리 중 문제가 발생했습니다.
                    <br />
                    잠시 후 다시 시도해 주세요.
                  </p>
                </div>
                <Link href='/' className='w-full'>
                  <Button variant='primary' size='lg' className='w-full rounded-2xl py-6 font-semibold shadow-lg shadow-orange-100'>
                    홈으로 돌아가기
                  </Button>
                </Link>
              </div>
            ) : (
              <div className='flex flex-col items-center gap-y-6'>
                <div>
                  <h1 className='font-brBold mb-2 text-2xl tracking-tight text-gray-900'>
                    잘못된 접근
                  </h1>
                  <p className='text-balance text-sm leading-relaxed text-gray-500'>
                    요청하신 페이지를 찾을 수 없거나
                    <br />
                    잘못된 접근입니다.
                  </p>
                </div>
                <Link href='/' className='w-full'>
                  <Button variant='outline' size='lg' className='w-full rounded-2xl py-6 font-semibold'>
                    홈으로 돌아가기
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <main className='relative inset-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F9FAFB]'>
          <Loader />
        </main>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
