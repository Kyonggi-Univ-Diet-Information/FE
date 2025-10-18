import { Card } from '@/shared/ui';
import {
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_NAME,
  CAMPUS_RESTAURANT_NAME_EN,
  RESTAURANT_ID_BY_NAME,
} from '../model/campusRestaurant';
import { getLocale, getTranslations } from 'next-intl/server';
import { fetchCampusMenu } from '../api/fetchCampusMenu';

export default async function CampusMenuAll() {
  const locale = await getLocale();
  const t = await getTranslations('home');
  const campusMenu = await fetchCampusMenu();
  return (
    <>
      {CAMPUS_RESTAURANT_NAME.map(restaurant => (
        <Card
          key={restaurant}
          className='h-70'
          href={`/campus/${RESTAURANT_ID_BY_NAME[restaurant]}`}
        >
          <p className='flex items-center justify-between font-semibold'>
            <span>
              {locale === 'en'
                ? CAMPUS_RESTAURANT_NAME_EN[restaurant]
                : CAMPUS_RESTAURANT[restaurant]}
            </span>
          </p>
          <Card.Content>
            {campusMenu[restaurant].slice(0, 8).map(menu => (
              <p
                className='flex items-center justify-between text-gray-600'
                key={menu.id}
              >
                <span className='max-w-[70%] truncate'>
                  {locale === 'en' ? menu.nameEn : menu.name}
                </span>
                <span className='text-sm text-gray-900/40'>
                  {menu.price}
                  {t('won')}
                </span>
              </p>
            ))}
          </Card.Content>
        </Card>
      ))}
    </>
  );
}
