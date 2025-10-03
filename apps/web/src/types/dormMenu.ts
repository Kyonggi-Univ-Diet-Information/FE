import { DORM_DAY, DORM_TIME } from '@/lib/constants';

export type DormMenu = {
  id: number;
  dietFoodDTO: {
    id: number;
    name: string;
    nameEn: string;
    type: string | null;
  };
};

export type DormTime = keyof typeof DORM_TIME;
export type DormDay = keyof typeof DORM_DAY;
