import Link from 'next/link';

import { MenuSection } from '@/components/common';

import { CampusMenuSection, MenuCard } from '@/features/menu/components';
import { fetchDormMenu } from '@/features/menu/services';

import { DORM_DAY_KEY } from '@/lib/constants';
import { DormMenu, DormTime } from '@/types';

export default async function Home() {
  const dormMenu = await fetchDormMenu();
  const today = new Date().getDay();
  const todayDormMenu = dormMenu && dormMenu[DORM_DAY_KEY[today]];

  const dormMenuByTime = (time: DormTime) => {
    if (!dormMenu) return [];

    if (today > 0 && today < 6) {
      return todayDormMenu[time].contents || [];
    }
    return [];
  };

  const renderDormMenu = (menu: DormMenu[]) => {
    if (menu.length === 0) return <p className='text-gray-600'>미운영</p>;
    return menu.map(menu => (
      <p className='text-gray-600' key={menu.id}>
        {menu.dietFoodDTO.name}
      </p>
    ));
  };

  return (
    <div className='scrollbar-hide absolute inset-0 flex flex-col gap-8 overflow-y-scroll p-4 pb-20 pt-6'>
      <CampusMenuSection />
      <ReviewLinkButton />
      <MenuSection>
        <MenuSection.Header
          title={
            <>
              <span className='text-point'>경기드림타워</span>{' '}
              <button className='active:text-point cursor-pointer underline hover:text-gray-600'>
                오늘
              </button>
              의 메뉴
              <span className='font-tossFace'> 🍚</span>
            </>
          }
          subtitle='이번 주 경기드림타워 식단을 확인해보세요.'
          action={
            <Link
              href='/reivew'
              className='text-sm underline hover:text-gray-600'
            >
              전체보기
            </Link>
          }
        />
        <MenuSection.Content>
          <MenuCard className='h-70'>
            <MenuCard.Header>
              아침 <span className='font-tossFace'>☀️</span>
            </MenuCard.Header>
            <MenuCard.Content>{renderDormMenu([])}</MenuCard.Content>
          </MenuCard>
          <MenuCard>
            <MenuCard.Header>
              점심 <span className='font-tossFace'>🍽️</span>{' '}
            </MenuCard.Header>
            <MenuCard.Content>
              {renderDormMenu(dormMenuByTime('LUNCH'))}
            </MenuCard.Content>
          </MenuCard>
          <MenuCard>
            <MenuCard.Header>
              저녁 <span className='font-tossFace'>🌙</span>
            </MenuCard.Header>
            <MenuCard.Content>
              {renderDormMenu(dormMenuByTime('DINNER'))}
            </MenuCard.Content>
          </MenuCard>
        </MenuSection.Content>
      </MenuSection>
    </div>
  );
}

function ReviewLinkButton() {
  return (
    <a
      href='/review'
      className='flex cursor-pointer flex-col rounded-2xl bg-gray-100/50 px-8 py-6 transition-all duration-300 active:bg-gray-100'
    >
      <p className='text-lg font-bold'>
        식사는 어땠나요?<span className='font-tossFace'> 😋</span>
      </p>
      <p>식당 메뉴에 대한 리뷰를 작성하고, 다른 학우의 리뷰를 확인해보세요!</p>
    </a>
  );
}
