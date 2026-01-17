'use client';

import React from 'react';
import useSWR from 'swr';

import { fetchDormMenu } from '@/entities/dorm-menu/api/fetchDormMenu';

import { KEY } from '@/shared/config';
import { AnimatedCard, Section, Card } from '@/shared/ui';

import {
  type DormTime,
  type DormDay,
  getFallbackMenu,
  renderMenuItems,
  isWeekend,
} from '../model';

interface DormMenuSectionProps {
  date: DormDay;
}

export default function DormMenuSection({ date }: DormMenuSectionProps) {
  const { data: dormMenu } = useSWR(KEY.DORM_MENU, fetchDormMenu, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const currentDay = date;
  const todayDormMenu = dormMenu?.[currentDay];

  const dormMenuByTime = (time: DormTime) => {
    if (!dormMenu) return getFallbackMenu(false);

    if (isWeekend(currentDay)) {
      return getFallbackMenu(true);
    }

    if (dormMenu[currentDay] === undefined) {
      return getFallbackMenu(false);
    }

    if (!todayDormMenu || todayDormMenu[time] === undefined) {
      return getFallbackMenu(false);
    }

    return todayDormMenu[time].contents || [];
  };

  return (
    <Section.Content>
      <AnimatedCard index={0}>
        <Card className='min-h-70 h-fit'>
          <Card.Header>
            점심 <span className='font-tossFace'>🍽️</span>{' '}
          </Card.Header>
          <Card.Content>
            {renderMenuItems(dormMenuByTime('LUNCH'), 'ko')}
          </Card.Content>
        </Card>
      </AnimatedCard>
      <AnimatedCard index={1}>
        <Card className='min-h-70 h-fit'>
          <Card.Header>
            저녁 <span className='font-tossFace'>🌙</span>
          </Card.Header>
          <Card.Content>
            {renderMenuItems(dormMenuByTime('DINNER'), 'ko')}
          </Card.Content>
        </Card>
      </AnimatedCard>
    </Section.Content>
  );
}
