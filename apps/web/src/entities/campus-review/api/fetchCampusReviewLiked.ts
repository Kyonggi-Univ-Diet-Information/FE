'use server';

import { ENDPOINT } from '@/lib/axios';
import { KEY } from '@/lib/constants';
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
    cache: 'force-cache',
    next: {
      tags: [KEY.KS_REVIEW_LIKED],
    },
  });

  return data;
};
