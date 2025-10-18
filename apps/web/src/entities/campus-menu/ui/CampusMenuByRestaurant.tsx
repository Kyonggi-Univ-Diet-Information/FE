import { Fragment } from 'react';
import { CAMPUS_RESTAURANT_ID } from '../model/campusRestaurant';
import {
  CAMPUS_MENU_KEY,
  CAMPUS_MENU_LABEL,
  CAMPUS_MENU_TEXT,
  CAMPUS_MENU_TEXT_EN,
} from '../model/campusMenu';
import { fetchCampusMenuByRestaurant } from '../api/fetchCampusMenuByRestaurant';
import { getLocale, getTranslations } from 'next-intl/server';
import CampusMenuCard from './CampusMenuCard';

interface CampusMenuByRestaurantProps {
  restaurantId: string;
}

export default async function CampusMenuByRestaurant({
  restaurantId,
}: CampusMenuByRestaurantProps) {
  const currentRestaurant = CAMPUS_RESTAURANT_ID[restaurantId];
  const campusMenu = await fetchCampusMenuByRestaurant(
    CAMPUS_RESTAURANT_ID[restaurantId],
  );
  const t = await getTranslations('campus');
  const locale = await getLocale();
  const menuTexts = locale === 'en' ? CAMPUS_MENU_TEXT_EN : CAMPUS_MENU_TEXT;

  return (
    <>
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
