import { getLocale, getTranslations } from 'next-intl/server';

import { getFoodCourtById } from '@/shared/config';
import { Link } from '@/shared/i18n/routing';

import CampusMenuCard from './CampusMenuCard';
import { fetchCampusMenuByCategory } from '../api/fetchCampusMenuByCategory';
import {
  CATEGORY_TO_TEXT,
  CATEGORY_TO_TEXT_EN,
  type CampusMenuWithCategory,
} from '../model/campusMenu';
import {
  CAMPUS_RESTAURANT_ID,
  hasSubRestaurants,
} from '../model/campusRestaurant';

interface CampusMenuByRestaurantProps {
  foodCourtId: string;
  restaurantId: string;
  categoryKey?: string;
}

export default async function CampusMenuByRestaurant({
  foodCourtId,
  restaurantId,
  categoryKey,
}: CampusMenuByRestaurantProps) {
  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    return null;
  }

  const currentRestaurant = hasSubRestaurants(foodCourt)
    ? CAMPUS_RESTAURANT_ID[restaurantId]
    : undefined;

  const { categories, menusByCategory } = await fetchCampusMenuByCategory(
    foodCourt,
    currentRestaurant,
  );

  const locale = await getLocale();
  const categoryTexts =
    locale === 'en' ? CATEGORY_TO_TEXT_EN : CATEGORY_TO_TEXT;
  const t = await getTranslations('campus');

  let displayMenus: CampusMenuWithCategory[] = [];
  let totalCount = 0;

  if (categoryKey && menusByCategory[categoryKey]) {
    displayMenus = menusByCategory[categoryKey];
    totalCount = displayMenus.length;
  } else {
    displayMenus = Object.values(menusByCategory).flat();
    totalCount = displayMenus.length;
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 overflow-x-auto text-sm'>
          <Link
            prefetch
            href={`/campus/${foodCourtId}/${restaurantId}`}
            className={!categoryKey ? 'text-point font-bold' : ''}
          >
            {t('all')}
          </Link>
          {categories.map(key => (
            <Link
              prefetch
              key={key}
              href={`/campus/${foodCourtId}/${restaurantId}/${key}`}
              className={categoryKey === key ? 'text-point font-bold' : ''}
            >
              {categoryTexts[key] || key}
            </Link>
          ))}
        </div>
        <span className='whitespace-nowrap text-sm text-gray-600'>
          {t('total')} {totalCount}
          {t('menus')}
        </span>
      </div>

      <div className='flex flex-col md:grid md:grid-cols-2 md:gap-4'>
        {displayMenus.length > 0 &&
          displayMenus.map(menu => (
            <CampusMenuCard
              key={menu.id}
              {...menu}
              foodCourt={foodCourt}
              locale={locale}
            />
          ))}
      </div>
    </>
  );
}
