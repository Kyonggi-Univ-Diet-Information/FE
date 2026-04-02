'use server';


import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import { revalidateReviewFavCache } from '@/model/review/revalidateReviewCache';


export const removeReviewFav = async (
  reviewId: number,
  type: FoodCourt,
): Promise<{ success: boolean; error?: string }> => {
  try {
    await Http.del({
      request: ENDPOINT.REVIEW_LIKE.UNLIKE(type, reviewId),
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
          : '리뷰 좋아요 삭제에 실패했습니다',
    };
  }
};
