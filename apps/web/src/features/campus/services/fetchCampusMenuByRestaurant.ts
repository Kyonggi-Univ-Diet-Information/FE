import { ENDPOINT } from '@/lib/axios';
import type { CampusMenu, SubRestaurant } from '@/types';

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

  const menuData: CampusMenu[] = await response.json();

  return menuData;
};
