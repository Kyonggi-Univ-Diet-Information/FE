
import { ENDPOINT, type FoodCourt } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';

import { menuKeys } from '@/model/common/queryKey';

import type { FetchCampusMenuNameResponse } from './api.model';

export const fetchCampusMenuName = async (
  foodCourt: FoodCourt,
  menuId: number,
): Promise<FetchCampusMenuNameResponse> => {
  const data = await Http.get<FetchCampusMenuNameResponse>({
    request: ENDPOINT.MENU.MENU_NAME(foodCourt, menuId),
    next: { tags: [menuKeys.campus.tag(foodCourt)], revalidate: 60 * 60 },
  });

  return data;
};
