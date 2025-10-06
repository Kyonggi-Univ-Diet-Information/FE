import { Fragment } from 'react';

import { fetchCampusMenu } from '@/features/menu/services';

import { CAMPUS_RESTAURANT, CAMPUS_RESTAURANT_NAME } from '@/lib/constants';
import { TabNavigation, MenuSection } from '@/components/common';

import type { SubRestaurant } from '@/types';

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

  const menuKey: Record<SubRestaurant, string[]> = {
    BURGER_TACO: ['버거', '타코', '세트', '콤보', '떡뽀끼'],
    MANKWON: ['덮밥'],
    SYONG: ['돈까스', '카츠', '우동', '파스타'],
    WIDELGA: ['찌개'],
    SINMEOI: ['쌀국수'],
  };

  const menuLabel: Record<string, string> = {
    세트: '🍟',
    콤보: '🥤',
    버거: '🍔',
    타코: '🌮',
    떡뽀끼: '🍴',
    덮밥: '🍚',
    돈까스: '🍛',
    카츠: '🍛',
    우동: '🍜',
    파스타: '🍝',
    찌개: '🥘',
    쌀국수: '🍜',
  };

  return (
    <div className='scrollbar-hide absolute inset-0 flex flex-col gap-4 overflow-y-scroll p-4 pb-20 pt-6'>
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
        subtitle='메뉴 이미지도 곧 추가될 예정이에요!'
      />

      <TabNavigation tabs={tabs} />

      {menuKey[currentRestaurant].length > 0 &&
        menuKey[currentRestaurant].map(menuKey => (
          <Fragment key={menuKey}>
            <p className='flex items-center gap-2 font-medium' key={menuKey}>
              <span className='font-tossFace'>{menuLabel[menuKey]}</span>
              {menuKey}
            </p>
            <div className='grid grid-cols-2 gap-4'>
              {campusMenu[currentRestaurant]
                .filter(menu => menu.name.includes(menuKey))
                .map(menu => (
                  <div
                    className='flex w-full flex-col items-center justify-between rounded-2xl bg-gray-100/50 p-4 text-gray-600'
                    key={menu.id}
                  >
                    <span className='font-medium'>{menu.name}</span>
                    <span className='text-sm text-gray-900/40'>
                      {menu.price}원
                    </span>
                  </div>
                ))}
            </div>
          </Fragment>
        ))}

      {/* 기타 메뉴 */}
      {(() => {
        const categorizedMenus = campusMenu[currentRestaurant].filter(
          menu =>
            !menuKey[currentRestaurant].some(key => menu.name.includes(key)),
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
                  <div
                    className='flex w-full flex-col items-center justify-between rounded-2xl bg-gray-100/50 p-4 text-gray-600'
                    key={menu.id}
                  >
                    <span className='font-medium'>{menu.name}</span>
                    <span className='text-sm text-gray-900/40'>
                      {menu.price}원
                    </span>
                  </div>
                ))}
              </div>
            </Fragment>
          )
        );
      })()}
    </div>
  );
}
