'use server';

import { type FoodCourt } from '@/shared/config';
import { AuthService } from '@/shared/lib/auth';

import { fetchReviewFavCount } from '../api/fetchReviewFavCount';
import { fetchReviewFaved } from '../api/fetchReviewFaved';
import { fetchReviewPaged } from '../api/fetchReviewPaged';
import { Review } from '../model/review';

export interface ReviewWithMetadata extends Review {
  likedCount: number;
  isLiked: boolean;
  isMyReview: boolean;
}

export async function getReviewsAction(
  type: FoodCourt,
  foodId: number,
  pageNo: number,
) {
  const [isAuthenticated, userInfo, reviews] = await Promise.all([
    AuthService.isAuthenticated(),
    AuthService.getUserInfo(),
    fetchReviewPaged(type, foodId, pageNo),
  ]);

  const likedReviewItems = isAuthenticated
    ? await fetchReviewFaved(type)
    : [];

  const likedReviewIds = likedReviewItems.map(
    (item: { kyongsulFoodReviewId: number }) => item.kyongsulFoodReviewId,
  );

  const reviewsWithMetadata = await Promise.all(
    reviews.content.map(async (review) => {
      const likedCount = await fetchReviewFavCount(type, review.id);
      return {
        ...review,
        likedCount,
        isLiked: isAuthenticated && likedReviewIds.includes(review.id),
        isMyReview: userInfo?.name === review.memberName,
      };
    }),
  );

  return {
    content: reviewsWithMetadata,
    totalPages: reviews.totalPages,
    last: reviews.last,
    pageNo: reviews.number,
    isAuthenticated,
  };
}
