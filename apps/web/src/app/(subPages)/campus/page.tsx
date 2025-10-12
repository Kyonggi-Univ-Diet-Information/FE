import { Fragment } from 'react';

import { fetchCampusMenu } from '@/features/menu/services';

import { CAMPUS_RESTAURANT, CAMPUS_RESTAURANT_NAME } from '@/lib/constants';
import { TabNavigation, MenuSection } from '@/components/common';
import type { SubRestaurant } from '@/types';

import {
  CAMPUS_MENU_KEY,
  CAMPUS_MENU_LABEL,
} from '@/features/campus/constants';
import { CampusMenuCard } from '@/features/campus/components';

interface CampusPageProps {
  searchParams: Promise<{ restaurant?: string }>;
}

export default async function CampusPage({ searchParams }: CampusPageProps) {
  const campusMenu = await fetchCampusMenu();
  const selectedRestaurant = (await searchParams).restaurant as SubRestaurant;

  const tabs = CAMPUS_RESTAURANT_NAME.map(restaurant => ({
    key: restaurant,
    label: CAMPUS_RESTAURANT[restaurant],
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
            경슐랭{' '}
            <span className='text-point'>
              {CAMPUS_RESTAURANT[currentRestaurant]}
            </span>{' '}
            메뉴
            <span className='font-tossFace'> 🍚</span>
          </>
        }
        subtitle='리뷰 버튼을 클릭해서 리뷰를 작성해보세요!'
      />

      <TabNavigation tabs={tabs} />

      {CAMPUS_MENU_KEY[currentRestaurant].length > 0 &&
        CAMPUS_MENU_KEY[currentRestaurant].map(menuKey => (
          <Fragment key={menuKey}>
            <p className='flex items-center gap-2 font-medium' key={menuKey}>
              <span className='font-tossFace'>
                {CAMPUS_MENU_LABEL[menuKey]}
              </span>
              {menuKey}
            </p>
            <div className='grid grid-cols-2 gap-4'>
              {campusMenu[currentRestaurant]
                .filter(menu => menu.name.includes(menuKey))
                .map(menu => (
                  <CampusMenuCard key={menu.id} {...menu} />
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
                기타
              </p>
              <div className='grid grid-cols-2 gap-4'>
                {categorizedMenus.map(menu => (
                  <CampusMenuCard key={menu.id} {...menu} />
                ))}
              </div>
            </Fragment>
          )
        );
      })()}
    </div>
  );
}
