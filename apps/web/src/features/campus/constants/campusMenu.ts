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

export const CAMPUS_MENU_TEXT: Record<string, string> = {
  세트: '세트',
  콤보: '콤보',
  버거: '버거',
  타코: '타코',
  떡뽀끼: '떡뽀끼',
  덮밥: '덮밥',
  돈까스: '돈까스',
  카츠: '카츠',
  우동: '우동',
  파스타: '파스타',
  찌개: '찌개',
  쌀국수: '쌀국수',
};

export const CAMPUS_MENU_TEXT_EN: Record<string, string> = {
  세트: 'Set',
  콤보: 'Combo',
  버거: 'Burger',
  타코: 'Taco',
  떡뽀끼: 'Tteokbokki',
  덮밥: 'Rice Bowl',
  돈까스: 'Pork Cutlet',
  카츠: 'Katsu',
  우동: 'Udon',
  파스타: 'Pasta',
  찌개: 'Stew',
  쌀국수: 'Rice Noodles',
};
