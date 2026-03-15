import { Suspense } from 'react';

import { fetchCampusMenuName } from '../api/fetchCampusMenuName';

import { type FoodCourt } from '@/api/config';


export default async function CampusMenuName({
  foodCourt,
  menuId,
  className,
}: {
  foodCourt: FoodCourt;
  menuId: number;
  className?: string;
}) {
  const menuName = await fetchCampusMenuName(foodCourt, menuId);

  return (
    <Suspense>
      <span className={className}>{menuName.name}</span>
    </Suspense>
  );
}
