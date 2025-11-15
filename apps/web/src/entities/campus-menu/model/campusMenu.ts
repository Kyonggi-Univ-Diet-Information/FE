import type { FoodCourt } from '@/shared/config';

import type { SubRestaurant } from './campusRestaurant';

export type { CampusFoodCourt } from '@/shared/config/endpoint';

export type CampusMenu = {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  subRestaurant: SubRestaurant;
};

export type CampusTopMenu = CampusMenu & {
  restaurantType: FoodCourt;
  reviewCount: 3;
  cuisine: 'KOREAN';
  foodType: 'RICE_BOWL';
  detailedMenu: 'RICE_BOWL';
};

export type CampusMenuWithCategory = CampusMenu & {
  category: string;
  categoryKorean: string;
};

export type KyongsulCategoryMenuResponse = {
  [key in SubRestaurant]?: {
    [category: string]: CampusMenuWithCategory[];
  };
};

export type SimpleCategoryMenuResponse = {
  [category: string]: CampusMenuWithCategory[];
};

export type CategoryMenuResponse =
  | KyongsulCategoryMenuResponse
  | SimpleCategoryMenuResponse;

export const CATEGORY_TO_TEXT: Record<string, string> = {
  MEALS: '식사',
  STREET: '분식',
  SOBA: '소바',
  KATSU: '카츠',
  CHICKEN: '치킨',
  JJIGAE: '찌개',
  SOUP: '탕',
  ICE_CREAM: '아이스크림',
  COFFEE_BEVERAGE: '커피/음료',
  CUTLET: '돈까스',
  SIDE: '사이드',
  STEAK: '스테이크',
  NOODLE: '면',
  BOWL: '덮밥',
  CURRY: '커리',
  TTEOKBOKKI: '떡볶이',
  UDON: '우동',
  BURGER: '버거',
  TACO: '타코',
  SET: '세트',
  COMBO: '콤보',
  STEW: '찌개',
  RICE_NOODLE: '쌀국수',
  PASTA: '파스타',
  PACK: '팩',
  RICE: '밥',
  SANDWICH: '샌드위치',
  DRINK: '커피/음료',
  PHO: '쌀국수',
  ETC: '기타',
  BANHMI: '반미',
  SHRIMP: '새우',
};

export const CATEGORY_TO_TEXT_EN: Record<string, string> = {
  MEALS: 'Meals',
  STREET: 'Street Food',
  SOBA: 'Soba',
  KATSU: 'Katsu',
  CHICKEN: 'Chicken',
  JJIGAE: 'Jjigae',
  SOUP: 'Soup',
  ICE_CREAM: 'Ice Cream',
  COFFEE_BEVERAGE: 'Coffee/Beverage',
  CUTLET: 'Cutlet',
  SIDE: 'Side',
  STEAK: 'Steak',
  NOODLE: 'Noodle',
  BOWL: 'Bowl',
  CURRY: 'Curry',
  TTEOKBOKKI: 'Tteokbokki',
  UDON: 'Udon',
  BURGER: 'Burger',
  TACO: 'Taco',
  SET: 'Set',
  COMBO: 'Combo',
  STEW: 'Stew',
  RICE_NOODLE: 'Rice Noodle',
  PASTA: 'Pasta',
  PACK: 'Pack',
  RICE: 'Rice',
  SANDWICH: 'Sandwich',
  DRINK: 'Drink',
  PHO: 'Pho',
  ETC: 'Etc',
  BANHMI: 'Banh Mi',
  SHRIMP: 'Shrimp',
};
