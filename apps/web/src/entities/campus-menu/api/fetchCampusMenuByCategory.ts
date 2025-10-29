import { cache } from 'react';

import type { BaseResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config/endpoint';

import type {
  CampusFoodCourt,
  CategoryMenuResponse,
  CampusMenuWithCategory,
} from '../model/campusMenu';
import type { SubRestaurant } from '../model/campusRestaurant';
import { hasSubRestaurants } from '../model/campusRestaurant';

type CategorizedMenuData = {
  categories: string[];
  menusByCategory: Record<string, CampusMenuWithCategory[]>;
};

export const fetchCampusMenuByCategory = cache(
  async (
    foodCourt: CampusFoodCourt,
    restaurant?: SubRestaurant,
  ): Promise<CategorizedMenuData> => {
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
