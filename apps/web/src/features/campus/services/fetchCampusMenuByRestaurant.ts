import { ENDPOINT } from '@/lib/axios';
import type { CampusMenu, SubRestaurant } from '@/types';
import { notFound } from 'next/navigation';

export const fetchCampusMenuByRestaurant = async (
  restaurantId: SubRestaurant,
): Promise<CampusMenu[]> => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';
  const response = await fetch(
    `${apiUrl}${ENDPOINT.CAMPUS_MENU_BY_RESTAURANT}${restaurantId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
    },
  );

  if (response.status === 401) {
    notFound();
  }

  const menuData: CampusMenu[] = await response.json();

  return menuData;
};
