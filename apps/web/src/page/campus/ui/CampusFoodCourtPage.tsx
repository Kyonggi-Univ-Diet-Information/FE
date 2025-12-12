import { getTranslations } from 'next-intl/server';

import {
  CampusMenuByFoodCourt,
  CampusMenuByRestaurant,
} from '@/entities/campus-menu';
import {
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_NAME_EN,
  getRestaurantsByFoodCourt,
  hasSubRestaurants,
  RESTAURANT_ID_BY_NAME,
} from '@/entities/campus-menu/model/campusRestaurant';

import { getFoodCourtById } from '@/shared/config';
import { getCampusMainTabs } from '@/shared/lib/campus';
import { Section, StaticTabNavigation } from '@/shared/ui';

export interface CampusFoodCourtPageProps {
  params: Promise<{
    locale: string;
    foodCourtId: string;
    categoryKey?: string;
  }>;
}

export default async function CampusFoodCourtPage({
  params,
}: CampusFoodCourtPageProps) {
  const { locale, foodCourtId, categoryKey } = await params;
  const t = await getTranslations('campus');
  const tNav = await getTranslations('navigation');

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    throw new Error('Invalid food court id');
  }

  const mainTabs = getCampusMainTabs(locale, tNav('dorm'));

  if (hasSubRestaurants(foodCourt)) {
    const restaurants = getRestaurantsByFoodCourt(foodCourt);
    const firstRestaurant = restaurants[0];
    const firstRestaurantId = RESTAURANT_ID_BY_NAME[firstRestaurant];
    const restaurantNames =
      locale === 'en' ? CAMPUS_RESTAURANT_NAME_EN : CAMPUS_RESTAURANT;

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
          subtitle={t('subtitle')}
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
        subtitle={t('subtitle')}
      />
      <CampusMenuByFoodCourt foodCourt={foodCourt} categoryKey={categoryKey} />
    </>
  );
}
