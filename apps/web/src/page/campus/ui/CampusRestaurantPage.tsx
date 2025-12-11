import { getTranslations } from 'next-intl/server';

import { CampusMenuByRestaurant } from '@/entities/campus-menu';
import {
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_NAME_EN,
  RESTAURANT_ID_BY_NAME,
  getRestaurantsByFoodCourt,
} from '@/entities/campus-menu/model/campusRestaurant';

import { getFoodCourtById } from '@/shared/config';
import { getCampusMainTabs } from '@/shared/lib/campus';
import { Section, StaticTabNavigation } from '@/shared/ui';

export interface CampusRestaurantPageProps {
  params: Promise<{
    locale: string;
    foodCourtId: string;
    restaurantId: string;
    categoryKey?: string;
  }>;
}

export default async function CampusRestaurantPage({
  params,
}: CampusRestaurantPageProps) {
  const { locale, foodCourtId, restaurantId, categoryKey } = await params;
  const t = await getTranslations('campus');
  const tNav = await getTranslations('navigation');

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    throw new Error('Invalid food court id');
  }

  const mainTabs = getCampusMainTabs(locale, tNav('dorm'));

  const restaurantsInFoodCourt = getRestaurantsByFoodCourt(foodCourt);
  const restaurantNames =
    locale === 'en' ? CAMPUS_RESTAURANT_NAME_EN : CAMPUS_RESTAURANT;

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
        subtitle={t('subtitle')}
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
