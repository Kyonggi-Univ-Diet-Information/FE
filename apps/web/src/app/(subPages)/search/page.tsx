import { Suspense } from 'react';

import { SearchInput } from '@/page/search';

export const dynamic = 'force-dynamic';

export default async function SearchPage() {
  return (
    <div className='flex flex-col gap-4'>
      <Suspense fallback={<div>검색창 로딩 중...</div>}>
        <SearchInput />
      </Suspense>
    </div>
  );
}
