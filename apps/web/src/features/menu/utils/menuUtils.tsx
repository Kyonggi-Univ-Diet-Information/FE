import type { DormMenu } from '@/types';

/**
 * 메뉴 데이터가 없을 때 표시할 기본 메시지
 */
export const MENU_MESSAGES = {
  NOT_UPDATED: {
    id: 0,
    dietFoodDTO: {
      id: 0,
      name: '이번 주 메뉴는 아직 업데이트 되지 않았어요!',
      nameEn: "This week's menu is not yet updated!",
      type: null,
    },
  },
  WEEKEND_CLOSED: {
    id: 0,
    dietFoodDTO: {
      id: 0,
      name: '주말에는 운영하지 않아요!',
      nameEn: 'Closed on weekends!',
      type: null,
    },
  },
} as const;

/**
 * 메뉴 데이터가 없을 때 적절한 메시지를 반환하는 함수
 */
export function getFallbackMenu(isWeekend: boolean): DormMenu[] {
  return isWeekend
    ? [MENU_MESSAGES.WEEKEND_CLOSED]
    : [MENU_MESSAGES.NOT_UPDATED];
}

/**
 * 메뉴 배열을 렌더링하는 함수
 */
export function renderMenuItems(menu: DormMenu[]) {
  if (menu.length === 0) return <p className='text-gray-600'>미운영</p>;

  return menu.map(menuItem => (
    <p className='text-gray-600' key={menuItem.id}>
      {menuItem.dietFoodDTO.name}
    </p>
  ));
}
