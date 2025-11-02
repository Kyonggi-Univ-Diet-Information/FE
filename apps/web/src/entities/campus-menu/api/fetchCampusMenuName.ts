import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config/endpoint';

import { CampusMenuName } from '../model/campusMenuName';

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
