import { Suspense } from 'react';

import { SearchResult, SearchSkeleton } from '@/page/search';
import {
  FOOD_TYPE,
  SORTING_TYPE,
  SortingType,
  type FoodType,
} from '@/page/search/model/search';

import { FOOD_COURT, FoodCourt } from '@/shared/config';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    foodType: FoodType;
    restaurantType: FoodCourt;
    sort: SortingType;
  }>;
}) {
  const {
    q = '',
    foodType = FOOD_TYPE.DEFAULT,
    restaurantType = FOOD_COURT.KYONGSUL,
    sort = SORTING_TYPE.BASIC,
  } = await searchParams;

  return (
    <Suspense
      key={q}
      fallback={
        <>
          <SearchSkeleton />
          <SearchSkeleton />
          <SearchSkeleton />
        </>
      }
    >
      <SearchResult
        q={q}
        foodType={foodType}
        restaurantType={restaurantType}
        sort={sort}
      />
    </Suspense>
  );
}
