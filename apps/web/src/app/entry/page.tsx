'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

import { EntryLogoSection, EntryPolicySection } from '@/page/entry/ui';

import { LoginSection } from '@/features/login/ui';

import { AuthCard, AuthPageWrapper } from '@/shared/ui';

export default function EntryPage() {
  return (
    <AuthPageWrapper showTopGradient showBottomGradient>
      <EntryLogoSection />

      <AuthCard maxWidth={500} initialY={100} className='rounded-none p-0! ring-0! shadow-none!'>
        <div className='z-20 w-full max-w-[500px]'>
          <div className='rounded-t-[42px] bg-white/80 p-8 pt-4 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)] ring-1 ring-black/5 backdrop-blur-2xl'>
            <div className='mx-auto mb-8 h-1.5 w-12 rounded-full bg-gray-200' />

            <p className='mb-6 text-center text-sm font-medium text-gray-400'>
              SNS 계정으로 3초만에 시작하기!
            </p>

            <LoginSection />

            <motion.button
              whileHover={{ y: -1 }}
              className='mt-8 w-full cursor-pointer text-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900'
            >
              <Link href='/' replace className='underline underline-offset-4'>
                로그인 없이 둘러보기
              </Link>
            </motion.button>

            <EntryPolicySection />
          </div>
        </div>
      </AuthCard>
    </AuthPageWrapper>
  );
}
