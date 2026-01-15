import Link from 'next/link';

import { type FoodCourt, FOOD_COURT_ID } from '@/shared/config';
import { cn } from '@/shared/utils';

import CampusMenuCard from './CampusMenuCard';
import { fetchCampusMenuByCategory } from '../api/fetchCampusMenuByCategory';
import {
  CATEGORY_TO_TEXT,
  type CampusFoodCourt,
  type CampusMenuWithCategory,
} from '../model/campusMenu';

interface CampusMenuByFoodCourtProps {
  foodCourt: CampusFoodCourt;
  categoryKey?: string;
}

export default async function CampusMenuByFoodCourt({
  foodCourt,
  categoryKey,
}: CampusMenuByFoodCourtProps) {
  const { categories, menusByCategory } =
    await fetchCampusMenuByCategory(foodCourt);

  const categoryTexts = CATEGORY_TO_TEXT;

  let displayMenus: CampusMenuWithCategory[] = [];
  let totalCount = 0;

  if (categoryKey && menusByCategory[categoryKey]) {
    displayMenus = menusByCategory[categoryKey];
    totalCount = displayMenus.length;
  } else {
    displayMenus = Object.values(menusByCategory).flat();
    totalCount = displayMenus.length;
  }

  const foodCourtId = FOOD_COURT_ID[foodCourt as keyof typeof FOOD_COURT_ID];

  return (
    <>
      <div className='flex items-center justify-between gap-4'>
        <div className='scrollbar-hide flex items-center divide-x divide-gray-200 overflow-x-scroll text-sm'>
          <Link
            prefetch
            href={`/campus/${foodCourtId}`}
            className={cn(
              !categoryKey ? 'text-point font-bold' : '',
              'cursor-pointer text-nowrap pr-2',
            )}
          >
            전체
          </Link>
          {categories.map(key => (
            <Link
              prefetch
              key={key}
              href={`/campus/${foodCourtId}/${key}`}
              className={cn(
                categoryKey === key ? 'text-point font-bold' : '',
                'cursor-pointer text-nowrap px-2',
              )}
            >
              {categoryTexts[key] || key}
            </Link>
          ))}
        </div>
        <span className='whitespace-nowrap rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-600'>
          총 {totalCount}개
        </span>
      </div>

      <div className='flex flex-col md:grid md:grid-cols-2 md:gap-4'>
        {displayMenus.length > 0 &&
          displayMenus.map(menu => (
            <CampusMenuCard
              key={menu.id}
              {...menu}
              foodCourt={foodCourt as FoodCourt}
            />
          ))}
      </div>
    </>
  );
}
