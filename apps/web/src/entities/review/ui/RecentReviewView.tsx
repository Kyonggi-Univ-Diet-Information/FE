import { CampusMenuName } from '@/entities/campus-menu';

import {
  FOOD_COURT_ID,
  FOOD_COURT_NAME,
  type FoodCourt,
} from '@/shared/config';
import { getRelativeDate } from '@/shared/lib/date';
import { Card, Section } from '@/shared/ui';

import ReviewAnimatedCard from './ReviewAnimatedCard';
import { fetchRecentReview } from '../api/fetchRecentReview';
import type { RecentReview } from '../model/review';

export default async function RecentReviewView() {
  const recentReviews = await fetchRecentReview();

  return (
    <Section>
      <Section.Header
        title={
          <>
            <span className='font-tossFace'>✨</span> 최근 리뷰
          </>
        }
        subtitle="최근에 작성된 리뷰들이에요!"
      />
      <div className='flex flex-col gap-2'>
        {recentReviews.map((review, index) => (
          <ReviewCard
            key={review.reviewId}
            review={review}
            index={index}
            foodCourt={review.restaurantType}
            foodCourtId={FOOD_COURT_ID[review.restaurantType]}
          />
        ))}
      </div>
    </Section>
  );
}

function ReviewCard({
  review,
  index,
  foodCourt,
  foodCourtId,
}: {
  review: RecentReview;
  index: number;
  foodCourt: FoodCourt;
  foodCourtId: string;
}) {
  const relativeDate = getRelativeDate(new Date(review.createdAt));
  return (
    <ReviewAnimatedCard index={index}>
      <Card
        href={`/review/${foodCourtId}/${review.foodId}`}
        className='min-h-30 max-h-34'
      >
        <div className='flex items-center justify-between'>
          <span className='font-tossFace'>{'⭐️'.repeat(review.rating)}</span>
          <p className='flex items-center gap-1 text-sm'>{relativeDate}</p>
        </div>
        <p className='flex items-center gap-1.5 text-sm font-semibold'>
          <span className='rounded-full border px-1.5 py-0.5 text-xs font-medium'>
            {FOOD_COURT_NAME[foodCourt]}
          </span>

          <CampusMenuName foodCourt={foodCourt} menuId={review.foodId} />
        </p>

        <p className='line-clamp-2 text-sm'>{review.content}</p>
      </Card>
    </ReviewAnimatedCard>
  );
}
