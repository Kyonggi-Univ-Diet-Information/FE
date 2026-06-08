import { type CampusFoodCourt, ENDPOINT } from '@/api/config';
import type { BaseResponse } from '@/api/config/api-base-types';
import { Http } from '@/api/config/api-handlers';

import { menuKeys } from '@/model/common/queryKey';

import type { FetchCampusMenuHasSetResponse } from './api.model';
import type { CampusSetMenu } from './api.type';


export const fetchCampusMenuHasSet = async (
  type: CampusFoodCourt,
  baseFoodId: number,
): Promise<FetchCampusMenuHasSetResponse> => {
  const response = await Http.get<BaseResponse<CampusSetMenu[]>>({
    request: ENDPOINT.MENU.HAS_SET(type, baseFoodId),
    next: { tags: [menuKeys.campus.tag(type)], revalidate: 60 * 60 },
  });

  return response.result;
};
