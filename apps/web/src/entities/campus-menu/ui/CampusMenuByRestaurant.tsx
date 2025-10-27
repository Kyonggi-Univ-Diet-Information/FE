import { getLocale, getTranslations } from 'next-intl/server';

import { Link } from '@/shared/i18n/routing';

import CampusMenuCard from './CampusMenuCard';
import { fetchCampusMenuByRestaurant } from '../api/fetchCampusMenuByRestaurant';
import { fetchCategorizedCampusMenu } from '../api/fetchCategorizedCampusMenu';
import {
  CAMPUS_MENU_KEY,
  CAMPUS_MENU_TEXT,
  CAMPUS_MENU_TEXT_EN,
  MENU_KEY_TO_ID,
  ID_TO_MENU_KEY,
} from '../model/campusMenu';
import { CAMPUS_RESTAURANT_ID } from '../model/campusRestaurant';

interface CampusMenuByRestaurantProps {
  foodCourtId: string;
  restaurantId: string;
  menuKeyId?: string;
}

export default async function CampusMenuByRestaurant({
  foodCourtId,
  restaurantId,
  menuKeyId,
}: CampusMenuByRestaurantProps) {
  const currentRestaurant = CAMPUS_RESTAURANT_ID[restaurantId];

  const menuKey = menuKeyId ? ID_TO_MENU_KEY[menuKeyId] : undefined;

  const campusMenu = menuKeyId
    ? await fetchCategorizedCampusMenu(
        CAMPUS_RESTAURANT_ID[restaurantId],
        menuKey as string,
      )
    : await fetchCampusMenuByRestaurant(CAMPUS_RESTAURANT_ID[restaurantId]);

  const locale = await getLocale();
  const menuTexts = locale === 'en' ? CAMPUS_MENU_TEXT_EN : CAMPUS_MENU_TEXT;
  const t = await getTranslations('campus');
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 text-sm'>
          <Link
            prefetch
            href={`/campus/${foodCourtId}/${restaurantId}`}
            className={!menuKeyId ? 'text-point font-bold' : ''}
          >
            {t('all')}
          </Link>
          {CAMPUS_MENU_KEY[currentRestaurant].map(key => (
            <Link
              prefetch
              key={key}
              href={`/campus/${foodCourtId}/${restaurantId}/${MENU_KEY_TO_ID[key]}`}
              className={menuKey === key ? 'text-point font-bold' : ''}
            >
              {menuTexts[key]}
            </Link>
          ))}
        </div>
        <span className='text-sm text-gray-600'>
          {t('total')} {campusMenu.length}
          {t('menus')}
        </span>
      </div>

      <div className='flex flex-col md:grid md:grid-cols-2 md:gap-4'>
        {campusMenu.length > 0 &&
          campusMenu.map(menu => (
            <CampusMenuCard key={menu.id} {...menu} locale={locale} />
          ))}
      </div>
    </>
  );
}
