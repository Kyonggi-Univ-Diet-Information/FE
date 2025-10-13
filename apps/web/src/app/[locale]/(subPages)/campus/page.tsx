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

import {
  CAMPUS_MENU_KEY,
  CAMPUS_MENU_LABEL,
  CAMPUS_MENU_TEXT,
  CAMPUS_MENU_TEXT_EN,
} from '@/features/campus/constants';
import { CampusMenuCard } from '@/features/campus/components';

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
  const menuTexts = locale === 'en' ? CAMPUS_MENU_TEXT_EN : CAMPUS_MENU_TEXT;

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

      {CAMPUS_MENU_KEY[currentRestaurant].length > 0 &&
        CAMPUS_MENU_KEY[currentRestaurant].map(menuKey => (
          <Fragment key={menuKey}>
            <p className='flex items-center gap-2 font-medium' key={menuKey}>
              <span className='font-tossFace'>
                {CAMPUS_MENU_LABEL[menuKey]}
              </span>
              {menuTexts[menuKey]}
            </p>
            <div className='grid grid-cols-2 gap-4'>
              {campusMenu[currentRestaurant]
                .filter(menu => menu.name.includes(menuKey))
                .map(menu => (
                  <CampusMenuCard key={menu.id} {...menu} locale={locale} />
                ))}
            </div>
          </Fragment>
        ))}

      {(() => {
        const categorizedMenus = campusMenu[currentRestaurant].filter(
          menu =>
            !CAMPUS_MENU_KEY[currentRestaurant].some(key =>
              menu.name.includes(key),
            ),
        );

        return (
          categorizedMenus.length > 0 && (
            <Fragment>
              <p className='flex items-center gap-2 font-medium'>
                <span className='font-tossFace'>🍽️</span>
                {t('others')}
              </p>
              <div className='grid grid-cols-2 gap-4'>
                {categorizedMenus.map(menu => (
                  <CampusMenuCard key={menu.id} {...menu} locale={locale} />
                ))}
              </div>
            </Fragment>
          )
        );
      })()}
    </div>
  );
}
