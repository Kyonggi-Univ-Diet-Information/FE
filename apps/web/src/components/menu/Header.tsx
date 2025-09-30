'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

export default function Header() {
  const isLoggedIn = false;

  return (
    <header className='bg-border fixed top-0 z-50 flex h-14 w-full items-center justify-between p-8'>
      <p className='flex items-baseline gap-2'>
        <span className='font-brBold text-2xl font-bold'>기밥</span>
        <span className='font-brRegular hidden md:block'>기룡아 밥먹자</span>
      </p>

      {isLoggedIn ? (
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Button variant='outline' size='sm' onClick={() => alert('clicked')}>
          로그인
        </Button>
      )}
    </header>
  );
}
