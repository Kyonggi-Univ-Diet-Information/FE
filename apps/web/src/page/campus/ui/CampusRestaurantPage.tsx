import { getFoodCourtById } from '@/api/config';
import { CampusMenuByRestaurant } from '@/components/campus';
import { Section, StaticTabNavigation } from '@/components/common';
import {
  CAMPUS_RESTAURANT,
  RESTAURANT_ID_BY_NAME,
  getRestaurantsByFoodCourt,
} from '@/constants/campus/restaurant';
import { getCampusMainTabs } from '@/model/common/campus';

export const dynamic = 'force-dynamic';

export interface CampusRestaurantPageProps {
  params: Promise<{
    foodCourtId: string;
    restaurantId: string;
    categoryKey?: string;
  }>;
}

export default async function CampusRestaurantPage({
  params,
}: CampusRestaurantPageProps) {
  const { foodCourtId, restaurantId, categoryKey } = await params;

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    throw new Error('Invalid food court id');
  }

  const mainTabs = getCampusMainTabs('ko', '기숙사');

  const restaurantsInFoodCourt = getRestaurantsByFoodCourt(foodCourt);
  const restaurantNames = CAMPUS_RESTAURANT;

  const restaurantTabs = restaurantsInFoodCourt.map(restaurant => ({
    key: RESTAURANT_ID_BY_NAME[restaurant],
    label: restaurantNames[restaurant],
    href: `/campus/${foodCourtId}/${RESTAURANT_ID_BY_NAME[restaurant]}`,
  }));

  return (
    <>
      <Section.Header
        title={
          <StaticTabNavigation
            tabs={mainTabs}
            currentTabKey={foodCourtId}
            variant='header'
          />
        }
        subtitle='리뷰 버튼을 클릭해서 리뷰를 작성해보세요!'
      />
      {restaurantTabs.length > 0 && (
        <StaticTabNavigation
          tabs={restaurantTabs}
          currentTabKey={restaurantId}
        />
      )}
      <CampusMenuByRestaurant
        foodCourtId={foodCourtId}
        restaurantId={restaurantId}
        categoryKey={categoryKey}
      />
    </>
  );
}
