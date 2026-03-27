import { DORM_DAY_KEY } from '@/model/dorm/dormDay';

export interface DormDayParams {
  day: string;
}

export function generateDormDayParams(): DormDayParams[] {
  const days = Object.keys(DORM_DAY_KEY);

  return days.map(day => ({
    day,
  }));
}
