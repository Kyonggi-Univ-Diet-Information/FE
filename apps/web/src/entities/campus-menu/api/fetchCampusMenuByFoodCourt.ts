import { cache } from 'react';

import { Http } from '@/shared/api/http';
import { ENDPOINT, FoodCourt } from '@/shared/config/endpoint';

import type { CampusMenu } from '../model/campusMenu';

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
