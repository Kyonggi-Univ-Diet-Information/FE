import { ENDPOINT } from '@/shared/config/endpoint';
import { Http } from '@/shared/api/http';
import { CampusMenuName } from '../model/campusMenuName';

export const fetchCampusMenuName = async (
  menuId: number,
): Promise<CampusMenuName> => {
  const data = await Http.get<CampusMenuName>({
    request: ENDPOINT.CAMPUS_MENU_NAME + menuId,
    cache: 'force-cache',
  });

  return data;
};
