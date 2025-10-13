import Link from 'next/link';

import { MenuSection } from '@/components/common';

import { MenuCard } from '.';

import {
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_NAME,
  CAMPUS_RESTAURANT_NAME_EN,
} from '@/lib/constants';
import type { CampusMenu, SubRestaurant } from '@/types';
import { useLocale, useTranslations } from 'next-intl';

export default function CampusMenuSection({
  campusMenu,
}: {
  campusMenu: Record<SubRestaurant, CampusMenu[]>;
}) {
  const t = useTranslations('home');
  const locale = useLocale();

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
            href='/campus'
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
            href={`/campus?restaurant=${restaurant}`}
          >
            <p className='flex items-center justify-between font-semibold'>
              <span>
                {locale === 'en'
                  ? CAMPUS_RESTAURANT_NAME_EN[restaurant]
                  : CAMPUS_RESTAURANT[restaurant]}
              </span>
              {/* <span className='rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium'>
                {t('campusHighlight')}
              </span> */}
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
