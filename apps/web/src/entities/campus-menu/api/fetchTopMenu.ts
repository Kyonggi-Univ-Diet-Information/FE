import { Http } from '@/shared/api/http';
import { ENDPOINT, KEY } from '@/shared/config';

import type { CampusTopMenu } from '../model/campusMenu';

export const fetchTopMenu = async (): Promise<CampusTopMenu[]> => {
  const data = await Http.get<{ result: CampusTopMenu[] }>({
    request: ENDPOINT.MENU.TOP_MENU,
    cache: 'force-cache',
    next: { tags: [KEY.TOP_MENU], revalidate: 60 * 5 },
  });

  return data.result;
};
