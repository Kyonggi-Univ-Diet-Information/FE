import { CAMPUS_RESTAURANT } from '@/lib/constants';

export type CampusMenu = {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  subRestaurant: SubRestaurant;
};

export type SubRestaurant = keyof typeof CAMPUS_RESTAURANT;
