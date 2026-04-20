import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import { menuKeys } from '@/model/common/queryKey';

import type { FetchDormMenuByDayResponse } from './api.model';
import type { DormDay } from './api.type';

interface FetchDormMenuByDayApiResponse {
  result: FetchDormMenuByDayResponse;
}

export const fetchDormMenuByDay = async (
  day: DormDay,
): Promise<FetchDormMenuByDayResponse> => {
  const data = await Http.getDirect<FetchDormMenuByDayApiResponse>({
    request: ENDPOINT.DORM.DORM_MENU_BY_DAY(day),
    next: { tags: [menuKeys.dorm.tag()] },
  });
  return data.result;
};
