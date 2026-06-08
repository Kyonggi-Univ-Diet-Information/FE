'use server';


import { ENDPOINT, FoodCourt } from '@/api/config';
import { Http } from '@/api/config/api-handlers';
import type { ReviewPost } from '@/api/review/api.type';

import { runServerAction, type ServerActionResult } from '@/model/common/serverAction';
import { revalidateReviewCache } from '@/model/review/revalidateReviewCache';

export const submitReview = async (
  _prevState: ServerActionResult | null,
  formData: FormData,
): Promise<ServerActionResult> => {
  const foodId = Number(formData.get('foodId'));
  const rating = Number(formData.get('rating'));
  const title = '';
  const content = String(formData.get('content'));
  const type = formData.get('foodCourt') as FoodCourt;

  return runServerAction(async () => {
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
  }, '리뷰 등록에 실패했습니다');
};
