import Link from 'next/link';

import { MenuCard, MenuSection } from '.';
import { fetchCampusMenu } from '../services';

import { CAMPUS_RESTAURANT, CAMPUS_RESTAURANT_NAME } from '@/lib/constants';

export default async function CampusMenuSection() {
  const campusMenu = await fetchCampusMenu();

  return (
    <MenuSection>
      <MenuSection.Header
        title={
          <>
            경기대 <span className='text-point'>교내식당</span> 메뉴
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
          <MenuCard key={restaurant}>
            <p className='flex items-center justify-between font-semibold'>
              <span>{CAMPUS_RESTAURANT[restaurant]}</span>
              <span className='rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium'>
                경슐랭
              </span>
            </p>
            <MenuCard.Content>
              {campusMenu[restaurant].slice(0, 7).map(menu => (
                <li
                  className='flex items-center justify-between text-gray-600'
                  key={menu.id}
                >
                  <span>{menu.name}</span>
                  <span className='text-sm text-gray-900/40'>
                    {menu.price}원
                  </span>
                </li>
              ))}
            </MenuCard.Content>
          </MenuCard>
        ))}
      </MenuSection.Content>
    </MenuSection>
  );
}
