import { getTranslations } from 'next-intl/server';
import { Link } from '@/shared/i18n/routing';

import { DormMenuDateModal } from '@/features/menu/components';
import type { DormDay } from '@/entities/dorm-menu/model/dormDay';
import { Section } from '@/shared/ui';
import { CampusMenuAll } from '@/entities/campus-menu';
import { DormMenuAll } from '@/entities/dorm-menu';

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
        <DormMenuAll date={date as DormDay} />
      </div>
      {isModal && <DormMenuDateModal />}
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
