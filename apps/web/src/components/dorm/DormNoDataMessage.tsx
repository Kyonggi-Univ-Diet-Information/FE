'use client';

import { MENU_MESSAGES } from '@/model/dorm/menu';

export default function DormNoDataMessage({ day }: { day: number }) {
  const isPast = new Date().getDay() > day;
  const message = isPast
    ? MENU_MESSAGES.NOT_UPDATED.dietFoodDTO.name
    : MENU_MESSAGES.COMING_SOON.dietFoodDTO.name;

  return <p className='text-gray-600'>{message}</p>;
}
