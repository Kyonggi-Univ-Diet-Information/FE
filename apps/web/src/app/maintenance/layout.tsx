import '@/app/_styles/globals.css';

import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { GoogleAnalytics } from '@/app/_analytics';
import { brBold, brRegular, tossFace, wantedSans } from '@/app/_styles/font';

export const metadata: Metadata = {
  title: '기룡아 밥먹자는 잠시 쉬어가요!',
  description: '기룡아 밥먹자는 잠시 쉬어가요!',
};

export default function MaintenanceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang='ko'
      className={`${wantedSans.variable} ${brBold.variable} ${brRegular.variable} ${tossFace.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
        <link rel='manifest' href='/config/manifest.json' />
        <meta property='og:image' content='/thumbnail/thumbnail.png' />
        <meta property='og:url' content='https://www.kiryong.kr/' />
        <meta property='og:type' content='website' />
      </head>
      <body className='antialiased' suppressHydrationWarning>
        <GoogleAnalytics />
        <VercelAnalytics />
        {children}
      </body>
    </html>
  );
}
