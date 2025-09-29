'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

export default function Header() {
  const isLoggedIn = false;

  return (
    <header className='flex h-14 w-full items-center justify-between bg-green-300 p-4'>
      <span className='font-sans font-bold'>Let&apos;s eat, Kiryong!</span>
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
