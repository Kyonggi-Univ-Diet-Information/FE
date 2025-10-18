import { fetchCampusReviewLikeCount } from '@/entities/campus-review/api/fetchCampusReviewLikeCount';
import { AuthService } from '@/shared/lib/auth';
import ReviewLikeButton from './ReviewLikeButton';
import type { Review } from '@/entities/campus-review/model/review';

interface ReviewItemProps extends Review {
  menuType: 'campus' | 'dorm';
  isLiked: boolean;
}

export default async function ReviewItem({
  rating,
  content,
  memberName,
  createdAt,
  id,
  menuType,
  isLiked,
}: ReviewItemProps) {
  const [likedCount, isAuthenticated] = await Promise.all([
    fetchCampusReviewLikeCount(id),
    AuthService.isAuthenticated(),
  ]);
  const maskedMemberName =
    memberName.length === 1 ? '*' : memberName.charAt(0) + '**';

  return (
    <div className='flex h-32 w-full rounded-2xl bg-gray-100/50 p-4'>
      <div className='flex h-full w-40 shrink-0 flex-col items-start gap-0.5'>
        <div className='flex flex-1 flex-col gap-0.5'>
          <p className='font-semibold'>{maskedMemberName}</p>
          <p className='text-sm text-gray-600'>{createdAt}</p>
        </div>
        <ReviewLikeButton
          reviewId={id}
          menuType={menuType}
          initialIsLiked={isLiked}
          likedCount={likedCount}
          isDisabled={!isAuthenticated}
        />
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
