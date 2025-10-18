import { getLocale, getTranslations } from 'next-intl/server';

import { Section, StaticTabNavigation, Card } from '@/shared/ui';
import { getWeekDates, getWeekStart } from '@/shared/lib/date';

import { fetchDormMenuByDay } from '@/entities/dorm-menu/api/fetchDormMenuByDay';
import {
  getFallbackMenu,
  isWeekend,
  renderMenuItems,
  DORM_DAY,
  DORM_DAY_EN,
  DORM_DAY_KEY,
  type DormTime,
} from '@/entities/dorm-menu/model';

export interface DormMenuByDayProps {
  params: Promise<{ day: number }>;
}

export default async function DormMenuByDay({ params }: DormMenuByDayProps) {
  const today = new Date();
  const { day = today.getDay() } = await params;
  const weekStart = getWeekStart(today);
  const monday = new Date(weekStart);
  monday.setDate(weekStart.getDate());
  const weekDates = getWeekDates(monday);
  const dormMenu = await fetchDormMenuByDay(DORM_DAY_KEY[day]);
  const t = await getTranslations('dorm');
  const tHome = await getTranslations('home');
  const locale = await getLocale();

  const dayNames = locale === 'en' ? DORM_DAY_EN : DORM_DAY;

  const tabs = Object.keys(DORM_DAY_KEY).map(day => ({
    key: day,
    label: dayNames[DORM_DAY_KEY[Number(day)]],
    href: `/dorm/${day}`,
  }));

  const formattedDate = weekDates[day].toLocaleDateString(
    locale === 'en' ? 'en-US' : 'ko-KR',
    {
      month: 'long',
      day: 'numeric',
    },
  );

  const todayDormMenu = dormMenu && dormMenu.diet;

  const dormMenuByTime = (time: DormTime) => {
    if (!dormMenu) return getFallbackMenu(false);

    if (isWeekend(DORM_DAY_KEY[day])) {
      return getFallbackMenu(true);
    }

    if (dormMenu.diet === undefined) {
      return getFallbackMenu(false);
    }

    if (todayDormMenu[time] === undefined) {
      return getFallbackMenu(false);
    }

    return todayDormMenu[time].contents || [];
  };

  return (
    <>
      <Section>
        <Section.Header
          title={
            <>
              {t('pageTitle')}{' '}
              <span className='text-point'>{t('thisWeek')}</span>{' '}
              <span className='font-tossFace'>📅</span>{' '}
              <span>{t('weeklyMenu')}</span>
            </>
          }
          subtitle={tHome('dormSubtitle')}
        />
        <Section.Content className='flex flex-col gap-4'>
          <StaticTabNavigation tabs={tabs} currentTabKey={String(day)} />
          <p className='text-center font-semibold'>
            {formattedDate}{' '}
            <span className='text-point font-wantedSans'>
              {dayNames[DORM_DAY_KEY[day]]}
            </span>
            {t('menuOf')}
            <span className='font-tossFace'> 🍚</span>
          </p>

          <div className='flex flex-col gap-3'>
            <Card>
              <Card.Header>
                {t('breakfast')} <span className='font-tossFace'>☀️</span>
              </Card.Header>
              <Card.Content>
                {renderMenuItems(dormMenuByTime('BREAKFAST'), locale)}
              </Card.Content>
            </Card>
            <Card>
              <Card.Header>
                {t('lunch')} <span className='font-tossFace'>🍽️</span>
              </Card.Header>
              <Card.Content>
                {renderMenuItems(dormMenuByTime('LUNCH'), locale)}
              </Card.Content>
            </Card>
            <Card>
              <Card.Header>
                {t('dinner')} <span className='font-tossFace'>🌙</span>
              </Card.Header>
              <Card.Content>
                {renderMenuItems(dormMenuByTime('DINNER'), locale)}
              </Card.Content>
            </Card>
          </div>
        </Section.Content>
      </Section>
    </>
  );
}
