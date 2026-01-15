import {
  FOOD_COURT_ID,
  FOOD_COURT_NAME,
} from '@/shared/config';
import { Card, Section } from '@/shared/ui';

import CampusAnimatedCard from './CampusAnimatedCard';
import { fetchTopMenu } from '../api/fetchTopMenu';
import type { CampusTopMenu } from '../model/campusMenu';

export default async function CampusTopMenu() {
  const topMenus = await fetchTopMenu();

  return (
    <Section>
      <Section.Header
        title={
          <>
            <span className='font-tossFace'>💬</span> 리뷰 많은 메뉴
          </>
        }
        subtitle="실시간으로 가장 많은 리뷰를 받은 메뉴들이에요!"
      />
      <div className='w-full space-y-2'>
        {topMenus.map((menu, index) => (
          <MenuCard key={menu.id} menu={menu} index={index} />
        ))}
      </div>
    </Section>
  );
}

function MenuCard({ menu, index }: { menu: CampusTopMenu; index: number }) {
  const foodCourtName = FOOD_COURT_NAME[menu.restaurantType];
  const getMedal = (index: number) => {
    switch (index) {
      case 1:
        return <span className='font-tossFace'>🥇</span>;
      case 2:
        return <span className='font-tossFace'>🥈</span>;
      case 3:
        return <span className='font-tossFace'>🥉</span>;
      default:
        return <span className='pl-1.5 text-sm'>{index}</span>;
    }
  };

  return (
    <CampusAnimatedCard index={index}>
      <Card href={`/review/${FOOD_COURT_ID[menu.restaurantType]}/${menu.id}`}>
        <div className='grid grid-cols-[0.5fr_6fr_1fr] items-center gap-1.5'>
          {getMedal(index + 1)}
          <div className='flex items-center gap-1.5 truncate text-nowrap text-sm font-semibold'>
            <span className='rounded-full border px-1.5 py-0.5 text-xs font-medium'>
              {foodCourtName}
            </span>
            {menu.name}
          </div>
          <div className='flex items-center justify-end gap-1'>
            <span className='font-tossFace'>💬</span>
            <span className='text-sm'>{menu.reviewCount}</span>
          </div>
        </div>
      </Card>
    </CampusAnimatedCard>
  );
}
