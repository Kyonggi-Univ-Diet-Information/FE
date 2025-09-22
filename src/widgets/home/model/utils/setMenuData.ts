import { WeeklyMenu } from "~/widgets/home/types";

export const setMenuData = (response: WeeklyMenu) => {
  const dormMenus = {};
  for (const day in response) {
    dormMenus[day] = {};

    const meals = response[day];
    for (const time in meals) {
      const meal = meals[time];
      const menus = meal.contents.map((food) => ({
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
