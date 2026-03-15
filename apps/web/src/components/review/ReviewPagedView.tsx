import ReviewInfiniteList from './ReviewInfiniteList';

import { type FoodCourt } from '@/api/config';
import { getReviewsAction } from '@/api/review/getReviewsAction';

interface ReviewPagedViewProps {
  type: FoodCourt;
  foodId: number;
}

export default async function ReviewPagedView({
  type,
  foodId,
}: ReviewPagedViewProps) {
  const initialData = await getReviewsAction(type, foodId, 0);

  if (initialData.content.length === 0) {
    return (
      <div className='mt-10 text-center font-medium text-gray-500'>
        아직 작성된 리뷰가 없어요.
      </div>
    );
  }

  return (
    <ReviewInfiniteList type={type} foodId={foodId} initialData={initialData} />
  );
}
