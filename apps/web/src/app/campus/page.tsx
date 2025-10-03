import { MenuCard } from '@/features/menu/components';
import { fetchCampusMenu } from '@/features/menu/services';
import { CAMPUS_RESTAURANT, CAMPUS_RESTAURANT_NAME } from '@/lib/constants';

export default async function CampusPage() {
  const campusMenu = await fetchCampusMenu();

  return (
    <div className='scrollbar-hide absolute inset-0 flex flex-col gap-4 overflow-y-scroll p-4 pb-20 pt-6'>
      <p className='text-xl font-bold'>
        경기대 <span className='text-point'>교내식당</span> 메뉴
        <span className='font-tossFace'> 🍚</span>
      </p>
      <div className='grid w-full grid-cols-2 gap-4'>
        {CAMPUS_RESTAURANT_NAME.map(restaurant => (
          <MenuCard key={restaurant}>
            <p className='flex items-center justify-between font-semibold'>
              <span>{CAMPUS_RESTAURANT[restaurant]}</span>
              <span className='rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium'>
                경슐랭
              </span>
            </p>
            <MenuCard.Content>
              {campusMenu[restaurant].map(menu => (
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
      </div>
    </div>
  );
}
