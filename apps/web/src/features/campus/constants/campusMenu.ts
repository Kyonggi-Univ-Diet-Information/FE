import type { SubRestaurant } from '@/types';

export const CAMPUS_MENU_KEY: Record<SubRestaurant, string[]> = {
  BURGER_TACO: ['버거', '타코', '세트', '콤보', '떡뽀끼'],
  MANKWON: ['덮밥'],
  SYONG: ['돈까스', '카츠', '우동', '파스타'],
  WIDELGA: ['찌개'],
  SINMEOI: ['쌀국수'],
};

export const CAMPUS_MENU_LABEL: Record<string, string> = {
  세트: '🍟',
  콤보: '🥤',
  버거: '🍔',
  타코: '🌮',
  떡뽀끼: '🍴',
  덮밥: '🍚',
  돈까스: '🍛',
  카츠: '🍛',
  우동: '🍜',
  파스타: '🍝',
  찌개: '🥘',
  쌀국수: '🍜',
};
