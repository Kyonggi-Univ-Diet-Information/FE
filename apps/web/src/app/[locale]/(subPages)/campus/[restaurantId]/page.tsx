import { CAMPUS_RESTAURANT_ID } from '@/entities/campus-menu/model/campusRestaurant';
import { CampusRestaurantPage, CampusRestaurantPageProps } from '@/page/campus';

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ['ko', 'en'];
  const restaurantIds = Object.keys(CAMPUS_RESTAURANT_ID);

  return locales.flatMap(locale =>
    restaurantIds.map(restaurantId => ({
      locale,
      restaurantId,
    })),
  );
}

const Page = async (props: CampusRestaurantPageProps) => {
  return <CampusRestaurantPage {...props} />;
};

export default Page;
