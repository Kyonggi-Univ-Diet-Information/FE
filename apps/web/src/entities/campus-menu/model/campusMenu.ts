import type { SubRestaurant } from './campusRestaurant';

export type CampusMenu = {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  subRestaurant: SubRestaurant;
};
