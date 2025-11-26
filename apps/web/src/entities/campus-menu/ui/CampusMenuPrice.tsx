import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { type FoodCourt } from '@/shared/config';

import { fetchCampusMenuDetail } from '../api/fetchCampusMenuDetail';

export default async function CampusMenuPrice({
  foodCourt,
  menuId,
  className,
}: {
  foodCourt: FoodCourt;
  menuId: number;
  className?: string;
}) {
  const locale = await getLocale();
  const menuDetail = await fetchCampusMenuDetail(foodCourt, menuId);
  const wonText = locale === 'en' ? '₩' : '원';

  return (
    <Suspense>
      <span className={className}>
        {menuDetail.price}
        {wonText}
      </span>
    </Suspense>
  );
}
