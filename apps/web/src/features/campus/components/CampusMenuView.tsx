'use client';

import { Fragment } from 'react';
import CampusMenuCard from './CampusMenuCard';
import {
  CAMPUS_MENU_KEY,
  CAMPUS_MENU_LABEL,
  CAMPUS_MENU_TEXT,
  CAMPUS_MENU_TEXT_EN,
} from '../constants';
import { CampusMenu, SubRestaurant } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function CampusMenuView({
  campusMenu,
}: {
  campusMenu: Record<SubRestaurant, CampusMenu[]>;
}) {
  const searchParams = useSearchParams();
  const currentRestaurant =
    (searchParams.get('restaurant') as SubRestaurant) || 'MANKWON';
  const t = useTranslations('campus');
  const locale = useLocale();
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
    </>
  );
}
