import { ENDPOINT } from '@/shared/config';
import type { DormDay } from '../model/dormDay';
import type { DormMenu } from '../model/dormMenu';
import type { DormTime } from '../model/dormTime';
import { Http } from '@/shared/api/http';

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
  });
  return data.result;
};
