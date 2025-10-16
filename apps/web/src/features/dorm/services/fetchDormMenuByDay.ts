import { ENDPOINT } from '@/lib/axios';
import type { DormDay, DormMenu, DormTime } from '@/types';
import { notFound } from 'next/navigation';

interface FetchDormMenuRes {
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
): Promise<FetchDormMenuRes['result']> => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';
  const response = await fetch(`${apiUrl}${ENDPOINT.DORM_MENU_BY_DAY}${day}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });

  if (!response.ok) {
    notFound();
  }

  const data: FetchDormMenuRes = await response.json();

  return data.result;
};
