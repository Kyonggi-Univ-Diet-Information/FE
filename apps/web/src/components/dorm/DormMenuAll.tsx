'use client';

import React from 'react';

import { AnimatedCard, Section, Card } from '@/components/common';
import DormNoDataMessage from '@/components/dorm/DormNoDataMessage';

import type { DormDayMenu } from '@/api/dorm/api.type';

import {
  DormDay,
  DormTime,
  getFallbackMenu,
  isWeekend,
  renderMenuItems,
} from '@/model/dorm';

interface DormMenuSectionProps {
  date: DormDay;
  dayMenu: DormDayMenu | null;
}

export default function DormMenuSection({ date, dayMenu }: DormMenuSectionProps) {
  const dormMenuByTime = (time: DormTime) => {
    if (isWeekend(date)) return getFallbackMenu('weekend');
    if (!dayMenu || dayMenu[time] === undefined) {
      return null;
    }
    return dayMenu[time].contents || [];
  };

  const renderContent = (time: DormTime) => {
    const menu = dormMenuByTime(time);
    if (menu === null) return <DormNoDataMessage day={new Date().getDay()} />;
    return renderMenuItems(menu, 'ko');
  };

  return (
    <Section.Content className='mb-10 h-fit overflow-x-scroll overflow-y-hidden'>
      <AnimatedCard index={0}>
        <Card className='h-fit min-h-70'>
          <Card.Header>
            아침 <span className='font-tossFace'>☀️</span>{' '}
          </Card.Header>
          <Card.Content>{renderContent('BREAKFAST')}</Card.Content>
        </Card>
      </AnimatedCard>
      <AnimatedCard index={1}>
        <Card className='h-fit min-h-70'>
          <Card.Header>
            점심 <span className='font-tossFace'>🍽️</span>{' '}
          </Card.Header>
          <Card.Content>{renderContent('LUNCH')}</Card.Content>
        </Card>
      </AnimatedCard>
      <AnimatedCard index={2}>
        <Card className='h-fit min-h-70'>
          <Card.Header>
            저녁 <span className='font-tossFace'>🌙</span>
          </Card.Header>
          <Card.Content>{renderContent('DINNER')}</Card.Content>
        </Card>
      </AnimatedCard>
    </Section.Content>
  );
}
