import { cache } from 'react';

import type { FetchCampusMenuByRestaurantResponse } from './api.model';
import type { SubRestaurant } from './api.type';

import { ENDPOINT } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

export const fetchCampusMenuByRestaurant = cache(
  async (
    restaurantId: SubRestaurant,
  ): Promise<FetchCampusMenuByRestaurantResponse> => {
    const data = await Http.get<FetchCampusMenuByRestaurantResponse>({
      request: ENDPOINT.MENU.MENU_BY_RESTAURANT('KYONGSUL', restaurantId),
      cache: 'force-cache',
    });

    const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  },
);
