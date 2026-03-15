import { ENDPOINT } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import type { DormDay } from '@/model/dorm/dormDay';
import type { DormMenu } from '@/model/dorm/dormMenu';
import type { DormTime } from '@/model/dorm/dormTime';

export interface FetchDormMenuByDayRes {
  result: {
    dayOfWeek: DormDay;
    diet: {
      [key in DormTime]: {
        id: number;
        date: string;
        time: DormTime;
        contents: DormMenu[];
      };
    };
  };
}

export const fetchDormMenuByDay = async (
  day: DormDay,
): Promise<FetchDormMenuByDayRes['result']> => {
  const data = await Http.get<FetchDormMenuByDayRes>({
    request: ENDPOINT.DORM.DORM_MENU_BY_DAY(day),
    cache: 'force-cache',
    next: {
      revalidate: 60 * 60 * 2,
    },
  });
  return data.result;
};
