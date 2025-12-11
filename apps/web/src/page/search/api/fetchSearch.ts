import type { SubRestaurant } from '@/entities/campus-menu/model/campusRestaurant';

import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';

export type SearchResult = {
  menuId: number;
  price: number;
  restaurantType: FoodCourt;
  subRestaurant: SubRestaurant;
  name: string;
  nameEn: string;
  cuisine: string;
  foodType: string;
  detailedMenu: string;
  reviewCount: number;
  averageRating: number;
};

export const fetchSearch = async (q: string): Promise<SearchResult[]> => {
  const response: { result: SearchResult[] } = await Http.get({
    request: ENDPOINT.MENU.SEARCH,
    params: {
      keyword: q,
      foodType: 'RICE_BOWL',
      restaurantType: 'KYONGSUL',
      priceMin: 0,
      priceMax: 100000,
      sortingType: 'BASIC',
    },
  });

  return response.result;
};
