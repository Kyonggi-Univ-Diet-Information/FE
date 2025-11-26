import { Http } from '@/shared/api/http';
import { ENDPOINT, FoodCourt } from '@/shared/config';

import { CampusTopMenu } from '../model/campusMenu';

export const fetchCampusMenuDetail = async (
  type: FoodCourt,
  menuId: number,
) => {
  const response = await Http.get<CampusTopMenu>({
    request: ENDPOINT.MENU.MENU_DETAIL(type, menuId),
  });

  return response;
};
