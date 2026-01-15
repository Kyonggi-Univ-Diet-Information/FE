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
  const menuDetail = await fetchCampusMenuDetail(foodCourt, menuId);

  return (
    <Suspense>
      <span className={className}>
        {menuDetail.price}원
      </span>
    </Suspense>
  );
}
