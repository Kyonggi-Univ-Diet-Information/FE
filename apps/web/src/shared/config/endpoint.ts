import { SubRestaurant } from '@/entities/campus-menu/model/campusRestaurant';
import { DormDay } from '@/entities/dorm-menu/model';

export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';

export const INQUIRY_URL = 'https://open.kakao.com/o/sgcUtX3g';

export const PATCHNOTE_URL =
  'https://abounding-mice-0a1.notion.site/26ad8a0f1c3f804398f1d2baa67d3457';

export const FOOD_COURT = {
  KYONGSUL: 'KYONGSUL',
  DORMITORY: 'DORMITORY',
  E_SQUARE: 'E_SQUARE',
  SALLY_BOX: 'SALLY_BOX',
} as const;

export const FOOD_COURT_ID: Record<FoodCourt, string> = {
  KYONGSUL: 'ks',
  DORMITORY: 'do',
  E_SQUARE: 'es',
  SALLY_BOX: 'sb',
} as const;

export const FOOD_COURT_NAME: Record<FoodCourt, string> = {
  KYONGSUL: '경슐랭',
  DORMITORY: '기숙사식당',
  E_SQUARE: '이스퀘어',
  SALLY_BOX: '샐리박스',
} as const;

export const FOOD_COURT_NAME_EN: Record<FoodCourt, string> = {
  KYONGSUL: 'Kyongsulin',
  DORMITORY: 'Dormitory',
  E_SQUARE: 'E-Square',
  SALLY_BOX: 'Sally Box',
} as const;

export type FoodCourt = keyof typeof FOOD_COURT;
export type FoodCourtId = (typeof FOOD_COURT_ID)[FoodCourt];

export const ID_TO_FOOD_COURT: Record<string, FoodCourt> = {
  ks: 'KYONGSUL',
  do: 'DORMITORY',
  es: 'E_SQUARE',
  sb: 'SALLY_BOX',
} as const;

export const getFoodCourtById = (id: string): FoodCourt | undefined => {
  return ID_TO_FOOD_COURT[id];
};

export const ENDPOINT = {
  AUTH: {
    KAKAO_LOGIN: '/kakao-login',
  },
  DORM: {
    DORM_MENU: '/diet-content/dormitory',
    DORM_MENU_BY_DAY: (day: DormDay) => `/diet-content/dormitory/dow/${day}`,
  },
  MENU: {
    MENU_ALL: (foodCourt: FoodCourt) => `/food/${foodCourt}/all`,
    MENU_BY_RESTAURANT: (
      foodCourt: Omit<FoodCourt, 'DORMITORY'>,
      restaurant: SubRestaurant,
    ) => `/food/${foodCourt}/restaurant/${restaurant}`,
    MENU_NAME: (foodCourt: FoodCourt, foodId: number) =>
      `/food/${foodCourt}/get-names/${foodId}`,
  },
  REVIEW_R: {
    TOP_5_RECENT: (type: FoodCourt) => `/review/${type}/reviews/top5-recent`,
    TOP_5_LIKED: (type: FoodCourt) => `/review/${type}/reviews/top5-rating`,
    COUNT: (foodCourt: FoodCourt, foodId: number) =>
      `/review/${foodCourt}/count/${foodId}`,
    PAGED: (foodCourt: FoodCourt, foodId: number) =>
      `/review/${foodCourt}/paged/${foodId}`,
    RATING: (foodCourt: FoodCourt, foodId: number) =>
      `/review/${foodCourt}/rating-count/${foodId}`,
    AVERAGE_RATING: (foodCourt: FoodCourt, foodId: number) =>
      `/review/${foodCourt}/average/${foodId}`,
  },
  REVIEW_CUD: {
    SUBMIT: (foodCourt: FoodCourt, foodId: number) =>
      `/review/${foodCourt}/new/${foodId}`,
    UPDATE: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/${foodCourt}/modify/${reviewId}`,
    DELETE: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/${foodCourt}/delete/${reviewId}`,
  },
  REVIEW_LIKE: {
    LIKE: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/favorite/${foodCourt}/${reviewId}/create-favorite`,
    UNLIKE: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/favorite/${foodCourt}/delete/${reviewId}`,
    LIKED_COUNT: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/favorite/${foodCourt}/count/${reviewId}`,
  },
  MEMBER: {
    MEMBER_INFO: '/my-page/info',
    MEMBER_REVIEW: '/my-page/reviews',
    MEMBER_FAV_REVIEW: '/my-page/favorites',
    MEMBER_REVIEW_LIKED: (foodCourt: FoodCourt) =>
      `/review/favorite/${foodCourt}/each-member/all`,
  },
};
