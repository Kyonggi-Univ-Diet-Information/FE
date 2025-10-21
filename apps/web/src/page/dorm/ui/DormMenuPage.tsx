import { DormMenuByDay } from '@/entities/dorm-menu';
import {
  DORM_DAY,
  DORM_DAY_EN,
  DORM_DAY_KEY,
  DORM_DAY_SHORT,
  DORM_DAY_SHORT_EN,
} from '@/entities/dorm-menu/model';
import { getWeekDates, getWeekStart } from '@/shared/lib/date';
import { Section, StaticTabNavigation } from '@/shared/ui';
import { getLocale, getTranslations } from 'next-intl/server';

export interface DormMenuPageProps {
  params: Promise<{ day: number }>;
}

export default async function DormMenuPage({ params }: DormMenuPageProps) {
  const t = await getTranslations('dorm');
  const tHome = await getTranslations('home');
  const locale = await getLocale();

  const today = new Date();
  const { day = today.getDay() } = await params;

  const weekStart = getWeekStart(today);
  const monday = new Date(weekStart);
  monday.setDate(weekStart.getDate());

  const weekDates = getWeekDates(monday);

  const dayShortNames = locale === 'en' ? DORM_DAY_SHORT_EN : DORM_DAY_SHORT;

  const dayNames = locale === 'en' ? DORM_DAY_EN : DORM_DAY;

  const tabs = Object.keys(DORM_DAY_KEY).map(day => ({
    key: day,
    label: dayShortNames[DORM_DAY_KEY[Number(day)]],
    href: `/dorm/${day}`,
  }));

  const formattedDate = weekDates[day].toLocaleDateString(
    locale === 'en' ? 'en-US' : 'ko-KR',
    {
      month: 'long',
      day: 'numeric',
    },
  );

  return (
    <Section>
      <Section.Header
        title={
          <>
            {t('pageTitle')} <span className='text-point'>{t('thisWeek')}</span>{' '}
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
          <DormMenuByDay day={day} />
        </div>
      </Section.Content>
    </Section>
  );
}
