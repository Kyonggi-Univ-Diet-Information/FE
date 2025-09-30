import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/menu';

export const metadata: Metadata = {
  title: '기룡아 밥먹자',
  description: '경기대학교 내부 식당 정보를 쉽게 찾아봐요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='antialiased'>
        <Header />
        <div className='size-full pt-[65px]'>
          <main className='relative mx-auto flex min-h-[calc(100vh-65px)] max-w-[770px]'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
