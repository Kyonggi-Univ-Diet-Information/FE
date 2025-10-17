import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config/endpoint';
import type { CampusMenu } from '../model/campusMenu';
import type { SubRestaurant } from '../model/campusRestaurant';
import { cache } from 'react';

export const fetchCampusMenu = cache(
  async (): Promise<Record<SubRestaurant, CampusMenu[]>> => {
    const response = await Http.get<CampusMenu[]>({
      request: ENDPOINT.CAMPUS_MENU,
      cache: 'force-cache',
    });

    const grouped = response.reduce(
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

    return grouped;
  },
);
