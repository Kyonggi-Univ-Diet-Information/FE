'use server';

import { ENDPOINT, type FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export const submitReviewReport = async (
  reviewId: number,
  type: FoodCourt,
  reasonType: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    await Http.post({
      request: ENDPOINT.REVIEW_REPORT.REPORT(type, reviewId, reasonType),
      authorize: true,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '리뷰 신고에 실패했습니다',
    };
  }
};
