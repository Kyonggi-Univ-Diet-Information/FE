import { cache } from 'react';

import type { CampusMenu } from '../model/campusMenu';

import { ENDPOINT, FoodCourt } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';


export const fetchCampusMenuByFoodCourt = cache(
  async (foodCourt: FoodCourt): Promise<CampusMenu[]> => {
    const data = await Http.get<CampusMenu[]>({
      request: ENDPOINT.MENU.MENU_ALL(foodCourt),
      cache: 'force-cache',
    });

    const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  },
);
