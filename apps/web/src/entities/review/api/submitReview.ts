'use server';

import { Http } from '@/shared/api/http';
import { ENDPOINT, FoodCourt } from '@/shared/config';

import { revalidateReviewCache } from '../lib/revalidateReviewCache';
import { ReviewPost } from '../model/reviewPost';

export const submitReview = async (
  _prevState: { success: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ success: boolean; error?: string }> => {
  const foodId = Number(formData.get('foodId'));
  const rating = Number(formData.get('rating'));
  const title = '';
  const content = String(formData.get('content'));
  const type = formData.get('foodCourt') as FoodCourt;

  try {
    await Http.post<ReviewPost>({
      request: ENDPOINT.REVIEW_CUD.SUBMIT(type, foodId),
      data: {
        rating: rating,
        title: title,
        content: content,
      },
      authorize: true,
    });

    revalidateReviewCache({ type, foodId });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '리뷰 등록에 실패했습니다',
    };
  }
};
