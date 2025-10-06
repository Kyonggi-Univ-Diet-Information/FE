import React, { ReactNode } from 'react';

export default function MenuSection({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-4'>{children}</div>;
}

function MenuHeader({
  children,
  title,
  subtitle,
  action,
}: {
  children?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col gap-1'>
        {title && <div className='text-xl font-bold'>{title}</div>}
        {subtitle && <div className='text-sm text-gray-600'>{subtitle}</div>}
        {children}
      </div>
      {action}
    </div>
  );
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
