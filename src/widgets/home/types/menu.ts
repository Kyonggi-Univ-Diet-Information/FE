import { Review } from "~/feature/home/review/types/review";
import { Day, TimeKey } from "~/widgets/home/types";

export type Menu = {
  name: string;
  nameEn: string;
  id: number;
  dietFoodReviews: Review[];
};

export interface MenuItem {
  id: number;
  dietFoodDTO: Menu;
}

export type DailyMenu = {
  [key in TimeKey]: { contents: MenuItem[] };
};

export type WeeklyMenu = {
  [key in Day]: DailyMenu;
};
