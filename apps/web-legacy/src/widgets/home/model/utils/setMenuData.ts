import { WeeklyMenu } from '~/widgets/home/types';

export const setMenuData = (response: WeeklyMenu) => {
  const dormMenus: Record<string, Record<string, any>> = {};
  for (const day in response) {
    dormMenus[day] = {};

    const meals = response[day as keyof typeof response];
    for (const time in meals) {
      const meal = meals[time as keyof typeof meals];
      const menus = meal.contents.map((food: any) => ({
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
