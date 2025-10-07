import Link from 'next/link';
import React from 'react';

import type { DormDay, DormTime } from '@/types';
import { DORM_DAY, DORM_DAY_KEY } from '@/lib/constants';
import { MenuSection } from '@/components/common';
import { getCurrentDate } from '@/lib/utils/date';

import { MenuCard, NavigationButton } from '@/features/menu/components';
import { fetchDormMenu } from '@/features/menu/services';
import {
  getAdjacentDates,
  isSunday,
  isSaturday,
  isWeekend,
  getFallbackMenu,
  renderMenuItems,
} from '@/features/menu/utils';

interface DormMenuSectionProps {
  date?: DormDay;
}

export default async function DormMenuSection({ date }: DormMenuSectionProps) {
  const dormMenu = await fetchDormMenu();
  const today = getCurrentDate().getDay();
  const currentDay = date || DORM_DAY_KEY[today];
  const todayDormMenu = dormMenu && dormMenu[currentDay];
  const weekDateString = date ? DORM_DAY[date] : '오늘';

  const { yesterday, tomorrow } = getAdjacentDates(currentDay);
  const isCurrentDaySunday = isSunday(currentDay);
  const isCurrentDaySaturday = isSaturday(currentDay);

  const dormMenuByTime = (time: DormTime) => {
    if (!dormMenu) return getFallbackMenu(false);

    if (isWeekend(currentDay)) {
      return getFallbackMenu(true);
    }

    return todayDormMenu[time].contents || [];
  };

  return (
    <MenuSection>
      <MenuSection.Header
        title={
          <>
            <span className='text-point'>경기드림타워</span>{' '}
            <Link
              replace
              href='?modal=open'
              className='cursor-pointer underline hover:text-gray-600 active:text-gray-600'
            >
              {weekDateString}
            </Link>
            의 메뉴
            <span className='font-tossFace'> 🍚</span>
          </>
        }
        subtitle='이번 주 경기드림타워 식단을 확인해보세요.'
        action={
          <div className='flex gap-x-2'>
            <NavigationButton
              href={`/?date=${yesterday}`}
              disabled={isCurrentDaySunday}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-chevron-left size-5'
              >
                <path d='m15 18-6-6 6-6'></path>
              </svg>
            </NavigationButton>
            <NavigationButton
              href={`/?date=${tomorrow}`}
              disabled={isCurrentDaySaturday}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-chevron-right size-5'
              >
                <path d='m9 18 6-6-6-6'></path>
              </svg>
            </NavigationButton>
          </div>
        }
      />
      <MenuSection.Content>
        <MenuCard className='h-70'>
          <MenuCard.Header>
            아침 <span className='font-tossFace'>☀️</span>
          </MenuCard.Header>
          <MenuCard.Content>{renderMenuItems([])}</MenuCard.Content>
        </MenuCard>
        <MenuCard>
          <MenuCard.Header>
            점심 <span className='font-tossFace'>🍽️</span>{' '}
          </MenuCard.Header>
          <MenuCard.Content>
            {renderMenuItems(dormMenuByTime('LUNCH'))}
          </MenuCard.Content>
        </MenuCard>
        <MenuCard>
          <MenuCard.Header>
            저녁 <span className='font-tossFace'>🌙</span>
          </MenuCard.Header>
          <MenuCard.Content>
            {renderMenuItems(dormMenuByTime('DINNER'))}
          </MenuCard.Content>
        </MenuCard>
      </MenuSection.Content>
    </MenuSection>
  );
}
