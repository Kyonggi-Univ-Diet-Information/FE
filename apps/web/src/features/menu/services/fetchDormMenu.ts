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

const secondsUntilNextMonday = () => {
  const now = new Date();
  const day = now.getDay();
  const diff = (8 - day) % 7;
  const nextMonday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + diff,
  );
  return Math.ceil((nextMonday.getTime() - now.getTime()) / 1000);
};

export const fetchDormMenu = async (): Promise<FetchDormMenuRes['result']> => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';
  const response = await fetch(`${apiUrl}${ENDPOINT.DORM_MENU}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    next: {
      revalidate: secondsUntilNextMonday(),
    },
  });

  const data = await response.json();

  return data.result;
};
