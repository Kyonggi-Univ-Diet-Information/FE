import { CampusFoodCourtPage, CampusFoodCourtPageProps } from '@/page/campus';

import { CAMPUS_FOOD_COURTS } from '@/entities/campus-menu/model/campusRestaurant';

import { FOOD_COURT_ID } from '@/shared/config';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  const foodCourtIds = CAMPUS_FOOD_COURTS.map(fc => FOOD_COURT_ID[fc]);

  return foodCourtIds.map(foodCourtId => ({
    foodCourtId,
  }));
}

const Page = async (props: CampusFoodCourtPageProps) => {
  return <CampusFoodCourtPage {...props} />;
};

export default Page;
