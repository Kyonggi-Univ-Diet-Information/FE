'use client';

import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface TabNavigationProps {
  tabs: Array<{
    key: string;
    label: string;
    href: string;
  }>;
  className?: string;
}

export default function TabNavigation({ tabs, className }: TabNavigationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('restaurant') || tabs[0]?.key;

  const handleTabClick = (href: string) => {
    router.replace(href);
  };

  return (
    <div className={cn('flex gap-2 overflow-x-auto', className)}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => handleTabClick(tab.href)}
          className={cn(
            'cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
            currentTab === tab.key
              ? 'bg-gray-200 text-gray-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
