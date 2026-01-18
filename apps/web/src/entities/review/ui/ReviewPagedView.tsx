import { type FoodCourt } from '@/shared/config';

import ReviewInfiniteList from './ReviewInfiniteList';
import { getReviewsAction } from '../api/getReviewsAction';

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
      <div className='mt-10 text-center text-gray-500 font-medium'>
        아직 작성된 리뷰가 없어요.
      </div>
    );
  }

  return (
    <ReviewInfiniteList
      type={type}
      foodId={foodId}
      initialData={initialData}
    />
  );
}
