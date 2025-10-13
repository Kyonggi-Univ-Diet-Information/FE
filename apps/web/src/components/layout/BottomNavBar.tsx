'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';

export default function BottomNavBar() {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const locale = useLocale();

  const navItems = [
    {
      href: '/campus',
      label: t('campus'),
      iconDefault: '/icons/icon-restaurant2-default.svg',
      iconActive: '/icons/icon-restaurant2.svg',
      alt: 'restaurant2',
    },
    {
      href: '/dorm',
      label: t('dorm'),
      iconDefault: '/icons/icon-restaurant1-default.svg',
      iconActive: '/icons/icon-restaurant1.svg',
      alt: 'restaurant1',
    },
    {
      href: '/',
      label: t('home'),
      iconDefault: '/icons/icon-home-default.svg',
      iconActive: '/icons/icon-home.svg',
      alt: 'home',
    },
    {
      href: '/review',
      label: t('review'),
      iconDefault: '/icons/icon-review-default.svg',
      iconActive: '/icons/icon-review.svg',
      alt: 'review',
    },
    {
      href: '/user',
      label: t('myPage'),
      iconDefault: '/icons/icon-user-default.svg',
      iconActive: '/icons/icon-user.svg',
      alt: 'user',
    },
  ];

  // locale을 제외한 경로의 길이로 체크
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  if (pathWithoutLocale.split('/').length > 2) {
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
            : pathWithoutLocale.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className='flex flex-col items-center'
          >
            <div className='relative size-8'>
              <Image
                src={isActive ? item.iconActive : item.iconDefault}
                fill
                alt={item.alt}
              />
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
