import { apiClient, ENDPOINT } from '@/lib/axios';
import { DormDay, DormMenu, DormTime } from '@/types';

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
  const response = await apiClient.get<FetchDormMenuRes>({
    request: ENDPOINT.DORM_MENU,
  });

  return response.data.result;
};
