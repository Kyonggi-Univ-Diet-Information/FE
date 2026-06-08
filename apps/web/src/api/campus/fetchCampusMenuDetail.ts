import { ENDPOINT, FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import { menuKeys } from '@/model/common/queryKey';

import type { FetchCampusMenuDetailResponse } from './api.model';
import type { CampusTopMenu } from './api.type';


export const fetchCampusMenuDetail = async (
  type: FoodCourt,
  menuId: number,
): Promise<FetchCampusMenuDetailResponse> => {
  const response = await Http.get<CampusTopMenu>({
    request: ENDPOINT.MENU.MENU_DETAIL(type, menuId),
    next: { tags: [menuKeys.campus.tag(type)], revalidate: 60 * 60 },
  });

  return response;
};
