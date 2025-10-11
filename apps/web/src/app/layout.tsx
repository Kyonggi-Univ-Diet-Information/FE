import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

import { Header } from '@/components/layout';
import { ErrorBoundary } from '@/components/common';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '기룡아 밥먹자',
  description: '경기대학교 내부 식당 정보를 쉽게 찾아봐요!',
};

const wantedSans = localFont({
  src: [
    {
      path: '../../public/fonts/WantedSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WantedSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WantedSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WantedSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WantedSans-Black.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <head>
        <link rel='icon' href='favicon/favicon.ico' sizes='any' />
      </head>
      <html lang='ko'>
        <body className={`${wantedSans.className} antialiased`}>
          <ErrorBoundary>
            <Header />
            <div className='size-full pt-[65px]'>
              <main className='relative mx-auto flex min-h-[calc(100vh-65px)] max-w-[770px]'>
                {children}
              </main>
            </div>
          </ErrorBoundary>
        </body>
      </html>
    </>
  );
}
