import { ENDPOINT } from '@/lib/axios';
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
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';
  const response = await fetch(`${apiUrl}${ENDPOINT.DORM_MENU}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch dorm menu');
  }

  const data = await response.json();

  return data.result;
};
