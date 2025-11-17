import { revalidateTag, revalidatePath } from 'next/cache';

import { ENDPOINT, KEY, type FoodCourt } from '@/shared/config';

interface RevalidateReviewOptions {
  type: FoodCourt;
  foodId: number;
  specificPage?: number;
}

export function revalidateReviewCache({
  type,
  foodId,
  specificPage,
}: RevalidateReviewOptions): void {
  revalidateTag(KEY.REVIEW(type, foodId));
  revalidateTag(KEY.REVIEW_COUNT(type, foodId));
  revalidateTag(KEY.REVIEW_AVERAGE_RATING(type, foodId));
  revalidateTag(KEY.REVIEW_RATING_COUNT(type, foodId));

  if (specificPage !== undefined) {
    revalidateTag(KEY.REVIEW_PAGED(type, foodId, specificPage));
  } else {
    revalidatePath(ENDPOINT.REVIEW_R.PAGED(type, foodId));
  }

  revalidateTag(KEY.MEMBER_REVIEW(0));
  revalidateTag(KEY.TOP_MENU);
  revalidateTag(KEY.RECENT_REVIEW);
}

export function revalidateReviewFavCache(
  type: FoodCourt,
  reviewId: number,
): void {
  revalidateTag(KEY.REVIEW_FAVED_COUNT(type, reviewId));
  revalidateTag(KEY.REVIEW_FAVED(type));
  revalidateTag(KEY.MEMBER_FAV_REVIEW(0));
}
