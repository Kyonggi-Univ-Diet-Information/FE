import type { FetchCampusMenuNameResponse } from './api.model';

import { ENDPOINT, type FoodCourt } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

export const fetchCampusMenuName = async (
  foodCourt: FoodCourt,
  menuId: number,
): Promise<FetchCampusMenuNameResponse> => {
  const data = await Http.get<FetchCampusMenuNameResponse>({
    request: ENDPOINT.MENU.MENU_NAME(foodCourt, menuId),
    cache: 'force-cache',
  });

  return data;
};
