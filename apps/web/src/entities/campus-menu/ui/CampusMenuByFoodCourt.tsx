import { getLocale, getTranslations } from 'next-intl/server';

import { FoodCourt } from '@/shared/config';

import CampusMenuCard from './CampusMenuCard';
import { fetchCampusMenuByFoodCourt } from '../api/fetchCampusMenuByFoodCourt';

interface CampusMenuByFoodCourtProps {
  foodCourt: FoodCourt;
}

export default async function CampusMenuByFoodCourt({
  foodCourt,
}: CampusMenuByFoodCourtProps) {
  const campusMenu = await fetchCampusMenuByFoodCourt(foodCourt);
  const locale = await getLocale();
  const t = await getTranslations('campus');

  return (
    <>
      <div className='flex items-center justify-between'>
        <span className='text-sm text-gray-600'>
          {t('total')} {campusMenu.length}
          {t('menus')}
        </span>
      </div>

      <div className='flex flex-col md:grid md:grid-cols-2 md:gap-4'>
        {campusMenu.length > 0 &&
          campusMenu.map(menu => (
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
