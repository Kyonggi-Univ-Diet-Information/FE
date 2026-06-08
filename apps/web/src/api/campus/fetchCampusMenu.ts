import { cache } from 'react';



import { ENDPOINT, FOOD_COURT } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

import { menuKeys } from '@/model/common/queryKey';

import type { CampusMenu } from '@/constants/campus/menu';
import type { SubRestaurant } from '@/constants/campus/restaurant';

export const fetchCampusMenu = cache(
  async (): Promise<Record<SubRestaurant, CampusMenu[]>> => {
    const response = await Http.get<CampusMenu[]>({
      request: ENDPOINT.MENU.MENU_ALL(FOOD_COURT.KYONGSUL),
      next: { tags: [menuKeys.campus.tag(FOOD_COURT.KYONGSUL)], revalidate: 60 * 60 },
    });

    const grouped = response.reduce(
      (acc, menu) => {
        const restaurant = menu.subRestaurant;
        if (!acc[restaurant]) {
          acc[restaurant] = [];
        }
        acc[restaurant].push(menu);
        return acc;
      },
      {} as Record<SubRestaurant, CampusMenu[]>,
    );

    return grouped;
  },
);
