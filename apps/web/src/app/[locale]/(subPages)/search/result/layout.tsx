import { type ReactNode } from 'react';

import { SearchInput } from '@/page/search';

export default async function SearchResultLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SearchInput showFilter={true} />
      <div className='scrollbar-hide top-34 absolute inset-0 overflow-y-scroll pb-20 md:grid md:h-fit md:grid-cols-2 md:gap-4 md:px-4'>
        {children}
      </div>
    </>
  );
}
