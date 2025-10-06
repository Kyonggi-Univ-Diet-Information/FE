import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export default function MenuCard({
  href,
  children,
  className,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          className,
          'flex min-w-60 flex-shrink-0 flex-col gap-2 overflow-hidden rounded-2xl bg-gray-100/50 p-4 transition-all duration-300 hover:bg-gray-100 active:bg-gray-100',
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        className,
        'flex min-w-60 flex-shrink-0 flex-col gap-2 overflow-hidden rounded-2xl bg-gray-100/50 p-4',
      )}
    >
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
