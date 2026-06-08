import { cache } from 'react';



import { ENDPOINT, FOOD_COURT } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

import { menuKeys } from '@/model/common/queryKey';

import type { CampusMenu } from '@/constants/campus/menu';
import type { SubRestaurant } from '@/constants/campus/restaurant';

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
      next: { tags: [menuKeys.campus.tag(FOOD_COURT.KYONGSUL)], revalidate: 60 * 60 },
    });
    const filtered = data
      .filter(menu => menu.name.includes(menuKey))
      .sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  },
);
