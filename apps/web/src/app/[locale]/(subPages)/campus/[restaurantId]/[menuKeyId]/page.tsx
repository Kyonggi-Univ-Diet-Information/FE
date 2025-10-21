import {
  CAMPUS_RESTAURANT_ID,
  SubRestaurant,
} from '@/entities/campus-menu/model/campusRestaurant';
import {
  CAMPUS_MENU_KEY,
  MENU_KEY_TO_ID,
} from '@/entities/campus-menu/model/campusMenu';
import { CampusRestaurantPage, CampusRestaurantPageProps } from '@/page/campus';

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ['ko', 'en'];
  const restaurantIds = Object.keys(CAMPUS_RESTAURANT_ID);

  return locales.flatMap(locale =>
    restaurantIds.flatMap(restaurantId => {
      const restaurant = CAMPUS_RESTAURANT_ID[restaurantId] as SubRestaurant;
      const menuKeys = CAMPUS_MENU_KEY[restaurant];

      return menuKeys.map(menuKey => ({
        locale,
        restaurantId,
        menuKeyId: MENU_KEY_TO_ID[menuKey],
      }));
    }),
  );
}

const Page = async (props: CampusRestaurantPageProps) => {
  return <CampusRestaurantPage {...props} />;
};

export default Page;
