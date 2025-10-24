import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';
import { KEY } from '@/shared/config';

export const fetchReviewFavCount = async (
  type: FoodCourt,
  reviewId: number,
) => {
  const data = await Http.get<number>({
    request: ENDPOINT.REVIEW_LIKE.LIKED_COUNT(type, reviewId),
    cache: 'force-cache',
    next: {
      tags: [KEY.REVIEW_FAVED_COUNT(type, reviewId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
