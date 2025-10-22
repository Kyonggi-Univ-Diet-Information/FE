'use server';

import { ENDPOINT, FOOD_COURT } from '@/shared/config';
import { KEY } from '@/shared/config';

import { revalidateTag } from 'next/cache';
import { MenuType, ReviewPost } from '../model/reviewPost';
import { Http } from '@/shared/api/http';

export const submitMenuReview = async (
  _prevState: { success: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ success: boolean; error?: string }> => {
  const foodId = formData.get('foodId');
  const rating = formData.get('rating');
  const title = formData.get('title') || '';
  const content = formData.get('content');
  const menuType = (formData.get('menuType') as MenuType) || 'campus';

  const submitEndpoint = ENDPOINT.REVIEW_CUD.SUBMIT(
    menuType === 'dorm' ? FOOD_COURT.DORMITORY : FOOD_COURT.KYONGSUL,
    Number(foodId),
  );

  return Http.post<ReviewPost>({
    request: submitEndpoint,
    data: {
      rating: Number(rating),
      title: title as string,
      content: content as string,
    },
    authorize: true,
  })
    .catch(error => ({
      success: false,
      error: error.message || '리뷰 등록에 실패했습니다',
    }))
    .then(() => {
      if (menuType === 'dorm') {
        revalidateTag(KEY.REVIEW(Number(foodId)));
        revalidateTag(KEY.REVIEW_COUNT(Number(foodId)));
      } else {
        revalidateTag(KEY.KS_REVIEW(Number(foodId)));
        revalidateTag(KEY.KS_REVIEW_COUNT(Number(foodId)));
        revalidateTag(KEY.KS_REVIEW_AVERAGE_RATING(Number(foodId)));
        revalidateTag(KEY.KS_REVIEW_RATING_COUNT(Number(foodId)));
      }
      return { success: true };
    });
};
