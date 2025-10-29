import { CampusRestaurantPage } from '@/page/campus';

import type { CategoryMenuResponse } from '@/entities/campus-menu/model/campusMenu';
import {
  CAMPUS_FOOD_COURTS,
  FOOD_COURT_RESTAURANTS,
  RESTAURANT_ID_BY_NAME,
  hasSubRestaurants,
} from '@/entities/campus-menu/model/campusRestaurant';

import type { BaseResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { FOOD_COURT_ID } from '@/shared/config';
import { ENDPOINT } from '@/shared/config/endpoint';

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales = ['ko', 'en'];
  const params: Array<{
    locale: string;
    foodCourtId: string;
    restaurantId: string;
    categoryKey: string;
  }> = [];

  for (const foodCourt of CAMPUS_FOOD_COURTS) {
    if (!hasSubRestaurants(foodCourt)) continue;

    const foodCourtId = FOOD_COURT_ID[foodCourt];
    const restaurants = FOOD_COURT_RESTAURANTS[foodCourt];

    try {
      const response = await Http.get<BaseResponse<CategoryMenuResponse>>({
        request: ENDPOINT.MENU.MENU_BY_CATEGORY(foodCourt),
        cache: 'force-cache',
      });

      const data = response.result;

      locales.forEach(locale => {
        restaurants.forEach(restaurant => {
          const restaurantId = RESTAURANT_ID_BY_NAME[restaurant];
          const restaurantData = data[restaurant];

          if (restaurantData && typeof restaurantData === 'object') {
            const categories = Object.keys(restaurantData);

            categories.forEach(category => {
              params.push({
                locale,
                foodCourtId,
                restaurantId,
                categoryKey: category,
              });
            });
          }
        });
      });
    } catch (error) {
      console.error(`Failed to fetch categories for ${foodCourt}:`, error);
    }
  }

  return params;
}

const Page = async (props: {
  params: Promise<{
    locale: string;
    foodCourtId: string;
    restaurantId: string;
    categoryKey: string;
  }>;
}) => {
  const { locale, foodCourtId, restaurantId, categoryKey } = await props.params;

  return (
    <CampusRestaurantPage
      params={Promise.resolve({
        locale,
        foodCourtId,
        restaurantId,
        categoryKey,
      })}
    />
  );
};

export default Page;
