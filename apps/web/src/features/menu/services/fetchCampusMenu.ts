import { ENDPOINT } from '@/lib/axios';
import type { CampusMenu, SubRestaurant } from '@/types';

export const fetchCampusMenu = async (): Promise<
  Record<SubRestaurant, CampusMenu[]>
> => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';
  const response = await fetch(`${apiUrl}${ENDPOINT.CAMPUS_MENU}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });

  const menuData: CampusMenu[] = await response.json();

  const data = menuData.reduce(
    (acc, menu) => {
      const restaurant = menu.subRestaurant;
      if (!acc[restaurant]) {
        acc[restaurant] = [];
      }
      acc[restaurant].push(menu);
      return acc;
    },
    {} as Record<SubRestaurant, CampusMenu[]>,
  );

  return data;
};
