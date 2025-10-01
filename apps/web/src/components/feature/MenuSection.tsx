import React, { ReactNode } from 'react';

export default function MenuSection({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-4'>{children}</div>;
}

function MenuHeader({ children }: { children: ReactNode }) {
  return <div className='flex items-baseline justify-between'>{children}</div>;
}

function MenuContent({ children }: { children: ReactNode }) {
  return (
    <div className='scrollbar-hide flex max-w-full gap-4 overflow-x-scroll'>
      {children}
    </div>
  );
}

MenuSection.Header = MenuHeader;
MenuSection.Content = MenuContent;
