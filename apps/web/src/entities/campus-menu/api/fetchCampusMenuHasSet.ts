import { type CampusSetMenu } from '../model/campusMenu';

import { type CampusFoodCourt, ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';


export const fetchCampusMenuHasSet = async (
  type: CampusFoodCourt,
  baseFoodId: number,
) => {
  const response = await Http.get<{ result: CampusSetMenu[] }>({
    request: ENDPOINT.MENU.HAS_SET(type, baseFoodId),
  });

  return response.result;
};
