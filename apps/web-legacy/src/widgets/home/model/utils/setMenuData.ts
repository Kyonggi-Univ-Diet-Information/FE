import { WeeklyMenu, MenuItem } from '~/widgets/home/types';

type ProcessedMenu = {
  id: number;
  menu: string;
  nameEn: string;
};

type ProcessedTimeMenu = {
  menus: ProcessedMenu[];
};

type ProcessedDailyMenu = Record<string, ProcessedTimeMenu>;

type ProcessedWeeklyMenu = Record<string, ProcessedDailyMenu>;

export const setMenuData = (response: WeeklyMenu): ProcessedWeeklyMenu => {
  const dormMenus: ProcessedWeeklyMenu = {};
  for (const day in response) {
    dormMenus[day] = {};

    const meals = response[day as keyof typeof response];
    for (const time in meals) {
      const meal = meals[time as keyof typeof meals];
      const menus = meal.contents.map((food: MenuItem) => ({
        id: food.dietFoodDTO.id,
        menu: food.dietFoodDTO.name,
        nameEn: food.dietFoodDTO.nameEn,
      }));

      dormMenus[day][time] = {
        menus,
      };
    }
  }

  return dormMenus;
};
