import { getTranslations, getLocale } from 'next-intl/server';
import React from 'react';

import { fetchDormMenu } from '@/entities/dorm-menu/api/fetchDormMenu';

import { Section } from '@/shared/ui';
import { Card } from '@/shared/ui';

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

export default async function DormMenuSection({ date }: DormMenuSectionProps) {
  const dormMenu = await fetchDormMenu();
  const tDorm = await getTranslations('dorm');
  const locale = await getLocale();

  const currentDay = date;
  const todayDormMenu = dormMenu && dormMenu[currentDay];

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
    <Section.Content>
      <Card className='h-70'>
        <Card.Header>
          {tDorm('breakfast')} <span className='font-tossFace'>☀️</span>
        </Card.Header>
        <Card.Content>{renderMenuItems([], locale)}</Card.Content>
      </Card>
      <Card>
        <Card.Header>
          {tDorm('lunch')} <span className='font-tossFace'>🍽️</span>{' '}
        </Card.Header>
        <Card.Content>
          {renderMenuItems(dormMenuByTime('LUNCH'), locale)}
        </Card.Content>
      </Card>
      <Card>
        <Card.Header>
          {tDorm('dinner')} <span className='font-tossFace'>🌙</span>
        </Card.Header>
        <Card.Content>
          {renderMenuItems(dormMenuByTime('DINNER'), locale)}
        </Card.Content>
      </Card>
    </Section.Content>
  );
}
