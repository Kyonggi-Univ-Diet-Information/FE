'use client';

import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/shared/i18n/routing';
import Restaurant2 from '../../../public/icons/icon-restaurant2.svg';
import Restaurant1 from '../../../public/icons/icon-restaurant1.svg';
import Home from '../../../public/icons/icon-home.svg';
import Review from '../../../public/icons/icon-review.svg';
import User from '../../../public/icons/icon-user.svg';
import { cn } from '@/shared/utils';

export default function BottomNavBar() {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const locale = useLocale();
  const today = new Date().getDay();

  const navItems = [
    {
      href: '/campus/1',
      label: t('campus'),
      icon: <Restaurant2 width={32} height={32} />,
      alt: 'restaurant2',
    },
    {
      href: `/dorm/${today}`,
      label: t('dorm'),
      icon: <Restaurant1 width={32} height={32} />,
      alt: 'restaurant1',
    },
    {
      href: '/',
      label: t('home'),
      icon: <Home width={32} height={32} />,
      alt: 'home',
    },
    {
      href: '/review',
      label: t('review'),
      icon: <Review width={32} height={32} />,
      alt: 'review',
    },
    {
      href: '/user',
      label: t('myPage'),
      icon: <User width={32} height={32} />,
      alt: 'user',
    },
  ];

  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  if (
    pathWithoutLocale.split('/').length > 2 &&
    !pathWithoutLocale.startsWith('/campus') &&
    !pathWithoutLocale.startsWith('/dorm')
  ) {
    return null;
  }

  if (pathWithoutLocale.startsWith('/auth')) {
    return null;
  }

  return (
    <motion.div
      className='shadow-t-md fixed bottom-0 flex w-full items-center justify-between rounded-t-2xl border-t border-gray-100 bg-white px-8 pb-6 pt-2 sm:px-14 md:hidden'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {navItems.map(item => {
        const isActive =
          item.href === '/'
            ? pathWithoutLocale === '/'
            : pathWithoutLocale.startsWith(`/${item.href.split('/')[1]}`);

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            className='flex flex-col items-center'
          >
            <div className={cn(isActive ? 'text-point' : 'text-gray-400')}>
              {item.icon}
            </div>
            <span
              className={`text-xs ${isActive ? 'text-point' : 'text-gray-400'}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </motion.div>
  );
}
