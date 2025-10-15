import { Fragment } from 'react';
import { getTranslations, getLocale } from 'next-intl/server';

import { fetchCampusMenu } from '@/features/menu/services';

import {
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_NAME,
  CAMPUS_RESTAURANT_NAME_EN,
} from '@/lib/constants';
import { TabNavigation, MenuSection } from '@/components/common';
import type { SubRestaurant } from '@/types';

import { CampusMenuView } from '@/features/campus/components';

interface CampusPageProps {
  searchParams: Promise<{ restaurant?: string }>;
}

export default async function CampusPage({ searchParams }: CampusPageProps) {
  const campusMenu = await fetchCampusMenu();
  const selectedRestaurant = (await searchParams).restaurant as SubRestaurant;
  const t = await getTranslations('campus');
  const locale = await getLocale();

  const restaurantNames =
    locale === 'en' ? CAMPUS_RESTAURANT_NAME_EN : CAMPUS_RESTAURANT;

  const tabs = CAMPUS_RESTAURANT_NAME.map(restaurant => ({
    key: restaurant,
    label: restaurantNames[restaurant],
    href: `/campus?restaurant=${restaurant}`,
  }));

  const currentRestaurant =
    selectedRestaurant && CAMPUS_RESTAURANT_NAME.includes(selectedRestaurant)
      ? selectedRestaurant
      : CAMPUS_RESTAURANT_NAME[0];

  return (
    <div className='space-y-4'>
      <MenuSection.Header
        title={
          <>
            {' '}
            {t('pageTitle')}{' '}
            <span className='text-point'>
              {restaurantNames[currentRestaurant]}
            </span>{' '}
            {t('menu')}
            <span className='font-tossFace'> 🍚</span>
          </>
        }
        subtitle={t('subtitle')}
      />

      <TabNavigation tabs={tabs} />
      <CampusMenuView campusMenu={campusMenu} />
    </div>
  );
}
