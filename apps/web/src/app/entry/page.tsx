'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/ui';

export default function EntryPage() {
  return (
    <main className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F9FAFB] px-6'>
      <div className='bg-point/10 pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full blur-[120px]' />
      <div className='pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-orange-100 blur-[120px]' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className='z-10 flex w-full max-w-[440px] flex-col items-center'
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='relative mb-12 cursor-pointer'
        >
          <div className='bg-point/5 absolute inset-0 -m-4 rounded-[40px] blur-xl' />
          <div className='bg-point flex size-24 items-center justify-center rounded-[32px] shadow-2xl shadow-orange-200'>
            <span className='font-brBold text-3xl text-white'>기밥</span>
          </div>
        </motion.div>

        <div className='mb-12 text-center'>
          <h1 className='font-brBold mb-3 text-3xl tracking-tight text-gray-900'>
            기룡아 밥먹자!
          </h1>
          <p className='text-balance text-base leading-relaxed text-gray-500'>
            내 주변 맛집부터 식사 메이트까지,
            <br />
            지금 <span className='text-point font-semibold'>기밥</span>과 함께
            시작하세요.
          </p>
        </div>

        <div className='w-full rounded-[32px] bg-white/60 p-8 ring-1 ring-gray-100 backdrop-blur-xl'>
          <p className='mb-6 text-center text-sm font-medium text-gray-400'>
            SNS 계정으로 3초만에 시작하기
          </p>

          <div className='flex flex-col gap-3'>
            <Button
              variant='kakao'
              className='h-14 w-full rounded-2xl border-none bg-[#FEE500] text-base font-semibold text-[#191919] transition-all hover:bg-[#FEE500]/90 active:scale-[0.98]'
            >
              <Image
                src='/icons/icon-kakao.svg'
                alt='kakao'
                width={20}
                height={20}
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
            className='mt-8 w-full cursor-pointer text-center text-sm font-medium text-gray-500 underline underline-offset-4 hover:text-gray-900 hover:underline'
          >
            <Link href='/' replace>
              로그인 없이 둘러보기
            </Link>
          </motion.button>
        </div>

        <p className='mt-12 text-xs text-gray-400'>
          시작 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
        </p>
      </motion.div>
    </main>
  );
}
