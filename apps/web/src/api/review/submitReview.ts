'use server';

import type { SubmitReviewResponse } from './api.model';
import type { ReviewPost } from './api.type';
import { revalidateReviewCache } from '../../model/review/revalidateReviewCache';

import { ENDPOINT, FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';

export const submitReview = async (
  _prevState: SubmitReviewResponse | null,
  formData: FormData,
): Promise<SubmitReviewResponse> => {
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
