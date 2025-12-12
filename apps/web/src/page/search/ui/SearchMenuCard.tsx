import { MessageSquareText } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import CampusMenuImage from '@/entities/campus-menu/ui/CampusMenuImage';

import { FOOD_COURT_ID } from '@/shared/config';
import { Link } from '@/shared/i18n/routing';

import type { SearchResult } from '../api/fetchSearch';

export default async function SearchMenuCard({
  menuId,
  price,
  restaurantType,
  name,
  nameEn,
  reviewCount,
}: SearchResult) {
  const locale = await getLocale();
  const wonText = locale === 'en' ? '₩' : '원';
  const t = await getTranslations('campus');
  const cardContent = (
    <>
      <div className='flex flex-col gap-1'>
        <span className='font-semibold'>{locale === 'en' ? nameEn : name}</span>
        <span className='text-sm'>
          {locale === 'en'
            ? `${wonText}${price.toLocaleString()}`
            : `${price.toLocaleString()}${wonText}`}
        </span>
        <span className='mt-0.5 text-xs text-gray-900/80'>
          {t('reviewCount')}
          <b className='font-semibold'>{reviewCount.toLocaleString()}</b>
          {t('reviews')}
        </span>
      </div>
      <CampusMenuImage foodCourt={restaurantType} menuId={menuId} />
    </>
  );

  return (
    <>
      <Link
        href={`/review/${FOOD_COURT_ID[restaurantType]}/${menuId}`}
        className='border-b border-gray-100 focus:outline-none md:hidden'
      >
        <div
          className='group flex cursor-pointer justify-between p-4 text-gray-600 active:bg-gray-100/50'
          key={menuId}
        >
          {cardContent}
        </div>
      </Link>

      <div
        className='hidden h-fit w-full justify-between rounded-2xl bg-gray-100/50 p-4 text-gray-600 md:flex'
        key={menuId}
      >
        <div className='flex flex-col justify-between'>
          <span className='mb-2 font-medium'>
            {locale === 'en' ? nameEn : name}
          </span>
          <span className='text-sm text-gray-900/40'>
            {locale === 'en'
              ? `${wonText}${price.toLocaleString()}`
              : `${price.toLocaleString()}${wonText}`}
          </span>
        </div>
        <div className='flex items-start'>
          <Link
            href={`/review/${FOOD_COURT_ID[restaurantType]}/${menuId}`}
            className='group flex cursor-pointer items-center gap-1 rounded-xl border bg-white px-2 py-1 duration-200 hover:bg-gray-200 active:bg-gray-300'
          >
            <MessageSquareText
              size={14}
              className='text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'
            />
            <div className='text-sm text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'>
              {t('reviewCount')} {reviewCount.toLocaleString()}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
