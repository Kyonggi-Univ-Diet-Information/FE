import { Link } from '@/shared/i18n/routing';

import { MenuSection } from '@/shared/ui';

import { MenuCard } from '.';

import {
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_NAME,
  CAMPUS_RESTAURANT_NAME_EN,
  RESTAURANT_ID_BY_NAME,
} from '@/lib/constants';
import { getLocale, getTranslations } from 'next-intl/server';
import { fetchCampusMenu } from '../services';

export default async function CampusMenuSection() {
  const campusMenu = await fetchCampusMenu();
  const t = await getTranslations('home');
  const locale = await getLocale();

  return (
    <MenuSection>
      <MenuSection.Header
        title={
          <>
            {t('campusTitle')}{' '}
            <span className='text-point'>{t('campusHighlight')}</span>{' '}
            {t('campusTitleLast')}
            <span className='font-tossFace'> 🍚</span>
          </>
        }
        subtitle={t('campusSubtitle')}
        action={
          <Link
            prefetch
            href='/campus/1'
            className='text-sm underline hover:text-gray-600'
          >
            {t('campusAllView')}
          </Link>
        }
      />
      <MenuSection.Content>
        {CAMPUS_RESTAURANT_NAME.map(restaurant => (
          <MenuCard
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
            <MenuCard.Content>
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
            </MenuCard.Content>
          </MenuCard>
        ))}
      </MenuSection.Content>
    </MenuSection>
  );
}
