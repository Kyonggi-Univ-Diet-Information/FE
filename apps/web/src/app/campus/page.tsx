import { fetchCampusMenu } from '@/features/menu/services';
import { CAMPUS_RESTAURANT, CAMPUS_RESTAURANT_NAME } from '@/lib/constants';
import { TabNavigation } from '@/components/common';
import { SubRestaurant } from '@/types';

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
    <div className='scrollbar-hide absolute inset-0 flex flex-col gap-4 overflow-y-scroll p-4 pb-20 pt-6'>
      <p className='text-xl font-bold'>
        경기대 <span className='text-point'>교내식당</span> 메뉴
        <span className='font-tossFace'> 🍚</span>
      </p>

      <TabNavigation tabs={tabs} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {campusMenu[currentRestaurant].map(menu => (
          <div
            className='flex w-full flex-col items-center justify-between rounded-2xl bg-gray-100/50 p-4 text-gray-600'
            key={menu.id}
          >
            <span className='font-medium'>{menu.name}</span>
            <span className='text-sm text-gray-900/40'>{menu.price}원</span>
          </div>
        ))}
      </div>
    </div>
  );
}
