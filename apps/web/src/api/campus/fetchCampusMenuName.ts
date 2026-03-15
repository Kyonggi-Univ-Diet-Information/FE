import type { CampusMenuName } from './api.model';

import { ENDPOINT, type FoodCourt } from '@/api/config/api-endpoints';
import { Http } from '@/api/config/api-handlers';


export const fetchCampusMenuName = async (
  foodCourt: FoodCourt,
  menuId: number,
): Promise<CampusMenuName> => {
  const data = await Http.get<CampusMenuName>({
    request: ENDPOINT.MENU.MENU_NAME(foodCourt, menuId),
    cache: 'force-cache',
  });

  return data;
};
