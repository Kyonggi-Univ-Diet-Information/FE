'use client';

import React from 'react';
import useSWR from 'swr';

import { AnimatedCard, Section, Card } from '@/components/common';

import { fetchDormMenuByDay } from '@/api/dorm/fetchDormMenuByDay';

import { menuKeys } from '@/model/common/queryKey';
import {
  DormDay,
  DormTime,
  getFallbackMenu,
  isWeekend,
  renderMenuItems,
} from '@/model/dorm';

interface DormMenuSectionProps {
  date: DormDay;
}

export default function DormMenuSection({ date }: DormMenuSectionProps) {
  const { data: dormMenu } = useSWR(
    menuKeys.dormByDay(date),
    () => fetchDormMenuByDay(date),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const todayDormMenu = dormMenu?.diet;

  const dormMenuByTime = (time: DormTime) => {
    if (!dormMenu) return getFallbackMenu(false);

    if (isWeekend(date)) {
      return getFallbackMenu(true);
    }

    if (!todayDormMenu || todayDormMenu[time] === undefined) {
      return getFallbackMenu(false);
    }

    return todayDormMenu[time].contents || [];
  };

  return (
    <Section.Content className='mb-10 h-fit overflow-x-scroll overflow-y-hidden'>
      <AnimatedCard index={0}>
        <Card className='h-fit min-h-70'>
          <Card.Header>
            아침 <span className='font-tossFace'>☀️</span>{' '}
          </Card.Header>
          <Card.Content>
            {renderMenuItems(dormMenuByTime('BREAKFAST'), 'ko')}
          </Card.Content>
        </Card>
      </AnimatedCard>
      <AnimatedCard index={1}>
        <Card className='h-fit min-h-70'>
          <Card.Header>
            점심 <span className='font-tossFace'>🍽️</span>{' '}
          </Card.Header>
          <Card.Content>
            {renderMenuItems(dormMenuByTime('LUNCH'), 'ko')}
          </Card.Content>
        </Card>
      </AnimatedCard>
      <AnimatedCard index={2}>
        <Card className='h-fit min-h-70'>
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
