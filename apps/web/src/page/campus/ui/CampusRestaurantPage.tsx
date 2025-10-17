import {
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_ID,
  CAMPUS_RESTAURANT_NAME,
  CAMPUS_RESTAURANT_NAME_EN,
  RESTAURANT_ID_BY_NAME,
} from '@/entities/campus-menu/model/campusRestaurant';

import { Section, StaticTabNavigation } from '@/shared/ui';
import { CampusMenuByRestaurant } from '@/entities/campus-menu';
import { getTranslations } from 'next-intl/server';

export interface CampusRestaurantPageProps {
  params: Promise<{ locale: string; restaurantId: string }>;
}

export default async function CampusRestaurantPage({
  params,
}: CampusRestaurantPageProps) {
  const { locale, restaurantId } = await params;
  const t = await getTranslations('campus');

  const currentRestaurant = CAMPUS_RESTAURANT_ID[restaurantId];
  const restaurantNames =
    locale === 'en' ? CAMPUS_RESTAURANT_NAME_EN : CAMPUS_RESTAURANT;
  const tabs = CAMPUS_RESTAURANT_NAME.map(restaurant => ({
    key: RESTAURANT_ID_BY_NAME[restaurant],
    label: restaurantNames[restaurant],
    href: `/campus/${RESTAURANT_ID_BY_NAME[restaurant]}`,
  }));

  return (
    <>
      <Section.Header
        title={
          <>
            {' '}
            {t('pageTitle')}{' '}
            <span className='text-point'>
              {restaurantNames[currentRestaurant]}
            </span>{' '}
            {t('menu')}
            <span className='font-tossFace'> 🍚</span>
          </>
        }
        subtitle={t('subtitle')}
      />
      <StaticTabNavigation tabs={tabs} currentTabKey={restaurantId} />
      <CampusMenuByRestaurant restaurantId={restaurantId} />
    </>
  );
}
