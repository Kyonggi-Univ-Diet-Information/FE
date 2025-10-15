import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

import {
  CampusMenuSection,
  DormMenuDateModal,
  DormMenuSection,
} from '@/features/menu/components';
import type { DormDay } from '@/types';
import { Suspense } from 'react';

function MenuSectionsSkeleton() {
  return (
    <>
      <div className='h-80 animate-pulse rounded-2xl bg-gray-100' />
      <div className='h-32 animate-pulse rounded-2xl bg-gray-100' />
      <div className='h-80 animate-pulse rounded-2xl bg-gray-100' />
    </>
  );
}

interface HomeProps {
  searchParams: Promise<{ modal?: string; date?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { modal, date } = await searchParams;

  const isModal = modal === 'open' ? true : false;

  return (
    <>
      <div className='scrollbar-hide pb-26 absolute inset-0 flex flex-col gap-8 overflow-y-scroll p-4 pt-6 focus:outline-none'>
        <Suspense fallback={<MenuSectionsSkeleton />}>
          <CampusMenuSection />
          <ReviewLinkButton />
          <DormMenuSection date={date as DormDay} />
        </Suspense>
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
