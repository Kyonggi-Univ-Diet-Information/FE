import React, { Suspense } from 'react';

import { fetchReviewFavCount } from '@/entities/review/api/fetchReviewFavCount';
import ReviewItem from '@/entities/review/ui/ReviewItem';

import { FOOD_COURT } from '@/shared/config';
import { AuthService } from '@/shared/lib/auth';
import { Loader, Title } from '@/shared/ui';

import { fetchUserFavReview } from '../api/fetchUserFavReview';

export default async function UserFavReviewPage() {
  const [data, isAuthenticated] = await Promise.all([
    fetchUserFavReview(0),
    AuthService.isAuthenticated(),
  ]);

  const allReviews = data?.content ?? [];
  const filteredReviews = allReviews.filter(
    review => review.restaurantType !== FOOD_COURT.DORMITORY,
  );

  const reviewsWithMetadata = await Promise.all(
    filteredReviews.map(async review => {
      const likedCount = await fetchReviewFavCount(
        review.restaurantType,
        review.reviewId,
      );
      return {
        ...review,
        likedCount,
        isLiked: true,
        myReview: review.myReview ?? false,
      };
    }),
  );

  return (
    <>
      <div className='flex flex-col gap-1'>
        <Title>좋아요한 리뷰</Title>
        <p className='text-sm text-gray-500'>
          좋아요한 리뷰를 확인할 수 있습니다.
        </p>
      </div>

      <Suspense fallback={<Loader />}>
        {reviewsWithMetadata.length === 0 && (
          <div className='mt-10 text-center text-gray-500'>
            좋아요한 리뷰가 없어요!
          </div>
        )}
        <div className='flex flex-col gap-2'>
          {reviewsWithMetadata.map(review => (
            <ReviewItem
              key={`${review.restaurantType}-${review.reviewId}`}
              {...review}
              type={review.restaurantType}
              id={review.reviewId}
              foodId={review.foodId}
              updatedAt={review.createdAt}
              isAuthenticated={isAuthenticated}
              isMyReview={review.myReview}
              isLiked={true}
              likedCount={review.likedCount}
            />
          ))}
        </div>
      </Suspense>
    </>
  );
}
