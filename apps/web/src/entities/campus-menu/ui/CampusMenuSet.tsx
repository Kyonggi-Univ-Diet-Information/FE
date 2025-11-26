import { CampusFoodCourt } from '@/shared/config';

import { fetchCampusMenuHasSet } from '../api/fetchCampusMenuHasSet';
import { CampusSetMenu } from '../model/campusMenu';

export default async function CampusMenuSet({
  type,
  baseFoodId,
}: {
  type: CampusFoodCourt;
  baseFoodId: number;
}) {
  const setMenus = await fetchCampusMenuHasSet(type, baseFoodId);

  if (setMenus.length === 0) return null;

  const description = (setMenu: CampusSetMenu) =>
    setMenu.name.includes('세트')
      ? '(단품 + 감자튀김 + 탄산음료)'
      : '(단품 + 탄산음료)';

  return (
    <section className='flex flex-col gap-2 rounded-xl border border-gray-200 p-4'>
      {/* <h3 className='font-medium'>해당 메뉴의 세트메뉴를 확인해보세요!</h3> */}
      <div className='flex flex-col gap-2'>
        {setMenus.map(setMenu => (
          <div className='flex items-center justify-between' key={setMenu.id}>
            <div className='flex flex-col gap-1'>
              <p>{setMenu.name}</p>
              <p className='text-sm text-gray-500'>{description(setMenu)}</p>
            </div>
            <p>{setMenu.price}원</p>
          </div>
        ))}
      </div>
    </section>
  );
}
