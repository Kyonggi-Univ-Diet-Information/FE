import { getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';

import SearchMenuCard from './SearchMenuCard';
import { fetchSearch } from '../api/fetchSearch';

export default async function SearchResult({
  q,
}: {
  q: string;
}): Promise<ReactNode> {
  const results = await fetchSearch(q);
  const t = await getTranslations('search');

  if (results.length === 0) {
    return (
      <div className='flex h-[300px] items-center justify-center text-center text-gray-600'>
        {t('noResults', { q })}
      </div>
    );
  }
  return (
    <>
      {results.map((menu, index) => (
        <SearchMenuCard key={index} {...menu} />
      ))}
    </>
  );
}
