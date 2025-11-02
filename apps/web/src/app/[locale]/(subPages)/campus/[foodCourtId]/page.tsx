import { CampusFoodCourtPage, CampusFoodCourtPageProps } from '@/page/campus';

import { CAMPUS_FOOD_COURTS } from '@/entities/campus-menu/model/campusRestaurant';

import { FOOD_COURT_ID } from '@/shared/config';

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ['ko', 'en'];
  const foodCourtIds = CAMPUS_FOOD_COURTS.map(fc => FOOD_COURT_ID[fc]);

  return locales.flatMap(locale =>
    foodCourtIds.map(foodCourtId => ({
      locale,
      foodCourtId,
    })),
  );
}

const Page = async (props: CampusFoodCourtPageProps) => {
  return <CampusFoodCourtPage {...props} />;
};

export default Page;
