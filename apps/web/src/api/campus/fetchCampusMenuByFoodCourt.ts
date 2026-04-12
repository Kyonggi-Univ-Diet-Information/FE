import { cache } from 'react';


import { ENDPOINT, FoodCourt } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

import type { FetchCampusMenuByFoodCourtResponse } from './api.model';

export const fetchCampusMenuByFoodCourt = cache(
  async (foodCourt: FoodCourt): Promise<FetchCampusMenuByFoodCourtResponse> => {
    const data = await Http.get<FetchCampusMenuByFoodCourtResponse>({
      request: ENDPOINT.MENU.MENU_ALL(foodCourt),
      cache: 'force-cache',
    });

    const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  },
);
