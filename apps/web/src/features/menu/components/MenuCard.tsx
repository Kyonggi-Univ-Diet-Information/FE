import React, { ReactNode } from 'react';

export default function MenuCard({ children }: { children: ReactNode }) {
  return (
    <div className='h-70 flex min-w-60 cursor-pointer flex-col gap-2 overflow-hidden rounded-2xl bg-gray-100/50 p-4 transition-all duration-300 active:bg-gray-100'>
      {children}
    </div>
  );
}

function MenuCardHeader({ children }: { children: ReactNode }) {
  return <p className='font-semibold'>{children}</p>;
}

function MenuCardContent({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-1'>{children}</div>;
}

MenuCard.Header = MenuCardHeader;
MenuCard.Content = MenuCardContent;
