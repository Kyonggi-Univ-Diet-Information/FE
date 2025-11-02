import { getTranslations } from 'next-intl/server';

import { CampusMenuByRestaurant } from '@/entities/campus-menu';
import {
  CAMPUS_FOOD_COURTS,
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_NAME_EN,
  RESTAURANT_ID_BY_NAME,
  getRestaurantsByFoodCourt,
} from '@/entities/campus-menu/model/campusRestaurant';

import {
  FOOD_COURT_ID,
  FOOD_COURT_NAME,
  FOOD_COURT_NAME_EN,
  getFoodCourtById,
} from '@/shared/config';
import { Link } from '@/shared/i18n/routing';
import { Section, StaticTabNavigation } from '@/shared/ui';
import { cn } from '@/shared/utils';

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

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    throw new Error('Invalid food court id');
  }

  const foodCourtNames = locale === 'en' ? FOOD_COURT_NAME_EN : FOOD_COURT_NAME;

  const foodCourts = CAMPUS_FOOD_COURTS.map(id => (
    <Link
      prefetch
      key={id}
      href={`/campus/${FOOD_COURT_ID[id]}`}
      className={cn(
        'font-semibold',
        FOOD_COURT_ID[id] === foodCourtId ? 'text-black' : 'text-gray-600/50',
      )}
    >
      {foodCourtNames[id]}
    </Link>
  ));

  const restaurantsInFoodCourt = getRestaurantsByFoodCourt(foodCourt);
  const restaurantNames =
    locale === 'en' ? CAMPUS_RESTAURANT_NAME_EN : CAMPUS_RESTAURANT;

  const tabs = restaurantsInFoodCourt.map(restaurant => ({
    key: RESTAURANT_ID_BY_NAME[restaurant],
    label: restaurantNames[restaurant],
    href: `/campus/${foodCourtId}/${RESTAURANT_ID_BY_NAME[restaurant]}`,
  }));

  return (
    <>
      <Section.Header
        title={<div className='flex items-center gap-2'>{foodCourts}</div>}
        subtitle={t('subtitle')}
      />
      {tabs.length > 0 && (
        <StaticTabNavigation tabs={tabs} currentTabKey={restaurantId} />
      )}
      <CampusMenuByRestaurant
        foodCourtId={foodCourtId}
        restaurantId={restaurantId}
        categoryKey={categoryKey}
      />
    </>
  );
}
