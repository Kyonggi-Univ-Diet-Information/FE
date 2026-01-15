import { DormMenuByDay } from '@/entities/dorm-menu';
import {
  DORM_DAY,
  DORM_DAY_KEY,
  DORM_DAY_SHORT,
} from '@/entities/dorm-menu/model';

import { getCampusMainTabs } from '@/shared/lib/campus';
import { getWeekDates, getWeekStart } from '@/shared/lib/date';
import { Section, StaticTabNavigation } from '@/shared/ui';

export interface DormMenuPageProps {
  params: Promise<{ day: number }>;
}

export default async function DormMenuPage({ params }: DormMenuPageProps) {
  const todayDate = new Date();
  const { day = todayDate.getDay() } = await params;

  const weekStart = getWeekStart(todayDate);
  const monday = new Date(weekStart);
  monday.setDate(weekStart.getDate());

  const weekDates = getWeekDates(monday);

  const dayShortNames = DORM_DAY_SHORT;
  const dayNames = DORM_DAY;

  const mainTabs = getCampusMainTabs('ko', '기숙사', todayDate.getDay());
  const dayTabs = Object.keys(DORM_DAY_KEY).map(day => ({
    key: day,
    label: dayShortNames[DORM_DAY_KEY[Number(day)]],
    href: `/campus/dorm/${day}`,
  }));

  const formattedDate = weekDates[day].toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Section.Header
        title={
          <StaticTabNavigation
            tabs={mainTabs}
            currentTabKey='dorm'
            variant='header'
          />
        }
        subtitle="이번 주 경기드림타워 메뉴를 확인하세요!"
      />
      <Section>
        <Section.Content className='flex flex-col gap-4'>
          <StaticTabNavigation tabs={dayTabs} currentTabKey={String(day)} />
          <p className='text-center font-semibold'>
            {formattedDate}{' '}
            <span className='text-point font-wantedSans'>
              {dayNames[DORM_DAY_KEY[day]]}
            </span>
            의 식단
            <span className='font-tossFace'> 🍚</span>
          </p>
          <div className='flex flex-col gap-3'>
            <DormMenuByDay day={day} />
          </div>
        </Section.Content>
      </Section>
    </>
  );
}
