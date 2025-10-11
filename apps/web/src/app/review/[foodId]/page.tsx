import { notFound } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/common/Button';
import { Title } from '@/components/layout';

import {
  ReviewFormSection,
  ReviewPagedView,
  ReviewRatingSection,
} from '@/features/review/components';
import { fetchMenuAverage, fetchMenuRatings } from '@/features/review/services';
import { AuthService } from '@/lib/services';

export default async function ReviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ foodId: string }>;
  searchParams: Promise<{ reviewMode: string }>;
}) {
  const [{ foodId: foodIdParam }, { reviewMode }, isAuthenticated] =
    await Promise.all([params, searchParams, AuthService.isAuthenticated()]);

  const foodId = Number(foodIdParam);
  if (isNaN(foodId) || !Number.isInteger(foodId) || foodId <= 0) {
    notFound();
  }

  const [rating, averageRating] = await Promise.all([
    fetchMenuRatings(foodId),
    fetchMenuAverage(foodId),
    // fetchMenuReviews(Number(foodId)),
  ]);

  const isReviewMode = reviewMode === 'true';

  return (
    <>
      <div className='flex flex-col gap-4'>
        <section className='flex items-start justify-between'>
          <div className='flex flex-col gap-1'>
            <Title>
              <span className='text-point'>{foodId}번 음식</span>, 어땠나요?
            </Title>
            <p className='text-sm text-gray-600'>리뷰를 작성해주세요!</p>
          </div>
          <Link href={`/review/${foodId}?reviewMode=true`}>
            <Button variant='secondary' size='sm'>
              리뷰 작성하기
            </Button>
          </Link>
        </section>
        {isAuthenticated && isReviewMode && <ReviewFormSection />}
        <ReviewRatingSection
          rating={rating}
          reviewCount={1}
          averageRating={averageRating}
        />
        <ReviewPagedView />
      </div>
    </>
  );
}
