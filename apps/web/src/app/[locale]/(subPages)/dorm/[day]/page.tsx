import { MenuSection, StaticTabNavigation } from '@/shared/ui';
import { fetchDormMenuByDay } from '@/features/dorm/services';
import { MenuCard } from '@/features/menu/components';
import {
  getFallbackMenu,
  isWeekend,
  renderMenuItems,
} from '@/features/menu/utils';
import { DORM_DAY, DORM_DAY_EN, DORM_DAY_KEY } from '@/lib/constants';
import { getWeekDates, getWeekStart } from '@/shared/lib/date';
import type { DormTime } from '@/types';
import { getLocale, getTranslations } from 'next-intl/server';

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ['ko', 'en'];
  const days = Object.keys(DORM_DAY_KEY);

  return locales.flatMap(locale =>
    days.map(day => ({
      locale,
      day,
    })),
  );
}

export default async function DormPage({
  params,
}: {
  params: Promise<{ day: number }>;
}) {
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
      <MenuSection>
        <MenuSection.Header
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
        <MenuSection.Content className='flex flex-col gap-4'>
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
            <MenuCard>
              <MenuCard.Header>
                {t('breakfast')} <span className='font-tossFace'>☀️</span>
              </MenuCard.Header>
              <MenuCard.Content>
                {renderMenuItems(dormMenuByTime('BREAKFAST'), locale)}
              </MenuCard.Content>
            </MenuCard>
            <MenuCard>
              <MenuCard.Header>
                {t('lunch')} <span className='font-tossFace'>🍽️</span>
              </MenuCard.Header>
              <MenuCard.Content>
                {renderMenuItems(dormMenuByTime('LUNCH'), locale)}
              </MenuCard.Content>
            </MenuCard>
            <MenuCard>
              <MenuCard.Header>
                {t('dinner')} <span className='font-tossFace'>🌙</span>
              </MenuCard.Header>
              <MenuCard.Content>
                {renderMenuItems(dormMenuByTime('DINNER'), locale)}
              </MenuCard.Content>
            </MenuCard>
          </div>
        </MenuSection.Content>
      </MenuSection>
    </>
  );
}
