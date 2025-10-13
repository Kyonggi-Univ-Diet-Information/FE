import { cache } from 'react';
import { MenuSection, TabNavigation } from '@/components/common';
import { DORM_DAY, DORM_DAY_KEY, DORM_DAY_NAME } from '@/lib/constants';
import { DormDay, DormTime } from '@/types';
import { fetchDormMenu } from '@/features/menu/services';
import { MenuCard } from '@/features/menu/components';
import {
  isWeekend,
  getFallbackMenu,
  renderMenuItems,
} from '@/features/menu/utils';

interface DormPageProps {
  searchParams: Promise<{ date?: DormDay }>;
}

const getWeekDates = cache(() => {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);

  const weekDates: Record<DormDay, Date> = {
    MONDAY: new Date(monday.getTime()),
    TUESDAY: new Date(monday.getTime() + 1 * 24 * 60 * 60 * 1000),
    WEDNESDAY: new Date(monday.getTime() + 2 * 24 * 60 * 60 * 1000),
    THURSDAY: new Date(monday.getTime() + 3 * 24 * 60 * 60 * 1000),
    FRIDAY: new Date(monday.getTime() + 4 * 24 * 60 * 60 * 1000),
    SATURDAY: new Date(monday.getTime() + 5 * 24 * 60 * 60 * 1000),
    SUNDAY: new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000),
  };

  return weekDates;
});

export default async function DormPage({ searchParams }: DormPageProps) {
  const { date = DORM_DAY_KEY[1] } = await searchParams;
  const weekDates = getWeekDates();
  const dormMenu = await fetchDormMenu();

  const tabs = DORM_DAY_NAME.map(day => ({
    key: day,
    label: DORM_DAY[day],
    href: `/dorm?date=${day}`,
  }));

  const formattedDate = weekDates[date].toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });

  const todayDormMenu = dormMenu && dormMenu[date];

  const dormMenuByTime = (time: DormTime) => {
    if (!dormMenu) return getFallbackMenu(false);

    if (isWeekend(date)) {
      return getFallbackMenu(true);
    }

    if (dormMenu[date] === undefined) {
      return getFallbackMenu(false);
    }

    if (todayDormMenu[time] === undefined) {
      return getFallbackMenu(false);
    }

    return todayDormMenu[time].contents || [];
  };

  return (
    <>
      <MenuSection>
        <MenuSection.Header
          title={
            <>
              경기드림타워 <span className='text-point'>이번 주</span>{' '}
              <span className='font-tossFace'>📅</span> <span>식단</span>
            </>
          }
          subtitle='이번 주 경기드림타워 식단을 확인해보세요.'
        />
        <MenuSection.Content className='flex flex-col gap-4'>
          <TabNavigation tabs={tabs} paramName='date' />
          <p className='text-center font-semibold'>
            {formattedDate}{' '}
            <span className='text-point font-wantedSans'>{DORM_DAY[date]}</span>
            의 식단<span className='font-tossFace'> 🍚</span>
          </p>

          <div className='flex flex-col gap-3'>
            <MenuCard>
              <MenuCard.Header>
                아침 <span className='font-tossFace'>☀️</span>
              </MenuCard.Header>
              <MenuCard.Content>
                {renderMenuItems(dormMenuByTime('BREAKFAST'))}
              </MenuCard.Content>
            </MenuCard>
            <MenuCard>
              <MenuCard.Header>
                점심 <span className='font-tossFace'>🍽️</span>
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
          </div>
        </MenuSection.Content>
      </MenuSection>
    </>
  );
}
