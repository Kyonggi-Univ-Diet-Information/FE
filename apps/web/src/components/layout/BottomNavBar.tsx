'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

export default function BottomNavBar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/campus',
      label: '경슐랭',
      iconDefault: '/icons/icon-restaurant2-default.svg',
      iconActive: '/icons/icon-restaurant2.svg',
      alt: 'restaurant2',
    },
    {
      href: '/dorm',
      label: '기숙사',
      iconDefault: '/icons/icon-restaurant1-default.svg',
      iconActive: '/icons/icon-restaurant1.svg',
      alt: 'restaurant1',
    },
    {
      href: '/',
      label: '홈',
      iconDefault: '/icons/icon-home-default.svg',
      iconActive: '/icons/icon-home.svg',
      alt: 'home',
    },
    {
      href: '/review',
      label: '리뷰',
      iconDefault: '/icons/icon-review-default.svg',
      iconActive: '/icons/icon-review.svg',
      alt: 'review',
    },
    {
      href: '/user',
      label: '마이',
      iconDefault: '/icons/icon-user-default.svg',
      iconActive: '/icons/icon-user.svg',
      alt: 'user',
    },
  ];

  if (pathname.split('/').length > 2) {
    return null;
  }

  if (pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <motion.div
      className='shadow-t-md fixed bottom-0 flex w-full items-center justify-between rounded-t-2xl border-t border-gray-100 bg-white px-8 pb-4 pt-2 sm:px-14 md:hidden'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {navItems.map(item => {
        const isActive =
          item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

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
