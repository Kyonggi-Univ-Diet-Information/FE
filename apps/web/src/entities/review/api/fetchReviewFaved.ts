'use server';

import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';
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

export const fetchReviewFaved = async (type: FoodCourt) => {
  const data = await Http.get<FetchReviewLikedRes[]>({
    request: ENDPOINT.MEMBER.MEMBER_REVIEW_LIKED(type),
    authorize: true,
    cache: 'force-cache',
    next: {
      tags: [KEY.REVIEW_FAVED(type)],
    },
  });

  return data;
};
