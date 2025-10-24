'use server';

import { Http } from '@/shared/api/http';
import { ENDPOINT, FOOD_COURT } from '@/shared/config';
import { KEY } from '@/shared/config';

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

export const fetchCampusReviewLiked = async () => {
  const data = await Http.get<FetchReviewLikedRes[]>({
    request: ENDPOINT.MEMBER.MEMBER_REVIEW_LIKED(FOOD_COURT.KYONGSUL),
    authorize: true,
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_LIKED],
    },
  });

  return data;
};
