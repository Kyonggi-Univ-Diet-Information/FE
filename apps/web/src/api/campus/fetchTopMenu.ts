
import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

import { menuKeys } from '@/model/common/queryKey';

import type { FetchTopMenuResponse } from './api.model';
import type { CampusTopMenu } from './api.type';

export const fetchTopMenu = async (): Promise<FetchTopMenuResponse> => {
  const data = await Http.get<{ result: CampusTopMenu[] }>({
    request: ENDPOINT.MENU.TOP_MENU,
    cache: 'force-cache',
    next: { tags: [menuKeys.top.tag()], revalidate: 60 * 5 },
  });

  return data.result;
};
