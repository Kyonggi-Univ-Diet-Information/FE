import { CampusRestaurantPage, CampusRestaurantPageProps } from '@/page/campus';

import {
  CAMPUS_MENU_KEY,
  MENU_KEY_TO_ID,
} from '@/entities/campus-menu/model/campusMenu';
import {
  CAMPUS_FOOD_COURTS,
  FOOD_COURT_RESTAURANTS,
  RESTAURANT_ID_BY_NAME,
} from '@/entities/campus-menu/model/campusRestaurant';

import { FOOD_COURT_ID } from '@/shared/config';

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ['ko', 'en'];
  const params: Array<{
    locale: string;
    foodCourtId: string;
    restaurantId: string;
    menuKeyId: string;
  }> = [];

  CAMPUS_FOOD_COURTS.forEach(foodCourt => {
    const foodCourtId = FOOD_COURT_ID[foodCourt];
    const restaurants = FOOD_COURT_RESTAURANTS[foodCourt];

    if (restaurants.length > 0) {
      locales.forEach(locale => {
        restaurants.forEach(restaurant => {
          const restaurantId = RESTAURANT_ID_BY_NAME[restaurant];
          const menuKeys = CAMPUS_MENU_KEY[restaurant];

          menuKeys.forEach(menuKey => {
            params.push({
              locale,
              foodCourtId,
              restaurantId,
              menuKeyId: MENU_KEY_TO_ID[menuKey],
            });
          });
        });
      });
    }
  });

  return params;
}

const Page = async (props: CampusRestaurantPageProps) => {
  return <CampusRestaurantPage {...props} />;
};

export default Page;
