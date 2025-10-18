import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/shared/i18n/routing';

import {
  DORM_DAY,
  DORM_DAY_EN,
  DORM_DAY_KEY,
  type DormDay,
} from '@/entities/dorm-menu/model/dormDay';
import { Section } from '@/shared/ui';
import { CampusMenuAll } from '@/entities/campus-menu';
import { DormMenuAll } from '@/entities/dorm-menu';
import DaySelectModal from './DaySelectModal';
import NavigationButton from './NavigationButton';
import {
  getAdjacentDates,
  isSaturday,
  isSunday,
} from '@/entities/dorm-menu/model';
import { getCurrentDate } from '@/shared/lib/date';

export interface HomeProps {
  searchParams: Promise<{ modal?: string; date?: string }>;
}

// function MenuSectionsSkeleton() {
//   return (
//     <>
//       <div className='h-80 animate-pulse rounded-2xl bg-gray-100/20' />
//       <div className='h-32 animate-pulse rounded-2xl bg-gray-100/20' />
//       <div className='h-80 animate-pulse rounded-2xl bg-gray-100/20' />
//     </>
//   );
// }

export default async function HomePage({ searchParams }: HomeProps) {
  const { modal, date } = await searchParams;
  const isModal = modal === 'open' ? true : false;
  const t = await getTranslations('home');
  const locale = await getLocale();

  const getWeekDateString = (date?: DormDay) => {
    if (!date) return locale === 'en' ? 'Today' : '오늘';
    return locale === 'en' ? DORM_DAY_EN[date] : DORM_DAY[date];
  };

  const today = getCurrentDate().getDay();
  const currentDay = (date as DormDay) || DORM_DAY_KEY[today];
  const { yesterday, tomorrow } = getAdjacentDates(currentDay);
  const isCurrentDaySunday = isSunday(currentDay);
  const isCurrentDaySaturday = isSaturday(currentDay);

  return (
    <>
      <div className='scrollbar-hide pb-26 absolute inset-0 flex flex-col gap-8 overflow-y-scroll p-4 pt-6 focus:outline-none'>
        <Section>
          <Section.Header
            title={
              <>
                {t('campusTitle')}{' '}
                <span className='text-point'>{t('campusHighlight')}</span>{' '}
                {t('campusTitleLast')}
                <span className='font-tossFace'> 🍚</span>
              </>
            }
            subtitle={t('campusSubtitle')}
            action={
              <Link
                prefetch
                href='/campus/1'
                className='text-sm underline hover:text-gray-600'
              >
                {t('campusAllView')}
              </Link>
            }
          />
          <Section.Content>
            <CampusMenuAll />
          </Section.Content>
        </Section>
        <ReviewLinkButton />
        <Section>
          <Section.Header
            title={
              <>
                <span className='text-point'>{t('dormHighlight')}</span>{' '}
                <br className={locale === 'en' ? '' : 'hidden'} />
                <Link
                  replace
                  href='?modal=open'
                  className='cursor-pointer underline hover:text-gray-600 active:text-gray-600'
                >
                  {getWeekDateString(currentDay)}
                </Link>
                {t('dormTitleLast')}
                <span className='font-tossFace'> 🍚</span>
              </>
            }
            subtitle={t('dormSubtitle')}
            action={
              <div className='flex gap-x-2'>
                <NavigationButton
                  href={`/?date=${yesterday}`}
                  disabled={isCurrentDaySunday}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='lucide lucide-chevron-left size-5'
                  >
                    <path d='m15 18-6-6 6-6'></path>
                  </svg>
                </NavigationButton>
                <NavigationButton
                  href={`/?date=${tomorrow}`}
                  disabled={isCurrentDaySaturday}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='lucide lucide-chevron-right size-5'
                  >
                    <path d='m9 18 6-6-6-6'></path>
                  </svg>
                </NavigationButton>
              </div>
            }
          />
          <DormMenuAll date={currentDay} />
        </Section>
      </div>
      {isModal && <DaySelectModal />}
    </>
  );
}

async function ReviewLinkButton() {
  const t = await getTranslations('home');

  return (
    <Link
      href='/review'
      className='flex cursor-pointer flex-col rounded-2xl bg-gray-100/50 px-6 py-6 transition-all duration-300 active:bg-gray-100 md:px-8'
    >
      <p className='text-lg font-bold'>
        {t('reviewPrompt')}
        <span className='font-tossFace'> 😋</span>
      </p>
      <p>{t('reviewDescription')}</p>
    </Link>
  );
}
