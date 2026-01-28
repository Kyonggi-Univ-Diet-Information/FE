import { Http } from '@/shared/api/http';
import { ENDPOINT, type FoodCourt } from '@/shared/config';
import { reviewKeys } from '@/shared/lib/queryKey';

export const fetchReviewFavCount = async (
  type: FoodCourt,
  reviewId: number,
) => {
  const data = await Http.get<number>({
    request: ENDPOINT.REVIEW_LIKE.LIKED_COUNT(type, reviewId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.favedCount.tag(type, reviewId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};
