import { fetchReviewFavCount } from '@/entities/review/api/fetchReviewFavCount';
import type { Review } from '@/entities/review/model/review';

import { type FoodCourt } from '@/shared/config';
import { AuthService } from '@/shared/lib/auth';

import ReviewFavButton from './ReviewFavButton';
import ReviewDelButton from './ReviewDelButton';

interface ReviewItemProps extends Review {
  type: FoodCourt;
  foodId: number;
  isLiked: boolean;
}

export default async function ReviewItem({
  type,
  foodId,
  rating,
  content,
  memberName,
  createdAt,
  id,
  isLiked,
}: ReviewItemProps) {
  const [likedCount, isAuthenticated, userInfo] = await Promise.all([
    fetchReviewFavCount(type, id),
    AuthService.isAuthenticated(),
    AuthService.getUserInfo(),
  ]);
  const maskedMemberName =
    memberName.length === 1 ? '*' : memberName.charAt(0) + '**';

  const isMyReview = userInfo?.name === memberName;

  return (
    <div className='flex h-32 w-full rounded-2xl bg-gray-100/50 p-4'>
      <div className='flex h-full w-40 shrink-0 flex-col items-start gap-0.5'>
        <div className='flex flex-1 flex-col gap-0.5'>
          <p className='font-semibold'>{maskedMemberName}</p>
          <p className='text-sm text-gray-600'>{createdAt}</p>
        </div>
        <div className='flex gap-1'>
          <ReviewFavButton
            type={type}
            reviewId={id}
            initialIsLiked={isLiked}
            likedCount={likedCount}
            isDisabled={!isAuthenticated}
          />
          {isMyReview && isAuthenticated && (
            <ReviewDelButton type={type} foodId={foodId} reviewId={id} />
          )}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <span className='font-tossFace'>{'⭐️'.repeat(rating)}</span>
        <p className='scrollbar-hide h-full overflow-y-auto text-sm leading-relaxed text-gray-600'>
          {content}
        </p>
      </div>
    </div>
  );
}
