
import { ENDPOINT } from '@/api/config';
import type { BaseResponse } from '@/api/config/api-base-types';
import { Http } from '@/api/config/api-handlers';

import { menuKeys } from '@/model/common/queryKey';

import type { FetchTopMenuResponse } from './api.model';
import type { CampusTopMenu } from './api.type';

export const fetchTopMenu = async (): Promise<FetchTopMenuResponse> => {
  const data = await Http.get<BaseResponse<CampusTopMenu[]>>({
    request: ENDPOINT.MENU.TOP_MENU,
    next: { tags: [menuKeys.top.tag()], revalidate: 60 * 5 },
  });

  return data.result;
};
