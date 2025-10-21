import type { ReactNode } from 'react';

export default function SubPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className='scrollbar-hide pb-26 absolute inset-0 flex flex-col gap-8 overflow-x-visible overflow-y-scroll p-4 pt-6 focus:outline-none'>
      {children}
    </div>
  );
}
