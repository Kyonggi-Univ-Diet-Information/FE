import { ENDPOINT, FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import type { FetchCampusMenuDetailResponse } from './api.model';
import type { CampusTopMenu } from './api.type';


export const fetchCampusMenuDetail = async (
  type: FoodCourt,
  menuId: number,
): Promise<FetchCampusMenuDetailResponse> => {
  const response = await Http.get<CampusTopMenu>({
    request: ENDPOINT.MENU.MENU_DETAIL(type, menuId),
  });

  return response;
};
