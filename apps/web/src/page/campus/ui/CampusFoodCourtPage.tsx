import {
  CampusMenuByFoodCourt,
  CampusMenuByRestaurant,
} from '@/entities/campus-menu';
import {
  CAMPUS_RESTAURANT,
  getRestaurantsByFoodCourt,
  hasSubRestaurants,
  RESTAURANT_ID_BY_NAME,
} from '@/entities/campus-menu/model/campusRestaurant';

import { getFoodCourtById } from '@/shared/config';
import { getCampusMainTabs } from '@/shared/lib/campus';
import { Section, StaticTabNavigation } from '@/shared/ui';

export const dynamic = 'force-dynamic';

export interface CampusFoodCourtPageProps {
  params: Promise<{
    foodCourtId: string;
    categoryKey?: string;
  }>;
}

export default async function CampusFoodCourtPage({
  params,
}: CampusFoodCourtPageProps) {
  const { foodCourtId, categoryKey } = await params;

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    throw new Error('Invalid food court id');
  }

  const mainTabs = getCampusMainTabs('ko', '기숙사');

  if (hasSubRestaurants(foodCourt)) {
    const restaurants = getRestaurantsByFoodCourt(foodCourt);
    const firstRestaurant = restaurants[0];
    const firstRestaurantId = RESTAURANT_ID_BY_NAME[firstRestaurant];
    const restaurantNames = CAMPUS_RESTAURANT;

    const restaurantTabs = restaurants.map(restaurant => ({
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
          subtitle="리뷰 버튼을 클릭해서 리뷰를 작성해보세요!"
        />
        <StaticTabNavigation
          tabs={restaurantTabs}
          currentTabKey={firstRestaurantId}
        />
        <CampusMenuByRestaurant
          foodCourtId={foodCourtId}
          restaurantId={firstRestaurantId}
        />
      </>
    );
  }

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
        subtitle="리뷰 버튼을 클릭해서 리뷰를 작성해보세요!"
      />
      <CampusMenuByFoodCourt foodCourt={foodCourt} categoryKey={categoryKey} />
    </>
  );
}
