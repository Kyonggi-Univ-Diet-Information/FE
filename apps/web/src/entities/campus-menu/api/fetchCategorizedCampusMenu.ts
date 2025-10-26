import { cache } from 'react';

import { Http } from '@/shared/api/http';
import { ENDPOINT, FOOD_COURT } from '@/shared/config/endpoint';

import type { CampusMenu } from '../model/campusMenu';
import type { SubRestaurant } from '../model/campusRestaurant';

export const fetchCategorizedCampusMenu = cache(
  async (
    restaurantId: SubRestaurant,
    menuKey: string,
  ): Promise<CampusMenu[]> => {
    const data = await Http.get<CampusMenu[]>({
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
