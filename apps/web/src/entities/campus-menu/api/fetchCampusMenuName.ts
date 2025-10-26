import { Http } from '@/shared/api/http';
import { ENDPOINT, FOOD_COURT } from '@/shared/config/endpoint';

import { CampusMenuName } from '../model/campusMenuName';

export const fetchCampusMenuName = async (
  menuId: number,
): Promise<CampusMenuName> => {
  const data = await Http.get<CampusMenuName>({
    request: ENDPOINT.MENU.MENU_NAME(FOOD_COURT.KYONGSUL, menuId),
    cache: 'force-cache',
  });

  return data;
};
