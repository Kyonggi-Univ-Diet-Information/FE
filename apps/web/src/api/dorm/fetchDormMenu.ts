import type { FetchDormMenuResponse } from './api.model';
import type { DormDay, DormTime, DormTimeMenu } from './api.type';

import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import { menuKeys } from '@/model/common/queryKey';

interface FetchDormMenuApiResponse {
  result: {
    [key in DormDay]: {
      [key in DormTime]: DormTimeMenu;
    };
  };
}

export const fetchDormMenu = async (): Promise<FetchDormMenuResponse> => {
  const data = await Http.get<FetchDormMenuApiResponse>({
    request: ENDPOINT.DORM.DORM_MENU,
    cache: 'force-cache',
    next: { tags: [menuKeys.dorm.tag()] },
  });
  return data.result;
};
