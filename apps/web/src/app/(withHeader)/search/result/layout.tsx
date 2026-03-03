import { type ReactNode, Suspense } from 'react';

import { SearchInput } from '@/page/search';

export default async function SearchResultLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div></div>}>
        <SearchInput showFilter={true} />
      </Suspense>
      <div className='scrollbar-hide absolute inset-0 top-34 overflow-y-scroll pb-20 md:grid md:h-fit md:grid-cols-2 md:gap-4 md:px-4'>
        {children}
      </div>
    </>
  );
}
