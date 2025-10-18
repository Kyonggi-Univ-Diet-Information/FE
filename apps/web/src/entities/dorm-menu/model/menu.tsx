import type { DormMenu } from '@/entities/dorm-menu/model/dormMenu';
import { Link } from '@/shared/i18n/routing';

/**
 * 메뉴 데이터가 없을 때 표시할 기본 메시지
 */
export const MENU_MESSAGES = {
  NOT_UPDATED: {
    id: 0,
    dietFoodDTO: {
      id: 0,
      name: '미운영',
      nameEn: 'Closed',
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
export function renderMenuItems(menu: DormMenu[], locale?: string) {
  if (menu.length === 0)
    return (
      <p className='text-gray-600'>{locale === 'en' ? 'Closed' : '미운영'}</p>
    );

  return menu.map(menuItem => (
    <p className='text-gray-600' key={menuItem.id}>
      {locale === 'en'
        ? menuItem.dietFoodDTO.nameEn
        : menuItem.dietFoodDTO.name}
    </p>
  ));
}

/**
 * 리뷰 버튼을 가진 메뉴 배열을 렌더링하는 함수
 */
export function renderMenuItemsWithReview(menu: DormMenu[], locale?: string) {
  return menu.map(menuItem => (
    <p className='flex justify-between text-gray-600' key={menuItem.id}>
      {locale === 'en'
        ? menuItem.dietFoodDTO.nameEn
        : menuItem.dietFoodDTO.name}
      <Link
        href={`/review/${menuItem.id}?menuType=dorm`}
        className='text-gray-600'
      >
        리뷰
      </Link>
    </p>
  ));
}
