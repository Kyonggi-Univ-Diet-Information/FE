import React from 'react';
import Link from 'next/link';

import { AuthButton } from '@/features/auth/components';

export default function Header() {
  return (
    <header className='fixed top-0 z-50 flex h-14 w-full border-b border-gray-100 bg-white py-8'>
      <div className='mx-auto flex w-full max-w-[770px] items-center justify-between px-4'>
        <Link href='/' className='flex cursor-pointer items-baseline gap-2'>
          <span className='font-brBold text-2xl font-bold'>기밥</span>
          <span className='font-brRegular hidden md:block'>기룡아 밥먹자</span>
        </Link>
        <div className='flex items-center gap-4'>
          <button className='font-tossFace cursor-pointer text-2xl'>✉️</button>
          <button className='font-tossFace cursor-pointer text-2xl'>🇰🇷</button>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
