import { SubRestaurant } from '@/types';

export const CAMPUS_RESTAURANT_ID: Record<string, SubRestaurant> = {
  '1': 'MANKWON',
  '2': 'SYONG',
  '3': 'BURGER_TACO',
  '4': 'WIDELGA',
  '5': 'SINMEOI',
};

export const RESTAURANT_ID_BY_NAME: Record<SubRestaurant, string> = {
  MANKWON: '1',
  SYONG: '2',
  BURGER_TACO: '3',
  WIDELGA: '4',
  SINMEOI: '5',
};

export const CAMPUS_RESTAURANT = {
  MANKWON: '만권화밥',
  SYONG: '숑숑돈까스',
  BURGER_TACO: '버거&타코',
  WIDELGA: '위델가',
  SINMEOI: '신머이쌀국수',
};

export const CAMPUS_RESTAURANT_NAME_EN = {
  MANKWON: 'Mankwon WhaBap',
  SYONG: 'Songsongs Pork Cutlet',
  BURGER_TACO: 'Burger & Taco',
  WIDELGA: 'Widelga',
  SINMEOI: 'Sinmeoi Rice Noodles',
};

export const CAMPUS_RESTAURANT_NAME = Object.keys(
  CAMPUS_RESTAURANT,
) as SubRestaurant[];
