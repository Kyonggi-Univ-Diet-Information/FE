import { DormDay, DormTime } from '@/types';

export const DORM_TIME = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
};

export const DORM_DAY = {
  MONDAY: '월요일',
  TUESDAY: '화요일',
  WEDNESDAY: '수요일',
  THURSDAY: '목요일',
  FRIDAY: '금요일',
  SATURDAY: '토요일',
  SUNDAY: '일요일',
};

export const DORM_DAY_KEY: Record<number, DormDay> = {
  0: 'SUNDAY',
  1: 'MONDAY',
  2: 'TUESDAY',
  3: 'WEDNESDAY',
  4: 'THURSDAY',
  5: 'FRIDAY',
  6: 'SATURDAY',
};

export const DORM_TIME_NAME = Object.keys(DORM_TIME) as DormTime[];
export const DORM_DAY_NAME = Object.keys(DORM_DAY) as DormDay[];
