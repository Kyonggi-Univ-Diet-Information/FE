import { Suspense } from 'react';

import { SearchResult, SearchSkeleton } from '@/page/search';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
  }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense
      key={q || ''}
      fallback={
        <>
          <SearchSkeleton />
          <SearchSkeleton />
          <SearchSkeleton />
        </>
      }
    >
      <SearchResult q={q || ''} />
    </Suspense>
  );
}
