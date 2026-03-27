'use server';

import type {
  EsquareFoodReviewRes,
  FetchReviewLikedRes,
  KyongsulFoodReviewRes,
  SallyBoxFoodReviewRes,
} from './api.type';
import { fetchReviewFavCount } from './fetchReviewFavCount';
import { fetchReviewFaved } from './fetchReviewFaved';
import { fetchReviewPaged } from './fetchReviewPaged';

import { type FoodCourt } from '@/api/config';
import { AuthService } from '@/model/common/auth';

const getReviewIdsFromFaved = (items: FetchReviewLikedRes[]): number[] => {
  if (items.length === 0) return [];

  const first = items[0];
  if ('kyongsulFoodReviewId' in first) {
    return (items as KyongsulFoodReviewRes[]).map(
      item => item.kyongsulFoodReviewId,
    );
  }
  if ('sallyBoxFoodReviewId' in first) {
    return (items as SallyBoxFoodReviewRes[]).map(
      item => item.sallyBoxFoodReviewId,
    );
  }
  if ('esquareFoodReviewId' in first) {
    return (items as EsquareFoodReviewRes[]).map(
      item => item.esquareFoodReviewId,
    );
  }
  return [];
};

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

  const likedReviewItems = isAuthenticated ? await fetchReviewFaved(type) : [];
  const likedReviewIds = getReviewIdsFromFaved(likedReviewItems);

  const reviewsWithMetadata = await Promise.all(
    reviews.content.map(async review => {
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
