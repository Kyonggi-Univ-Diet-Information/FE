import React, { Suspense } from 'react';

import { fetchReviewFavCount } from '@/entities/review/api/fetchReviewFavCount';
import ReviewItem from '@/entities/review/ui/ReviewItem';

import { AuthService } from '@/shared/lib/auth';
import { Loader, Title } from '@/shared/ui';

import { fetchUserFavReview } from '../api/fetchUserFavReview';

export default async function UserFavReviewPage() {
  const [data, isAuthenticated] = await Promise.all([
    fetchUserFavReview(0),
    AuthService.isAuthenticated(),
  ]);

  const reviewsWithMetadata = data
    ? await Promise.all(
        data.content.map(async review => {
          const likedCount = await fetchReviewFavCount(
            'KYONGSUL',
            review.reviewId,
          );
          return {
            ...review,
            likedCount,
            isLiked: true,
            myReview: review.myReview || false,
          };
        }),
      )
    : [];

  return (
    <>
      <div className='flex flex-col gap-1'>
        <Title>좋아요한 리뷰</Title>
        <p className='text-sm text-gray-500'>
          좋아요한 리뷰를 확인할 수 있습니다.
        </p>
      </div>

      <Suspense fallback={<Loader />}>
        {data?.content.length === 0 && (
          <div className='mt-10 text-center text-gray-500'>
            좋아요한 리뷰가 없어요!
          </div>
        )}
        <div className='flex flex-col gap-2'>
          {reviewsWithMetadata.map(review => (
            <ReviewItem
              key={review.reviewId}
              type='KYONGSUL'
              id={review.reviewId}
              updatedAt={review.createdAt}
              isAuthenticated={isAuthenticated}
              isMyReview={review.myReview}
              {...review}
            />
          ))}
        </div>
      </Suspense>
    </>
  );
}
