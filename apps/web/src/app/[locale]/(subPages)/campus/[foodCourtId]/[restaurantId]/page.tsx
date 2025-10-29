import { CampusRestaurantPage, CampusFoodCourtPage } from '@/page/campus';

import type { CategoryMenuResponse } from '@/entities/campus-menu/model/campusMenu';
import {
  CAMPUS_FOOD_COURTS,
  FOOD_COURT_RESTAURANTS,
  RESTAURANT_ID_BY_NAME,
  hasSubRestaurants,
} from '@/entities/campus-menu/model/campusRestaurant';

import type { BaseResponse } from '@/shared/api/baseResponse';
import { Http } from '@/shared/api/http';
import { FOOD_COURT_ID, getFoodCourtById } from '@/shared/config';
import { ENDPOINT } from '@/shared/config/endpoint';

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales = ['ko', 'en'];
  const params: Array<{
    locale: string;
    foodCourtId: string;
    restaurantId: string;
  }> = [];

  CAMPUS_FOOD_COURTS.forEach(foodCourt => {
    const foodCourtId = FOOD_COURT_ID[foodCourt];
    const restaurants = FOOD_COURT_RESTAURANTS[foodCourt];

    if (restaurants.length > 0) {
      locales.forEach(locale => {
        restaurants.forEach(restaurant => {
          params.push({
            locale,
            foodCourtId,
            restaurantId: RESTAURANT_ID_BY_NAME[restaurant],
          });
        });
      });
    }
  });

  for (const foodCourt of CAMPUS_FOOD_COURTS) {
    if (!hasSubRestaurants(foodCourt)) {
      const foodCourtId = FOOD_COURT_ID[foodCourt];

      try {
        const response = await Http.get<BaseResponse<CategoryMenuResponse>>({
          request: ENDPOINT.MENU.MENU_BY_CATEGORY(foodCourt),
          cache: 'force-cache',
        });

        const categories = Object.keys(response.result);

        locales.forEach(locale => {
          categories.forEach(category => {
            params.push({
              locale,
              foodCourtId,
              restaurantId: category,
            });
          });
        });
      } catch (error) {
        console.error(`Failed to fetch categories for ${foodCourt}:`, error);
      }
    }
  }

  return params;
}

const Page = async (props: {
  params: Promise<{
    locale: string;
    foodCourtId: string;
    restaurantId: string;
  }>;
}) => {
  const { locale, foodCourtId, restaurantId } = await props.params;
  const foodCourt = getFoodCourtById(foodCourtId);

  if (!foodCourt) {
    throw new Error('Invalid food court id');
  }

  if (hasSubRestaurants(foodCourt)) {
    return (
      <CampusRestaurantPage
        params={Promise.resolve({ locale, foodCourtId, restaurantId })}
      />
    );
  }

  return (
    <CampusFoodCourtPage
      params={Promise.resolve({
        locale,
        foodCourtId,
        categoryKey: restaurantId,
      })}
    />
  );
};

export default Page;
