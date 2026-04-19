'use client';

import { getWeekDates, getWeekStart } from '@/model/common/date';
import { DORM_DAY, DORM_DAY_KEY } from '@/model/dorm/dormDay';

export default function DormFormattedDate({ day }: { day: number }) {
  const today = new Date();
  const weekStart = getWeekStart(today);
  const monday = new Date(weekStart);
  monday.setDate(weekStart.getDate());
  const weekDates = getWeekDates(monday);

  const formattedDate = weekDates[day].toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <p className='text-center font-semibold'>
      {formattedDate}{' '}
      <span className='text-point font-wantedSans'>{DORM_DAY[DORM_DAY_KEY[day]]}</span>의
      식단
      <span className='font-tossFace'> 🍚</span>
    </p>
  );
}
