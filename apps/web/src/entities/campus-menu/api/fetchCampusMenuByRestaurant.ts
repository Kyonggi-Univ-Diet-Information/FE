import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config/endpoint';
import type { SubRestaurant } from '../model/campusRestaurant';
import type { CampusMenu } from '../model/campusMenu';
import { cache } from 'react';

export const fetchCampusMenuByRestaurant = cache(
  async (restaurantId: SubRestaurant): Promise<CampusMenu[]> => {
    const data = await Http.get<CampusMenu[]>({
      request: ENDPOINT.CAMPUS_MENU_BY_RESTAURANT + restaurantId,
      cache: 'force-cache',
    });

    const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  },
);
