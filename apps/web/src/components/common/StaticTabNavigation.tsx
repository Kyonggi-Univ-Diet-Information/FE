import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';

interface StaticTabNavigationProps {
  tabs: Array<{
    key: string;
    label: string;
    href: string;
  }>;
  className?: string;
  currentTabKey: string;
}

export default function StaticTabNavigation({
  tabs,
  className,
  currentTabKey,
}: StaticTabNavigationProps) {
  return (
    <div
      className={cn(
        'scrollbar-hide flex h-fit flex-shrink-0 flex-wrap gap-2',
        className,
      )}
    >
      {tabs.map(tab => (
        <Link
          key={tab.key}
          href={tab.href}
          replace
          className={cn(
            'cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
            currentTabKey === tab.key
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
