'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { POLICY_URL } from '@/shared/config';
import { Button } from '@/shared/ui';

export default function EntryPage() {
  return (
    <main className='relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#F9FAFB]'>
      <div className='bg-point/10 pointer-events-none absolute -left-24 -top-24 h-[500px] w-[500px] rounded-full blur-[120px]' />
      <div className='pointer-events-none absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-orange-100 blur-[120px]' />

      <div className='flex flex-1 flex-col items-center justify-center pt-10'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className='flex flex-col items-center'
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='relative mb-8 cursor-pointer'
          >
            <div className='bg-point/10 absolute inset-0 -m-6 rounded-[48px] blur-2xl' />
            <div className='bg-point size-26 flex shrink-0 items-center justify-center rounded-[32px] shadow-2xl shadow-orange-200'>
              <span className='font-brBold text-4xl text-white'>기밥</span>
            </div>
          </motion.div>

          <div className='text-center'>
            <h1 className='font-brBold mb-4 text-3xl tracking-tight text-gray-900'>
              기룡아 밥먹자!
            </h1>
            <p className='text-balance leading-relaxed text-gray-500'>
              내 주변 맛집부터 식사 메이트까지,
              <br />
              <span className='text-point font-semibold'>기밥</span>에서
              시작되는 맛있는 일상
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className='z-20 w-full max-w-[500px]'
      >
        <div className='rounded-t-[42px] bg-white/80 p-8 pt-4 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)] ring-1 ring-black/5 backdrop-blur-2xl'>
          <div className='mx-auto mb-8 h-1.5 w-12 rounded-full bg-gray-200' />

          <p className='mb-6 text-center text-sm font-medium text-gray-400'>
            SNS 계정으로 3초만에 시작하기!
          </p>

          <div className='flex flex-col gap-3.5'>
            <Button
              variant='kakao'
              className='h-14 w-full rounded-2xl border-none bg-[#FEE500] text-base font-semibold text-[#191919] transition-all hover:bg-[#FEE500]/90 active:scale-[0.98]'
            >
              <Image
                src='/icons/icon-kakao.svg'
                alt='kakao'
                width={22}
                height={22}
                className='mr-2'
              />
              카카오로 시작하기
            </Button>

            <Button className='h-14 w-full rounded-2xl bg-black text-base font-semibold text-white transition-all hover:bg-black/90 active:scale-[0.98]'>
              <Image
                src='/icons/icon-apple.svg'
                alt='apple'
                width={40}
                height={40}
                className='mt-[3px] scale-150'
              />
              Apple로 시작하기
            </Button>
          </div>

          <motion.button
            whileHover={{ y: -1 }}
            className='mt-8 w-full cursor-pointer text-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900'
          >
            <Link href='/' replace className='underline underline-offset-4'>
              로그인 없이 둘러보기
            </Link>
          </motion.button>

          <p className='mt-10 text-center text-[11px] leading-relaxed text-gray-400'>
            시작 시{' '}
            <Link
              href={POLICY_URL.TERMS_OF_SERVICE}
              target='_blank'
              className='underline underline-offset-4'
            >
              이용약관
            </Link>{' '}
            및{' '}
            <Link
              href={POLICY_URL.PRIVACY_POLICY}
              target='_blank'
              className='underline underline-offset-4'
            >
              개인정보처리방침
            </Link>
            에 동의하게 됩니다.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
