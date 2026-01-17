import { SearchIcon } from 'lucide-react';
import { Suspense } from 'react';

import { SearchInput } from '@/page/search';

export const dynamic = 'force-dynamic';

export default async function SearchPage() {
  return (
    <div className='flex flex-col gap-4'>
      <Suspense fallback={<SearchInputSkeleton />}>
        <SearchInput />
      </Suspense>
    </div>
  );
}

function SearchInputSkeleton() {
  return <div className='relative'>
  <button type='submit' className='cursor-not-allowed'>
    <SearchIcon className='size-4.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 active:text-gray-300' />
  </button>
  <div
    className='w-full rounded-2xl border p-2.5 pl-3 pr-10 text-base focus:outline-none'
  >검색어를 입력해주세요.</div>
</div>
}