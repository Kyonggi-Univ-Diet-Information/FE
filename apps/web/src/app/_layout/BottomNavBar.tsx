'use client';

import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

import {
  FOOD_COURT_RESTAURANTS,
  RESTAURANT_ID_BY_NAME,
} from '@/entities/campus-menu/model/campusRestaurant';

import { FOOD_COURT_ID } from '@/shared/config';
import { Link } from '@/shared/i18n/routing';
import { cn } from '@/shared/utils';

import Home from '../../../public/icons/icon-home.svg';
import Restaurant2 from '../../../public/icons/icon-restaurant2.svg';
import Review from '../../../public/icons/icon-review.svg';
import User from '../../../public/icons/icon-user.svg';

export default function BottomNavBar() {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const locale = useLocale();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const currentScrollY = target.scrollTop || window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    const scrollContainers = document.querySelectorAll(
      'main [class*="overflow-y-scroll"], main .scrollbar-hide, .scrollbar-hide',
    );

    if (scrollContainers.length > 0) {
      scrollContainers.forEach(container => {
        container.addEventListener('scroll', handleScroll, { passive: true });
      });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollContainers.length > 0) {
        scrollContainers.forEach(container => {
          container.removeEventListener('scroll', handleScroll);
        });
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]);

  const defaultFoodCourtId = FOOD_COURT_ID.KYONGSUL;
  const firstRestaurant = FOOD_COURT_RESTAURANTS.KYONGSUL[0];
  const defaultCampusHref = `/campus/${defaultFoodCourtId}/${RESTAURANT_ID_BY_NAME[firstRestaurant]}`;

  const navItems = [
    {
      href: defaultCampusHref,
      label: t('campus'),
      icon: <Restaurant2 width={32} height={32} />,
      alt: 'restaurant2',
    },
    {
      href: `/search`,
      label: t('search'),
      icon: <Search className='mb-[5px] mt-2 size-5' />,
      alt: 'search',
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
  if (pathWithoutLocale.startsWith('/search')) {
    return null;
  }
  if (
    pathWithoutLocale.split('/').length > 2 &&
    !pathWithoutLocale.startsWith('/campus')
  ) {
    return null;
  }

  if (pathWithoutLocale.startsWith('/auth')) {
    return null;
  }

  return (
    <motion.div
      className='shadow-t-md fixed bottom-0 z-50 flex w-full items-center justify-between rounded-t-2xl border-t border-gray-100 bg-white px-8 pb-6 pt-2 sm:px-14 md:hidden'
      variants={{
        visible: { y: 0 },
        hidden: { y: '100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
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
