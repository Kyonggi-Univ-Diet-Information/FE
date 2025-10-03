'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface TabNavigationProps {
  tabs: Array<{
    key: string;
    label: string;
    href: string;
  }>;
  className?: string;
}

export default function TabNavigation({ tabs, className }: TabNavigationProps) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('restaurant') || tabs[0]?.key;

  return (
    <div className={cn('flex gap-2 overflow-x-auto pb-2', className)}>
      {tabs.map(tab => (
        <Link
          key={tab.key}
          href={tab.href}
          className={cn(
            'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
            currentTab === tab.key
              ? 'bg-point text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
