import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { brBold, brRegular, tossFace, wantedSans } from '../font';

import { BottomNavBar, Header } from '@/components/layout';
import { ErrorBoundary, GoogleAnalytics } from '@/components/common';
import { SWRProvider } from '@/components/providers';
import { Analytics } from '@vercel/analytics/next';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${wantedSans.variable} ${brBold.variable} ${brRegular.variable} ${tossFace.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
        <link rel='manifest' href='/config/manifest.json' />
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
        <link rel='preconnect' href='https://www.googletagmanager.com' />
        <link
          rel='preload'
          href='/fonts/WantedSans-Regular.ttf'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />

        <meta property='og:image' content='/thumbnail/thumbnail.png' />
        <meta property='og:url' content='https://www.kiryong.kr/' />
        <meta property='og:type' content='website' />
      </head>
      <body className='antialiased' suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <ErrorBoundary>
            <Analytics />
            <SWRProvider>
              <Header />
              <div className='size-full pt-[65px]'>
                <main className='relative mx-auto flex min-h-[calc(100vh-65px)] max-w-[770px]'>
                  {children}
                </main>
              </div>
              <BottomNavBar />
            </SWRProvider>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
