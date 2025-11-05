'use server';

import { revalidateTag } from 'next/cache';

import { Http } from '@/shared/api/http';
import { ENDPOINT, FoodCourt } from '@/shared/config';
import { KEY } from '@/shared/config';

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

  return Http.post<ReviewPost>({
    request: ENDPOINT.REVIEW_CUD.SUBMIT(type, foodId),
    data: {
      rating: rating,
      title: title,
      content: content,
    },
    authorize: true,
  })
    .catch(error => ({
      success: false,
      error: error.message || '리뷰 등록에 실패했습니다',
    }))
    .then(() => {
      revalidateTag(KEY.REVIEW(type, foodId));
      revalidateTag(KEY.REVIEW_COUNT(type, foodId));
      revalidateTag(KEY.REVIEW_AVERAGE_RATING(type, foodId));
      revalidateTag(KEY.REVIEW_RATING_COUNT(type, foodId));
      return { success: true };
    });
};
