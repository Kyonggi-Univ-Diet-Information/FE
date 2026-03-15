import type { CampusTopMenu } from './api.model';

import { ENDPOINT, FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';


export const fetchCampusMenuDetail = async (
  type: FoodCourt,
  menuId: number,
) => {
  const response = await Http.get<CampusTopMenu>({
    request: ENDPOINT.MENU.MENU_DETAIL(type, menuId),
  });

  return response;
};
