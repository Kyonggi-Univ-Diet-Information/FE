import '@/app/_styles/globals.css';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { GoogleAnalytics } from '@/app/_analytics';
import { ErrorProvider, SWRProvider } from '@/app/_providers';
import { brBold, brRegular, tossFace, wantedSans } from '@/app/_styles/font';

export const metadata: Metadata = {
  title: '기룡아 밥먹자',
  description: '경기대학교 내부 식당 정보를 쉽게 찾아봐요!',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang='ko'
      className={`${wantedSans.variable} ${brBold.variable} ${brRegular.variable} ${tossFace.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
        <link rel='manifest' href='/config/manifest.json' />
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
        <link rel='preconnect' href='https://www.googletagmanager.com' />
        <link
          rel='preconnect'
          href='https://res.cloudinary.com'
          crossOrigin='anonymous'
        />

        <meta property='og:image' content='/thumbnail/thumbnail.png' />
        <meta property='og:url' content='https://www.kiryong.kr/' />
        <meta property='og:type' content='website' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
        <meta
          name='naver-site-verification'
          content='93445f88fb84c2015b74933d1b6deabbba65014e'
        />
        <meta
          name='google-site-verification'
          content='V1odmpWgms6ZPdD3-m_eVSDwWliOCiVEehL6LawaKXs'
        />
      </head>
      <body className='antialiased' suppressHydrationWarning>
        <GoogleAnalytics />
        <ErrorProvider>
          <VercelAnalytics />
          <SWRProvider>
            {children}
          </SWRProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
