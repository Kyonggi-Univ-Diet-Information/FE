'use client';

import {
  ChevronLeftIcon,
  LanguagesIcon,
  MessageSquareWarning,
  Search,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import React from 'react';

import { AuthButton } from '@/features/auth/components';

import {
  FOOD_COURT_RESTAURANTS,
  RESTAURANT_ID_BY_NAME,
} from '@/entities/campus-menu/model/campusRestaurant';

import { FOOD_COURT_ID, INQUIRY_URL } from '@/shared/config';
import { Link, useRouter } from '@/shared/i18n/routing';

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  const defaultFoodCourtId = FOOD_COURT_ID.KYONGSUL;
  const firstRestaurant = FOOD_COURT_RESTAURANTS.KYONGSUL[0];
  const defaultCampusHref = `/campus/${defaultFoodCourtId}/${RESTAURANT_ID_BY_NAME[firstRestaurant]}`;

  const navItems = [
    { href: '/', label: t('home') },
    { href: defaultCampusHref, label: t('campus') },
    { href: '/review', label: t('review') },
    { href: '/user', label: t('myPage') },
  ];

  const handleLanguageToggle = () => {
    const newLocale = locale === 'ko' ? 'en' : 'ko';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(pathWithoutLocale, { locale: newLocale });
  };

  const isDepthPage = () => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    if (pathWithoutLocale.startsWith('/search')) {
      return true;
    }
    if (
      pathWithoutLocale.split('/').length > 2 &&
      !pathWithoutLocale.startsWith('/campus')
    ) {
      return true;
    }
    return false;
  };

  const MobileHeader = () => {
    return (
      <button
        onClick={() => {
          if (isDepthPage()) router.back();
          else router.push('/');
        }}
        className='flex cursor-pointer items-baseline gap-2 focus:outline-none md:hidden'
      >
        {isDepthPage() ? (
          <ChevronLeftIcon />
        ) : (
          <>
            <span className='font-brBold text-xl font-bold'>기밥</span>
            <span className='font-brRegular hidden md:block'>
              {tCommon('appName')}
            </span>
          </>
        )}
      </button>
    );
  };

  const DesktopHeader = () => {
    return (
      <>
        <Link
          href='/'
          className='hidden cursor-pointer items-baseline gap-2 md:flex'
        >
          <span className='font-brBold text-2xl font-bold'>기밥</span>
          <span className='font-brRegular hidden md:block'>
            {tCommon('appName')}
          </span>
        </Link>
        <div className='hidden items-baseline gap-4 md:flex'>
          {navItems.map(item => {
            const isActive =
              item.href === '/'
                ? pathname === `/${locale}` || pathname === '/'
                : pathname.includes(`${item.href.split('/')[1]}`);

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className={`text-sm transition-colors ${
                  isActive
                    ? 'text-point font-semibold'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <header className='fixed top-0 z-50 flex h-14 w-full bg-white py-8'>
      <div className='mx-auto flex w-full max-w-[770px] items-center justify-between px-4'>
        <MobileHeader />
        <DesktopHeader />
        <div className='flex items-center gap-4'>
          {!isDepthPage() && (
            <Link
              href='/search'
              className='cursor-pointer transition-transform hover:scale-110'
            >
              <Search size={20} className='text-accent-foreground' />
            </Link>
          )}
          <button
            onClick={handleLanguageToggle}
            className='cursor-pointer transition-transform hover:scale-110'
            aria-label='Toggle language'
          >
            <LanguagesIcon size={20} className='text-accent-foreground' />
          </button>

          <Link
            href={INQUIRY_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='cursor-pointer transition-transform hover:scale-110'
          >
            <MessageSquareWarning
              size={20}
              className='text-accent-foreground'
            />
          </Link>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
