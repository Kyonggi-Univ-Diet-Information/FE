'use server';

import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';
import { AuthService } from '@/lib/services';
import type { MenuType } from './reviewService';

import { revalidateTag } from 'next/cache';

export const submitMenuReview = async (
  _prevState: { success: boolean; error?: string } | null,
  formData: FormData,
) => {
  const foodId = formData.get('foodId');
  const rating = formData.get('rating');
  const title = formData.get('title') || '';
  const content = formData.get('content');
  const menuType = (formData.get('menuType') as MenuType) || 'campus';

  const submitEndpoint =
    menuType === 'dorm' ? ENDPOINT.REVIEW_SUBMIT : ENDPOINT.KS_REVIEW_SUBMIT;

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';
    const response = await fetch(`${apiUrl}${submitEndpoint}${foodId}`, {
      method: 'POST',
      body: JSON.stringify({ rating: Number(rating), title, content }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AuthService.getAccessToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('리뷰 등록에 실패했습니다');
    }

    if (menuType === 'dorm') {
      revalidateTag(KEY.REVIEW(Number(foodId)));
      revalidateTag(KEY.REVIEW_COUNT(Number(foodId)));
    } else {
      revalidateTag(KEY.KS_REVIEW(Number(foodId)));
      revalidateTag(KEY.KS_REVIEW_COUNT(Number(foodId)));
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: '리뷰 등록에 실패했습니다' };
  }
};
