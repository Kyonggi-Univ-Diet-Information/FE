import '@/app/_styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: '기룡아 밥먹자는 잠시 쉬어가요!',
  description: '기룡아 밥먹자는 잠시 쉬어가요!',
};

export default function MaintenanceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
