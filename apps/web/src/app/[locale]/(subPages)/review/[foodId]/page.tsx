/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';
import { Link } from '@/shared/i18n/routing';

import { getTranslations, getLocale } from 'next-intl/server';

import { Button } from '@/shared/ui/Button';
import { Title } from '@/components/layout';

import {
  ReviewFormSection,
  ReviewPagedView,
  ReviewRatingSection,
} from '@/features/review/components';
import { getReviewService, MenuType } from '@/features/review/services';
import { AuthService } from '@/lib/services';
import { Loader, Modal } from '@/shared/ui';
import { fetchCampusMenu, fetchDormMenu } from '@/features/menu/services';
import { Suspense } from 'react';

export default async function ReviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ foodId: string }>;
  searchParams: Promise<{
    reviewMode?: string;
    pageNo?: number;
    menuType?: string;
  }>;
}) {
  const [
    { foodId: foodIdParam },
    { reviewMode, pageNo, menuType = 'campus' },
    isAuthenticated,
  ] = await Promise.all([params, searchParams, AuthService.isAuthenticated()]);

  const foodId = Number(foodIdParam);
  if (isNaN(foodId) || !Number.isInteger(foodId) || foodId <= 0) {
    notFound();
  }

  const t = await getTranslations('reviewPage');
  const locale = await getLocale();

  const reviewService = getReviewService(menuType as MenuType);

  const [rating, averageRating, reviews, allMenu] = await Promise.all([
    reviewService.fetchRatings(foodId),
    reviewService.fetchAverage(foodId),
    reviewService.fetchReviews(foodId, pageNo),
    menuType === 'dorm' ? fetchDormMenu() : fetchCampusMenu(),
  ]);

  const isReviewMode = reviewMode === 'true';

  const menuName =
    menuType === 'dorm'
      ? Object.values(allMenu)
          .flatMap(day => Object.values(day))
          .flatMap((time: any) => time.contents)
          .find((menu: any) => menu.dietFoodDTO.id === foodId)?.dietFoodDTO[
          locale === 'en' ? 'nameEn' : 'name'
        ]
      : Object.values(allMenu)
          .flat()
          .find(menu => menu.id === foodId)?.[
          locale === 'en' ? 'nameEn' : 'name'
        ];

  const reviewCount = rating[1] + rating[2] + rating[3] + rating[4] + rating[5];

  function LoginModal() {
    const currentPath = `/review/${foodId}?menuType=${menuType}`;
    return (
      <Modal href={`/review/${foodId}`}>
        <Modal.Header title={t('loginRequiredTitle')} />
        <p>{t('loginRequiredDescription')}</p>
        <Link
          href={{
            pathname: '/auth/login',
            query: { returnUrl: currentPath },
          }}
          className='self-end'
        >
          <Button variant='secondary' size='lg' className='w-fit'>
            {t('loginButton')}
          </Button>
        </Link>
      </Modal>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <section className='flex items-start justify-between'>
          <div className='flex flex-col gap-1'>
            <Title>
              <span className='text-point'>{menuName}</span>
              {t('reviewPromptTitle')}
            </Title>
            <p className='text-sm text-gray-600'>{t('reviewPrompt')}</p>
          </div>
          <Link href={`/review/${foodId}?reviewMode=true&menuType=${menuType}`}>
            <Button variant='secondary' size='sm'>
              {t('writeReview')}
            </Button>
          </Link>
        </section>
        {isAuthenticated && isReviewMode && (
          <ReviewFormSection foodId={foodId} menuType={menuType as MenuType} />
        )}
        {!isAuthenticated && isReviewMode && <LoginModal />}
        <ReviewRatingSection
          rating={rating}
          reviewCount={reviewCount}
          averageRating={averageRating}
        />
        <Suspense fallback={<Loader />}>
          <ReviewPagedView
            totalPages={reviews.totalPages}
            foodId={foodId}
            pageNo={pageNo || 0}
            menuType={menuType as MenuType}
          />
        </Suspense>
      </div>
    </>
  );
}
