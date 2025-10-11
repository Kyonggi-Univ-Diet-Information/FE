import type { ReactNode } from 'react';

export default function ReviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className='scrollbar-hide absolute inset-0 flex flex-col gap-8 overflow-y-scroll p-4 pb-20 pt-6'>
      {children}
    </div>
  );
}
