import { cache } from 'react';

import type { FetchCategorizedCampusMenuResponse } from './api.model';
import type { SubRestaurant } from './api.type';

import { ENDPOINT, FOOD_COURT } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

export const fetchCategorizedCampusMenu = cache(
  async (
    restaurantId: SubRestaurant,
    menuKey: string,
  ): Promise<FetchCategorizedCampusMenuResponse> => {
    const data = await Http.get<FetchCategorizedCampusMenuResponse>({
      request: ENDPOINT.MENU.MENU_BY_RESTAURANT(
        FOOD_COURT.KYONGSUL,
        restaurantId,
      ),
      cache: 'force-cache',
    });
    const filtered = data
      .filter(menu => menu.name.includes(menuKey))
      .sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  },
);
