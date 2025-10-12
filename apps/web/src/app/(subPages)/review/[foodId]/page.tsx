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
import { Modal } from '@/components/common';

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

  function LoginModal() {
    return (
      <Modal href={`/review/${foodId}`}>
        <Modal.Header title='로그인이 필요해요!' />
        <p>로그인 후 리뷰를 작성할 수 있어요.</p>
        <Link href='/auth/login' className='self-end'>
          <Button variant='secondary' size='lg' className='w-fit'>
            로그인 하러가기
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
        {!isAuthenticated && isReviewMode && <LoginModal />}
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
