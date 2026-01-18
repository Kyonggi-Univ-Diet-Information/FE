'use client';

import type { Review } from '@/entities/review/model/review';

import { type FoodCourt } from '@/shared/config';
import { getRelativeDate } from '@/shared/lib/date';
import { Avatar, AvatarFallback } from '@/shared/ui';

import ReviewActionMenu from './ReviewActionMenu';
import ReviewFavButton from './ReviewFavButton';

interface ReviewItemProps extends Review {
  type: FoodCourt;
  foodId: number;
  isLiked: boolean;
  likedCount: number;
  isAuthenticated: boolean;
  isMyReview: boolean;
  onLikeUpdate?: (reviewId: number, isLiked: boolean, count: number) => void;
}

export default function ReviewItem({
  type,
  foodId,
  rating,
  content,
  memberName,
  createdAt,
  id,
  isLiked,
  likedCount,
  isAuthenticated,
  isMyReview,
  onLikeUpdate,
}: ReviewItemProps) {
  const maskedMemberName =
    memberName.length === 1 ? '*' : memberName.charAt(0) + '**';

  const relativeDate = getRelativeDate(new Date(createdAt));

  return (
    <div className='flex flex-col gap-2 w-full py-3 border-b border-gray-100 last:border-0'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-9 border border-gray-100 bg-white'>
            <AvatarFallback className='text-xs font-bold text-gray-400'>
              {memberName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <p className='text-sm font-bold text-gray-900'>{maskedMemberName}</p>
            <p className='text-[11px] font-medium text-gray-400'>{relativeDate}</p>
          </div>
        </div>
        
        <ReviewActionMenu 
          type={type} 
          foodId={foodId} 
          reviewId={id} 
          isMyReview={isMyReview} 
        />
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-0.5 text-xs font-tossFace'>
          {'⭐️'.repeat(rating)}
        </div>
        <p className='text-sm leading-relaxed text-gray-700 whitespace-pre-wrap break-words'>
          {content}
        </p>
      </div>

      <div className='flex items-center gap-4 mt-1'>
        <ReviewFavButton
          type={type}
          reviewId={id}
          initialIsLiked={isLiked}
          likedCount={likedCount}
          isDisabled={!isAuthenticated}
          onLikeUpdate={(nextLiked, nextCount) =>
            onLikeUpdate?.(id, nextLiked, nextCount)
          }
        />
      </div>
    </div>
  );
}
