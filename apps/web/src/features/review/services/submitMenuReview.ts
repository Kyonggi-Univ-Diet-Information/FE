'use server';

import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';
import { AuthService } from '@/lib/services';

import { revalidateTag } from 'next/cache';

export const submitMenuReview = async (
  _prevState: { success: boolean; error?: string } | null,
  formData: FormData,
) => {
  const foodId = formData.get('foodId');
  const rating = formData.get('rating');
  const title = formData.get('title');
  const content = formData.get('content');

  try {
    const response = await fetch(ENDPOINT.KS_REVIEW_SUBMIT + foodId, {
      method: 'POST',
      body: JSON.stringify({ rating, title, content }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('리뷰 등록에 실패했습니다');
    }

    revalidateTag(KEY.KS_REVIEW(Number(foodId)));

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: '리뷰 등록에 실패했습니다' };
  }
};
