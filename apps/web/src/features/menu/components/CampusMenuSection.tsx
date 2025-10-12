import Link from 'next/link';

import { MenuSection } from '@/components/common';

import { MenuCard } from '.';

import { CAMPUS_RESTAURANT, CAMPUS_RESTAURANT_NAME } from '@/lib/constants';
import type { CampusMenu, SubRestaurant } from '@/types';

export default function CampusMenuSection({
  campusMenu,
}: {
  campusMenu: Record<SubRestaurant, CampusMenu[]>;
}) {
  return (
    <MenuSection>
      <MenuSection.Header
        title={
          <>
            교내식당 <span className='text-point'>경슐랭</span> 메뉴
            <span className='font-tossFace'> 🍚</span>
          </>
        }
        subtitle='카드를 클릭해서 전체 메뉴를 확인해보세요!'
        action={
          <Link
            href='/campus'
            className='text-sm underline hover:text-gray-600'
          >
            전체보기
          </Link>
        }
      />
      <MenuSection.Content>
        {CAMPUS_RESTAURANT_NAME.map(restaurant => (
          <MenuCard
            key={restaurant}
            className='h-70'
            href={`/campus?restaurant=${restaurant}`}
          >
            <p className='flex items-center justify-between font-semibold'>
              <span>{CAMPUS_RESTAURANT[restaurant]}</span>
              <span className='rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium'>
                경슐랭
              </span>
            </p>
            <MenuCard.Content>
              {campusMenu[restaurant].slice(0, 7).map(menu => (
                <p
                  className='flex items-center justify-between text-gray-600'
                  key={menu.id}
                >
                  <span>{menu.name}</span>
                  <span className='text-sm text-gray-900/40'>
                    {menu.price}원
                  </span>
                </p>
              ))}
            </MenuCard.Content>
          </MenuCard>
        ))}
      </MenuSection.Content>
    </MenuSection>
  );
}
