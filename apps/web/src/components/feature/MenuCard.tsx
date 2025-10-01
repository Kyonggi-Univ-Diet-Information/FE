import React, { ReactNode } from 'react';

export default function MenuCard({ children }: { children: ReactNode }) {
  return (
    <div className='h-70 flex min-w-60 flex-col gap-2 rounded-2xl bg-gray-100/50 p-4'>
      {children}
    </div>
  );
}

function MenuCardHeader({ children }: { children: ReactNode }) {
  return <p className='font-semibold'>{children}</p>;
}

function MenuCardContent({ children }: { children: ReactNode }) {
  return <div className='flex flex-col'>{children}</div>;
}

MenuCard.Header = MenuCardHeader;
MenuCard.Content = MenuCardContent;
