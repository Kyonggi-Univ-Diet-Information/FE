import Link from 'next/link';
import React from 'react';

import type { DormDay, DormTime } from '@/types';
import { DORM_DAY, DORM_DAY_KEY } from '@/lib/constants';
import { getCurrentDate } from '@/lib/utils';

import { MenuSection } from '@/components/common';

import { MenuCard, NavigationButton } from '@/features/menu/components';
import { FetchDormMenuRes } from '@/features/menu/services';
import {
  getAdjacentDates,
  isSunday,
  isSaturday,
  isWeekend,
  getFallbackMenu,
  renderMenuItems,
} from '@/features/menu/utils';
import { useTranslations, useLocale } from 'next-intl';

interface DormMenuSectionProps {
  date?: DormDay;
  dormMenu: FetchDormMenuRes['result'];
}

export default function DormMenuSection({
  date,
  dormMenu,
}: DormMenuSectionProps) {
  const tDorm = useTranslations('dorm');
  const t = useTranslations('home');
  const locale = useLocale();
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

    if (dormMenu[currentDay] === undefined) {
      return getFallbackMenu(false);
    }

    if (todayDormMenu[time] === undefined) {
      return getFallbackMenu(false);
    }

    return todayDormMenu[time].contents || [];
  };

  return (
    <MenuSection>
      <MenuSection.Header
        title={
          <>
            <span className='text-point'>{t('dormHighlight')}</span>{' '}
            <br className={locale === 'en' ? '' : 'hidden'} />
            <Link
              replace
              href='?modal=open'
              className='cursor-pointer underline hover:text-gray-600 active:text-gray-600'
            >
              {weekDateString}
            </Link>
            {t('dormTitleLast')}
            <span className='font-tossFace'> 🍚</span>
          </>
        }
        subtitle={t('dormSubtitle')}
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
            {tDorm('breakfast')} <span className='font-tossFace'>☀️</span>
          </MenuCard.Header>
          <MenuCard.Content>{renderMenuItems([], locale)}</MenuCard.Content>
        </MenuCard>
        <MenuCard>
          <MenuCard.Header>
            {tDorm('lunch')} <span className='font-tossFace'>🍽️</span>{' '}
          </MenuCard.Header>
          <MenuCard.Content>
            {renderMenuItems(dormMenuByTime('LUNCH'), locale)}
          </MenuCard.Content>
        </MenuCard>
        <MenuCard>
          <MenuCard.Header>
            {tDorm('dinner')} <span className='font-tossFace'>🌙</span>
          </MenuCard.Header>
          <MenuCard.Content>
            {renderMenuItems(dormMenuByTime('DINNER'), locale)}
          </MenuCard.Content>
        </MenuCard>
      </MenuSection.Content>
    </MenuSection>
  );
}
