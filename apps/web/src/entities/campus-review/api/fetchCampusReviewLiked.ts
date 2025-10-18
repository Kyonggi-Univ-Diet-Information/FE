'use server';

import { ENDPOINT } from '@/shared/config';
import { KEY } from '@/shared/config';
import { Http } from '@/shared/api/http';

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
    request: ENDPOINT.MEMBER_KS_REVIEW_LIKED,
    authorize: true,
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_LIKED],
    },
  });

  return data;
};
