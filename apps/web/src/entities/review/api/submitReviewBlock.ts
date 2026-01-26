'use server';

import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';

import { revalidateReviewCache } from '../lib/revalidateReviewCache';

export const submitReviewBlock = async (
  reviewId: number,
  foodId: number,
  type: FoodCourt,
): Promise<{ success: boolean; error?: string }> => {
  try {
    await Http.post({
      request: ENDPOINT.REVIEW_BLOCK.BLOCK(type, reviewId),
      authorize: true,
    });

    revalidateReviewCache({ type, foodId });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '사용자 차단에 실패했습니다',
    };
  }
};
