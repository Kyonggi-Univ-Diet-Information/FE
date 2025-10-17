'use client';

import Image from 'next/image';
import { Link } from '@/shared/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/common';
import { Title } from '@/components/layout';

export default function LoginPage() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';

  const kakaoRestApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URL;

  const state = encodeURIComponent(JSON.stringify({ returnUrl, locale }));
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoRestApiKey}&redirect_uri=${redirectUri}&state=${state}`;

  return (
    <div className='flex size-full items-center justify-center'>
      <div className='max-w-120 min-h-50 flex w-4/5 min-w-80 flex-col justify-between rounded-2xl border border-gray-100 bg-gray-100/50 p-4 py-6'>
        <div className='flex flex-col gap-y-1'>
          <Title>
            <span className='text-point font-brBold'>{tCommon('appName')}</span>
            <br className={locale === 'en' ? '' : 'hidden'} />
            {t('authRequest')
              .split('\n')
              .map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
          </Title>
          <p
            className={`text-sm text-gray-600 ${locale === 'en' ? 'mb-6' : ''}`}
          >
            {t('authDescription')}
          </p>
        </div>
        <Link href={kakaoLoginUrl}>
          <Button variant='kakao' size='lg' className='w-full'>
            <Image
              src='/icons/icon-kakao.svg'
              alt='kakao'
              width={20}
              height={20}
            />
            {t('kakaoLogin')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
