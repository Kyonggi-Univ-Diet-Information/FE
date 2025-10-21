import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config/endpoint';
import type { SubRestaurant } from '../model/campusRestaurant';
import type { CampusMenu } from '../model/campusMenu';
import { cache } from 'react';

export const fetchCategorizedCampusMenu = cache(
  async (
    restaurantId: SubRestaurant,
    menuKey: string,
  ): Promise<CampusMenu[]> => {
    const data = await Http.get<CampusMenu[]>({
      request: ENDPOINT.CAMPUS_MENU_BY_RESTAURANT + restaurantId,
      cache: 'force-cache',
    });
    const filtered = data
      .filter(menu => menu.name.includes(menuKey))
      .sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  },
);
