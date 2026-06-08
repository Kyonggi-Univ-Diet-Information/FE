import { cache } from 'react';


import { ENDPOINT, FoodCourt } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

import { menuKeys } from '@/model/common/queryKey';

import type { FetchCampusMenuByFoodCourtResponse } from './api.model';

export const fetchCampusMenuByFoodCourt = cache(
  async (foodCourt: FoodCourt): Promise<FetchCampusMenuByFoodCourtResponse> => {
    const data = await Http.get<FetchCampusMenuByFoodCourtResponse>({
      request: ENDPOINT.MENU.MENU_ALL(foodCourt),
      next: { tags: [menuKeys.campus.tag(foodCourt)], revalidate: 60 * 60 },
    });

    const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  },
);
