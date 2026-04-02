'use server';


import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import { revalidateReviewCache } from '@/model/review/revalidateReviewCache';


export const removeReview = async (
  reviewId: number,
  foodId: number,
  type: FoodCourt,
): Promise<{ success: boolean; error?: string }> => {
  try {
    await Http.del({
      request: ENDPOINT.REVIEW_CUD.DELETE(type, reviewId),
      authorize: true,
    });

    revalidateReviewCache({ type, foodId });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '리뷰 삭제에 실패했습니다',
    };
  }
};
