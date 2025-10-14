'use server';

import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';
import { AuthService } from '@/lib/services';
import { MenuType } from './reviewService';

type FetchReviewLikedRes = {
  id: number;
  memberDTO: {
    profileId: null;
    email: string;
    password: null;
    name: string;
    profileUrl: null;
    createdAt: string;
    updatedAt: null;
  };
  kyongsulFoodReviewId: number;
  createdAt: string;
};

export const fetchReviewLiked = async (menuType: MenuType = 'campus') => {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';
    const endpoint =
      menuType === 'campus'
        ? ENDPOINT.MEMBER_KS_REVIEW_LIKED
        : ENDPOINT.MEMBER_REVIEW_LIKED;

    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AuthService.getAccessToken()}`,
      },
      cache: 'force-cache',
      next: {
        tags: [menuType === 'campus' ? KEY.KS_REVIEW_LIKED : KEY.REVIEW_LIKED],
      },
    });

    if (!response.ok) {
      return [];
    }

    const data: FetchReviewLikedRes[] = await response.json();

    if (data && Array.isArray(data)) {
      return data.map(
        (item: { kyongsulFoodReviewId: number }) => item.kyongsulFoodReviewId,
      );
    }

    return [];
  } catch (error) {
    console.error('좋아요 목록 조회 실패:', error);
    return [];
  }
};
