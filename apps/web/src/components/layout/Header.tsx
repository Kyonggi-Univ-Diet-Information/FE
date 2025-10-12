'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AuthButton } from '@/features/auth/components';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/campus', label: '경슐랭' },
    { href: '/dorm', label: '기숙사' },
    { href: '/review', label: '리뷰' },
    { href: '/user', label: '마이' },
  ];

  return (
    <header className='fixed top-0 z-50 flex h-14 w-full border-b border-gray-100 bg-white py-8'>
      <div className='mx-auto flex w-full max-w-[770px] items-center justify-between px-4'>
        <Link href='/' className='flex cursor-pointer items-baseline gap-2'>
          <span className='font-brBold text-2xl font-bold'>기밥</span>
          <span className='font-brRegular hidden md:block'>기룡아 밥먹자</span>
        </Link>
        <div className='hidden items-baseline gap-4 md:flex'>
          {navItems.map(item => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? 'text-point font-semibold'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className='flex items-center gap-4'>
          <button className='font-tossFace cursor-pointer text-2xl'>✉️</button>
          <button className='font-tossFace cursor-pointer text-2xl'>🇰🇷</button>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
