import { Http } from '@/shared/api/http';
import { type CampusFoodCourt, ENDPOINT } from '@/shared/config';

import { type CampusSetMenu } from '../model/campusMenu';

export const fetchCampusMenuHasSet = async (
  type: CampusFoodCourt,
  baseFoodId: number,
) => {
  const response = await Http.get<{ result: CampusSetMenu[] }>({
    request: ENDPOINT.MENU.HAS_SET(type, baseFoodId),
  });

  return response.result;
};
