import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import { menuKeys } from '@/model/common/queryKey';
import type { DormDay } from '@/model/dorm/dormDay';
import type { DormMenu } from '@/model/dorm/dormMenu';
import type { DormTime } from '@/model/dorm/dormTime';

export interface FetchDormMenuRes {
  result: {
    [key in DormDay]: {
      [key in DormTime]: {
        id: number;
        date: string;
        time: DormTime;
        contents: DormMenu[];
      };
    };
  };
}

export const fetchDormMenu = async (): Promise<FetchDormMenuRes['result']> => {
  const data = await Http.get<FetchDormMenuRes>({
    request: ENDPOINT.DORM.DORM_MENU,
    cache: 'force-cache',
    next: { tags: [menuKeys.dorm.tag()] },
  });
  return data.result;
};
