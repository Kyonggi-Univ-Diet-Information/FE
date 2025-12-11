import { getLocale, getTranslations } from 'next-intl/server';

import { DormMenuByDay } from '@/entities/dorm-menu';
import {
  DORM_DAY,
  DORM_DAY_EN,
  DORM_DAY_KEY,
  DORM_DAY_SHORT,
  DORM_DAY_SHORT_EN,
} from '@/entities/dorm-menu/model';

import { getCampusMainTabs } from '@/shared/lib/campus';
import { getWeekDates, getWeekStart } from '@/shared/lib/date';
import { Section, StaticTabNavigation } from '@/shared/ui';

export interface DormMenuPageProps {
  params: Promise<{ day: number }>;
}

export default async function DormMenuPage({ params }: DormMenuPageProps) {
  const t = await getTranslations('dorm');
  const tNav = await getTranslations('navigation');
  const locale = await getLocale();

  const todayDate = new Date();
  const { day = todayDate.getDay() } = await params;

  const weekStart = getWeekStart(todayDate);
  const monday = new Date(weekStart);
  monday.setDate(weekStart.getDate());

  const weekDates = getWeekDates(monday);

  const dayShortNames = locale === 'en' ? DORM_DAY_SHORT_EN : DORM_DAY_SHORT;
  const dayNames = locale === 'en' ? DORM_DAY_EN : DORM_DAY;

  const mainTabs = getCampusMainTabs(locale, tNav('dorm'), todayDate.getDay());
  const dayTabs = Object.keys(DORM_DAY_KEY).map(day => ({
    key: day,
    label: dayShortNames[DORM_DAY_KEY[Number(day)]],
    href: `/campus/dorm/${day}`,
  }));

  const formattedDate = weekDates[day].toLocaleDateString(
    locale === 'en' ? 'en-US' : 'ko-KR',
    {
      month: 'long',
      day: 'numeric',
    },
  );

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
        subtitle={t('subtitle')}
      />
      <Section>
        <Section.Content className='flex flex-col gap-4'>
          <StaticTabNavigation tabs={dayTabs} currentTabKey={String(day)} />
          <p className='text-center font-semibold'>
            {formattedDate}{' '}
            <span className='text-point font-wantedSans'>
              {dayNames[DORM_DAY_KEY[day]]}
            </span>
            {t('menuOf')}
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
