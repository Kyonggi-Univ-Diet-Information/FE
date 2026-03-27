'use server';

import type { SubmitReviewFavResponse } from './api.model';
import { revalidateReviewFavCache } from '../../model/review/revalidateReviewCache';

import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export const submitReviewFav = async (
  reviewId: number,
  type: FoodCourt,
): Promise<SubmitReviewFavResponse> => {
  try {
    await Http.post({
      request: ENDPOINT.REVIEW_LIKE.LIKE(type, reviewId),
      authorize: true,
    });

    revalidateReviewFavCache(type, reviewId);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : '리뷰 좋아요 등록에 실패했습니다',
    };
  }
};
