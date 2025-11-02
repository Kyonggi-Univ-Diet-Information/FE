import { MessageSquareText } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { fetchReviewCount } from '@/entities/review/api/fetchReviewCount';

import { type FoodCourt, FOOD_COURT_ID } from '@/shared/config';
import { Link } from '@/shared/i18n/routing';

import CampusMenuImage from './CampusMenuImage';
import type { CampusMenu } from '../model/campusMenu';

interface CampusMenuCardProps extends CampusMenu {
  foodCourt: FoodCourt;
  locale?: string;
}

export default async function CampusMenuCard({
  id,
  name,
  nameEn,
  price,
  foodCourt,
  locale,
}: CampusMenuCardProps) {
  const wonText = locale === 'en' ? '₩' : '원';
  const reviewText = locale === 'en' ? 'Review' : '리뷰';
  const menuName = locale === 'en' ? nameEn : name;
  const reviewCount = await fetchReviewCount(foodCourt, id);
  const foodCourtId = FOOD_COURT_ID[foodCourt];
  const t = await getTranslations('campus');

  const cardContent = (
    <>
      <div className='flex flex-col gap-1'>
        <span className='font-semibold'>{menuName}</span>
        <span className='text-sm'>
          {locale === 'en'
            ? `${wonText}${price.toLocaleString()}`
            : `${price.toLocaleString()}${wonText}`}
        </span>
        <span className='mt-0.5 text-xs text-gray-900/80'>
          {t('reviewCount')}
          <b className='font-semibold'>{reviewCount}</b>
          {t('reviews')}
        </span>
      </div>
      <CampusMenuImage foodCourt={foodCourt} menuId={id} />
    </>
  );

  return (
    <>
      <Link
        href={`/review/${foodCourtId}/${id}`}
        className='w-screen -translate-x-4 border-b border-gray-100 md:hidden'
      >
        <div
          className='group flex cursor-pointer justify-between p-4 text-gray-600 active:bg-gray-100/50'
          key={id}
        >
          {cardContent}
        </div>
      </Link>

      <div
        className='hidden w-full justify-between rounded-2xl bg-gray-100/50 p-4 text-gray-600 md:flex'
        key={id}
      >
        <div className='flex flex-col justify-between'>
          <span className='mb-2 font-medium'>{menuName}</span>
          <span className='text-sm text-gray-900/40'>
            {locale === 'en'
              ? `${wonText}${price.toLocaleString()}`
              : `${price.toLocaleString()}${wonText}`}
          </span>
        </div>
        <div className='flex items-start'>
          <Link
            href={`/review/${foodCourtId}/${id}`}
            className='group flex cursor-pointer items-center gap-1 rounded-xl border bg-white px-2 py-1 duration-200 hover:bg-gray-200 active:bg-gray-300'
          >
            <MessageSquareText
              size={14}
              className='text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'
            />
            <div className='text-sm text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'>
              {reviewText} {reviewCount}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
