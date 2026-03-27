import type { FetchDormMenuByDayResponse } from './api.model';
import type { DormDay } from './api.type';

import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

interface FetchDormMenuByDayApiResponse {
  result: FetchDormMenuByDayResponse;
}

export const fetchDormMenuByDay = async (
  day: DormDay,
): Promise<FetchDormMenuByDayResponse> => {
  const data = await Http.get<FetchDormMenuByDayApiResponse>({
    request: ENDPOINT.DORM.DORM_MENU_BY_DAY(day),
    cache: 'force-cache',
    next: {
      revalidate: 60 * 60 * 2,
    },
  });
  return data.result;
};
