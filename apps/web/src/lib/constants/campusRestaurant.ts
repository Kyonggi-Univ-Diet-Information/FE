import { SubRestaurant } from '@/types';

export const CAMPUS_RESTAURANT = {
  MANKWON: '만권화밥',
  SYONG: '숑숑돈까스',
  BURGER_TACO: '버거&타코',
  WIDELGA: '위델가',
  SINMEOI: '신머이쌀국수',
};

export const CAMPUS_RESTAURANT_NAME = Object.keys(
  CAMPUS_RESTAURANT,
) as SubRestaurant[];
