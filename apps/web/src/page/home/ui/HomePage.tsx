import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import { RESTAURANT_ID_BY_NAME } from '@/entities/campus-menu/model/campusRestaurant';
import { DormMenuAll, DormMenuAnimatedWrapper } from '@/entities/dorm-menu';
import {
  getAdjacentDates,
  isSaturday,
  isSunday,
} from '@/entities/dorm-menu/model';
import {
  DORM_DAY,
  DORM_DAY_EN,
  DORM_DAY_KEY,
  type DormDay,
} from '@/entities/dorm-menu/model/dormDay';

import { FOOD_COURT_ID } from '@/shared/config';
import { Link } from '@/shared/i18n/routing';
import { getCurrentDate } from '@/shared/lib/date';
import { AnimatedCard, Section } from '@/shared/ui';

import CarouselWrapper from './CarouselWrapper';
import DaySelectModal from './DaySelectModal';
import NavigationButton from './NavigationButton';

export interface HomeProps {
  searchParams: Promise<{ modal?: string; date?: string }>;
}

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

  const CampusFoodCourts = [
    {
      href: `/campus/${FOOD_COURT_ID.KYONGSUL}/${RESTAURANT_ID_BY_NAME.MANKWON}`,
      title: t('kyongsulang.title'),
      location: t('kyongsulang.location'),
      time: t('kyongsulang.time'),
    },
    {
      href: `/campus/${FOOD_COURT_ID.E_SQUARE}`,
      title: t('eSquare.title'),
      location: t('eSquare.location'),
      time: t('eSquare.time'),
    },
    {
      href: `/campus/${FOOD_COURT_ID.SALLY_BOX}`,
      title: t('sallyBox.title'),
      location: t('sallyBox.location'),
      time: t('sallyBox.time'),
    },
  ];

  return (
    <>
      <div className='scrollbar-hide pb-26 absolute inset-0 flex flex-col overflow-y-scroll focus:outline-none'>
        <Section className='relative z-0'>
          <CarouselWrapper>
            {CampusFoodCourts.map(campusFoodCourt => (
              <CampusFoodCourtCard
                key={campusFoodCourt.href}
                href={campusFoodCourt.href}
                title={campusFoodCourt.title}
                location={campusFoodCourt.location}
                time={campusFoodCourt.time}
                viewMenuText={t('viewMenu')}
                holidayClosedText={t('holidayClosed')}
              />
            ))}
          </CarouselWrapper>
        </Section>
        <div className='relative z-10 -mt-6 flex flex-col gap-8 rounded-t-3xl bg-white px-4 pt-8'>
          <Section>
            <ReviewLinkButton />
          </Section>
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
                    <ChevronLeft className='size-5 text-gray-700' />
                  </NavigationButton>
                  <NavigationButton
                    href={`/?date=${tomorrow}`}
                    disabled={isCurrentDaySaturday}
                  >
                    <ChevronRight className='size-5 text-gray-700' />
                  </NavigationButton>
                </div>
              }
            />
            <Section.Content>
              <DormMenuAnimatedWrapper currentDay={currentDay}>
                <DormMenuAll date={currentDay} />
              </DormMenuAnimatedWrapper>
            </Section.Content>
          </Section>
        </div>
      </div>
      {isModal && <DaySelectModal />}
    </>
  );
}

async function ReviewLinkButton() {
  const t = await getTranslations('home');
  const defaultReviewHref = `/review`;

  return (
    <Link
      href={defaultReviewHref}
      className='group -mb-2 -mt-2 cursor-pointer rounded-2xl bg-gray-100/50 px-2.5 py-1.5 transition-all duration-300 active:bg-gray-100'
    >
      <AnimatedCard index={0} animationType='spring'>
        <div className='flex items-center justify-between'>
          <div className='text-lg font-semibold group-hover:text-gray-900/60 group-active:text-gray-900/60'>
            <span className='font-tossFace'>😋&nbsp;&nbsp;</span>
            {t('reviewPrompt')}
          </div>
          <div className='flex items-center gap-1 text-sm text-gray-600 group-hover:text-gray-900/60 group-active:text-gray-900/60'>
            {t('reviewDescription')}
            <ChevronRight size={14} />
          </div>
        </div>
      </AnimatedCard>
    </Link>
  );
}

function CampusFoodCourtCard({
  href,
  title,
  location,
  time,
  viewMenuText,
  holidayClosedText,
}: {
  href: string;
  title: string;
  location: string;
  time: string;
  viewMenuText: string;
  holidayClosedText: string;
}) {
  return (
    <Link
      href={href}
      className='to-point/20 group flex w-screen min-w-0 flex-[0_0_100%] flex-shrink-0 flex-col bg-gradient-to-b from-white px-6 pb-20 pt-4'
    >
      <div className='flex h-full flex-col justify-between'>
        <div className='flex justify-end'>
          <div className='flex items-center gap-2 p-1 transition-all group-active:scale-[0.98] group-active:bg-gray-100/80'>
            <span className='text-sm text-gray-700'>{viewMenuText}</span>
            <ArrowRight className='size-4 text-gray-700' />
          </div>
        </div>

        <div className='space-y-2'>
          <div className='space-y-1'>
            <h3 className='text-2xl font-bold text-gray-900'>{title}</h3>
            <p className='text-sm text-gray-600'>{location}</p>
          </div>
          <div className='border-point/20 flex gap-2 border-t pt-2 text-sm text-gray-700'>
            <span className='font-medium'>{time}</span>
            <span className='text-gray-500'>•</span>
            <span>{holidayClosedText}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
