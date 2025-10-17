import { MenuSection } from '@/shared/ui';
import {
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_ID,
  CAMPUS_RESTAURANT_NAME_EN,
} from '@/lib/constants';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function CampusHeader({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const t = await getTranslations('campus');
  const locale = await getLocale();
  const restaurantNames =
    locale === 'en' ? CAMPUS_RESTAURANT_NAME_EN : CAMPUS_RESTAURANT;
  const currentRestaurant = CAMPUS_RESTAURANT_ID[restaurantId];

  return (
    <MenuSection.Header
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
  );
}
