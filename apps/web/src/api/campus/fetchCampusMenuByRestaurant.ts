import { cache } from 'react';

import { ENDPOINT, FOOD_COURT } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

import { menuKeys } from '@/model/common/queryKey';

import type { FetchCampusMenuByRestaurantResponse } from './api.model';
import type { SubRestaurant } from './api.type';


export const fetchCampusMenuByRestaurant = cache(
  async (
    restaurantId: SubRestaurant,
  ): Promise<FetchCampusMenuByRestaurantResponse> => {
    const data = await Http.get<FetchCampusMenuByRestaurantResponse>({
      request: ENDPOINT.MENU.MENU_BY_RESTAURANT('KYONGSUL', restaurantId),
      next: { tags: [menuKeys.campus.tag(FOOD_COURT.KYONGSUL)], revalidate: 60 * 60 },
    });

    const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  },
);
