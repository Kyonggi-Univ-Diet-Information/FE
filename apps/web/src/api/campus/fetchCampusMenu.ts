import { cache } from 'react';

import type { FetchCampusMenuResponse } from './api.model';
import type { CampusMenu, SubRestaurant } from './api.type';

import { ENDPOINT, FOOD_COURT } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

export const fetchCampusMenu = cache(
  async (): Promise<FetchCampusMenuResponse> => {
    const response = await Http.get<CampusMenu[]>({
      request: ENDPOINT.MENU.MENU_ALL(FOOD_COURT.KYONGSUL),
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
