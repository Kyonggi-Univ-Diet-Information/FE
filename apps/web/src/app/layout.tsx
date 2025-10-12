import type { Metadata } from 'next';

import './globals.css';

import { BottomNavBar, Header } from '@/components/layout';
import { ErrorBoundary } from '@/components/common';
import type { ReactNode } from 'react';
import { brBold, brRegular, tossFace, wantedSans } from './font';

export const metadata: Metadata = {
  title: '기룡아 밥먹자',
  description: '경기대학교 내부 식당 정보를 쉽게 찾아봐요!',
};

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
        <body
          className={`${wantedSans.variable} ${brBold.variable} ${brRegular.variable} ${tossFace.variable} antialiased`}
        >
          <ErrorBoundary>
            <Header />
            <div className='size-full pt-[65px]'>
              <main className='relative mx-auto flex min-h-[calc(100vh-65px)] max-w-[770px]'>
                {children}
              </main>
            </div>
            <BottomNavBar />
          </ErrorBoundary>
        </body>
      </html>
    </>
  );
}
