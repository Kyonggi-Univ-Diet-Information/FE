import React, { ReactNode } from 'react';

import { cn } from '@/shared/utils';

export default function Section({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-4'>{children}</div>;
}

function SectionHeader({
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

function SectionContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'scrollbar-hide flex max-w-full gap-4 overflow-x-scroll',
        className,
      )}
    >
      {children}
    </div>
  );
}

Section.Header = SectionHeader;
Section.Content = SectionContent;
