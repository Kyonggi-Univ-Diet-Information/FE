import { apiClient, ENDPOINT } from '@/lib/axios';
import type { CampusMenu, SubRestaurant } from '@/types';

export const fetchCampusMenu = async (): Promise<
  Record<SubRestaurant, CampusMenu[]>
> => {
  const response = await apiClient.get<CampusMenu[]>({
    request: ENDPOINT.CAMPUS_MENU,
  });

  const data = response.data.reduce(
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
