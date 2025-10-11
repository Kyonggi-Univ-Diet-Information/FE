import Link from 'next/link';
import React from 'react';

interface NavigationButtonProps {
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function NavigationButton({
  href,
  disabled,
  children,
}: NavigationButtonProps) {
  if (disabled) {
    return (
      <span className='cursor-not-allowed rounded-full border border-gray-200 bg-gray-100 p-1.5 text-sm font-medium text-gray-400'>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href || '#'}
      className='rounded-full border border-gray-300 bg-white p-1.5 text-sm font-medium hover:bg-gray-50'
    >
      {children}
    </Link>
  );
}
