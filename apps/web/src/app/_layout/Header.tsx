'use client';

import { ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import React from 'react';

import { AuthButton } from '@/features/auth/components';

import { INQUIRY_URL } from '@/shared/config';
import { Link, useRouter } from '@/shared/i18n/routing';

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  const today = new Date().getDay();

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/campus/1', label: t('campus') },
    { href: `/dorm/${today}`, label: t('dorm') },
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
    if (
      pathWithoutLocale.split('/').length > 2 &&
      !pathWithoutLocale.startsWith('/campus') &&
      !pathWithoutLocale.startsWith('/dorm')
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
            <span className='font-brBold text-2xl font-bold'>기밥</span>
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
    <header className='fixed top-0 z-50 flex h-14 w-full border-b border-gray-100 bg-white py-8'>
      <div className='mx-auto flex w-full max-w-[770px] items-center justify-between px-4'>
        <MobileHeader />
        <DesktopHeader />
        <div className='flex items-center gap-4'>
          <button
            onClick={handleLanguageToggle}
            className='font-tossFace cursor-pointer text-2xl transition-transform hover:scale-110'
            aria-label='Toggle language'
          >
            {locale === 'ko' ? '🇰🇷' : '🇺🇸'}
          </button>

          <Link
            href={INQUIRY_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='cursor-pointer transition-transform hover:scale-110'
          >
            <Image
              src='/icons/icon-help.svg'
              alt='inquire'
              width={22}
              height={20}
            />
          </Link>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
