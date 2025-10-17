import {
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_ID,
  CAMPUS_RESTAURANT_NAME,
  CAMPUS_RESTAURANT_NAME_EN,
  RESTAURANT_ID_BY_NAME,
} from '@/lib/constants';
import { getTranslations } from 'next-intl/server';

import {
  CAMPUS_MENU_KEY,
  CAMPUS_MENU_LABEL,
  CAMPUS_MENU_TEXT,
  CAMPUS_MENU_TEXT_EN,
} from '@/features/campus/constants';
import { Fragment } from 'react';
import { CampusHeader, CampusMenuCard } from '@/features/campus/components';
import { StaticTabNavigation } from '@/shared/ui';
import { fetchCampusMenuByRestaurant } from '@/features/campus/services';

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ['ko', 'en'];
  const restaurantIds = Object.keys(CAMPUS_RESTAURANT_ID);

  return locales.flatMap(locale =>
    restaurantIds.map(restaurantId => ({
      locale,
      restaurantId,
    })),
  );
}

export default async function CampusRestaurantPage({
  params,
}: {
  params: Promise<{ locale: string; restaurantId: string }>;
}) {
  const { locale, restaurantId } = await params;
  const campusMenu = await fetchCampusMenuByRestaurant(
    CAMPUS_RESTAURANT_ID[restaurantId],
  );
  const currentRestaurant = CAMPUS_RESTAURANT_ID[restaurantId];
  const t = await getTranslations('campus');
  const menuTexts = locale === 'en' ? CAMPUS_MENU_TEXT_EN : CAMPUS_MENU_TEXT;

  const restaurantNames =
    locale === 'en' ? CAMPUS_RESTAURANT_NAME_EN : CAMPUS_RESTAURANT;

  const tabs = CAMPUS_RESTAURANT_NAME.map(restaurant => ({
    key: RESTAURANT_ID_BY_NAME[restaurant],
    label: restaurantNames[restaurant],
    href: `/campus/${RESTAURANT_ID_BY_NAME[restaurant]}`,
  }));

  return (
    <>
      <CampusHeader restaurantId={restaurantId} />
      <StaticTabNavigation tabs={tabs} currentTabKey={restaurantId} />
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
              {campusMenu
                .filter(menu => menu.name.includes(menuKey))
                .map(menu => (
                  <CampusMenuCard key={menu.id} {...menu} locale={locale} />
                ))}
            </div>
          </Fragment>
        ))}

      {(() => {
        const categorizedMenus = campusMenu.filter(
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
    </>
  );
}
