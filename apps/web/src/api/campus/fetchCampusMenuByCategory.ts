import { cache } from 'react';

import type { FetchCampusMenuByCategoryResponse } from './api.model';
import type {
  CategoryMenuResponse,
  CampusMenuWithCategory,
  SubRestaurant,
} from './api.type';

import type { CampusFoodCourt } from '@/api/config';
import type { BaseResponse } from '@/api/config/api-base-types';
import { ENDPOINT } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';
import { hasSubRestaurants } from '@/constants/campus/restaurant';

export const fetchCampusMenuByCategory = cache(
  async (
    foodCourt: CampusFoodCourt,
    restaurant?: SubRestaurant,
  ): Promise<FetchCampusMenuByCategoryResponse> => {
    const response = await Http.get<BaseResponse<CategoryMenuResponse>>({
      request: ENDPOINT.MENU.MENU_BY_CATEGORY(foodCourt),
      cache: 'force-cache',
    });

    const data = response.result;

    if (hasSubRestaurants(foodCourt) && restaurant) {
      const restaurantData = data[restaurant as keyof typeof data];
      if (!restaurantData || typeof restaurantData !== 'object') {
        return { categories: [], menusByCategory: {} };
      }

      const categories = Object.keys(restaurantData);
      const menusByCategory = restaurantData as Record<
        string,
        CampusMenuWithCategory[]
      >;

      return {
        categories,
        menusByCategory,
      };
    }

    const categories = Object.keys(data);
    const menusByCategory = data as Record<string, CampusMenuWithCategory[]>;

    return {
      categories,
      menusByCategory,
    };
  },
);
