'use client';

import { Button } from '@/shared/ui';
import { useOptimistic, useTransition } from 'react';
import { submitReviewLike } from '@/features/review/services/submitReviewLike';
import { removeReviewLike } from '@/features/review/services/removeReviewLike';

interface ReviewLikeButtonProps {
  reviewId: number;
  menuType: 'campus' | 'dorm';
  initialIsLiked: boolean;
  likedCount: number;
  isDisabled: boolean;
}

export default function ReviewLikeButton({
  reviewId,
  menuType,
  initialIsLiked,
  likedCount,
  isDisabled,
}: ReviewLikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(initialIsLiked);

  const handleLikeToggle = async () => {
    startTransition(async () => {
      setOptimisticLiked(!optimisticLiked);

      if (optimisticLiked) {
        await removeReviewLike(reviewId, menuType);
      } else {
        await submitReviewLike(reviewId, menuType);
      }
    });
  };

  return (
    <div className='flex gap-1'>
      <Button
        variant={optimisticLiked ? 'default' : 'outline'}
        size='sm'
        onClick={handleLikeToggle}
        disabled={isPending || isDisabled}
      >
        <span className='font-tossFace'>👍</span>
        <span>{likedCount}</span>
      </Button>
    </div>
  );
}
