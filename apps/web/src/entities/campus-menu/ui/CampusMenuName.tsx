import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { type FoodCourt } from '@/shared/config';

import { fetchCampusMenuName } from '../api/fetchCampusMenuName';

export default async function CampusMenuName({
  foodCourt,
  menuId,
  className,
}: {
  foodCourt: FoodCourt;
  menuId: number;
  className?: string;
}) {
  const locale = await getLocale();
  const menuName = await fetchCampusMenuName(foodCourt, menuId);

  return (
    <Suspense>
      <span className={className}>
        {locale === 'en' ? menuName.nameEn : menuName.name}
      </span>
    </Suspense>
  );
}
