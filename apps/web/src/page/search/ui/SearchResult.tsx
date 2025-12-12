import { getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';

import { type FoodCourt } from '@/shared/config/endpoint';

import SearchMenuCard from './SearchMenuCard';
import { fetchSearch } from '../api/fetchSearch';
import { FoodType, SortingType } from '../model/search';

export default async function SearchResult({
  q = '',
  foodType,
  restaurantType,
  sort,
}: {
  q: string;
  foodType: FoodType;
  restaurantType: FoodCourt;
  sort: SortingType;
}): Promise<ReactNode> {
  const results = await fetchSearch({
    keyword: q,
    foodType,
    restaurantType,
    priceMin: 0,
    priceMax: 100000,
    sortingType: sort,
  });
  const t = await getTranslations('search');

  if (results.length === 0) {
    return (
      <div className='flex h-[300px] items-center justify-center text-center text-gray-600'>
        {t('noResults', { q: q || '해당 조건' })}
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
