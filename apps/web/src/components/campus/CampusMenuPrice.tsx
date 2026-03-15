import { Suspense } from 'react';

import { fetchCampusMenuDetail } from '@/api/campus/fetchCampusMenuDetail';
import { type FoodCourt } from '@/api/config';


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
      <span className={className}>{menuDetail.price}원</span>
    </Suspense>
  );
}
