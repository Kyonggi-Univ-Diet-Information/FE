import { cache } from 'react';


import type { CampusMenu } from '../model/campusMenu';
import type { SubRestaurant } from '../model/campusRestaurant';

import { ENDPOINT } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

export const fetchCampusMenuByRestaurant = cache(
  async (restaurantId: SubRestaurant): Promise<CampusMenu[]> => {
    const data = await Http.get<CampusMenu[]>({
      request: ENDPOINT.MENU.MENU_BY_RESTAURANT('KYONGSUL', restaurantId),
      cache: 'force-cache',
    });

    const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  },
);
