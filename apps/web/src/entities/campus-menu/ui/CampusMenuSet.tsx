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
    <div className='flex flex-col gap-2 rounded-2xl bg-gray-50 p-5'>
      <h3 className='text-xs font-semibold text-gray-400'>연관 세트 메뉴</h3>
      <div className='flex flex-col gap-4'>
        {setMenus.map(setMenu => (
          <div className='flex items-start justify-between gap-4' key={setMenu.id}>
            <div className='flex flex-col gap-1 min-w-0'>
              <p className='text-sm font-bold text-gray-900 truncate'>{setMenu.name}</p>
              <p className='text-xs leading-tight text-gray-500'>{description(setMenu)}</p>
            </div>
            <p className='text-sm font-black text-gray-900 shrink-0 whitespace-nowrap'>{setMenu.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </div>
  );
}
