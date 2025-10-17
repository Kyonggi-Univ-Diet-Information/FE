import { ENDPOINT } from '@/shared/config';
import type { DormDay } from '../model/dormDay';
import type { DormMenu } from '../model/dormMenu';
import type { DormTime } from '../model/dormTime';
import { Http } from '@/shared/api/http';

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
    request: ENDPOINT.DORM_MENU_BY_DAY + day,
    cache: 'force-cache',
  });
  return data.result;
};
