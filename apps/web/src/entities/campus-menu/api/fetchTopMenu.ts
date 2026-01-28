import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config';
import { menuKeys } from '@/shared/lib/queryKey';

import type { CampusTopMenu } from '../model/campusMenu';

export const fetchTopMenu = async (): Promise<CampusTopMenu[]> => {
  const data = await Http.get<{ result: CampusTopMenu[] }>({
    request: ENDPOINT.MENU.TOP_MENU,
    cache: 'force-cache',
    next: { tags: [menuKeys.top.tag()], revalidate: 60 * 5 },
  });

  return data.result;
};
