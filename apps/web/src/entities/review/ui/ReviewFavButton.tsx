'use client';

import { useOptimistic, useTransition } from 'react';

import { type FoodCourt } from '@/shared/config';
import { Button } from '@/shared/ui';

import { removeReviewFav } from '../api/removeReviewFav';
import { submitReviewFav } from '../api/submitReviewFav';

interface ReviewLikeButtonProps {
  type: FoodCourt;
  reviewId: number;
  initialIsLiked: boolean;
  likedCount: number;
  isDisabled: boolean;
}

export default function ReviewLikeButton({
  type,
  reviewId,
  initialIsLiked,
  likedCount,
}: ReviewLikeButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(initialIsLiked);
  const [optimisticLikedCount, setOptimisticLikedCount] = useOptimistic(likedCount);

  const handleLikeToggle = async () => {
    startTransition(async () => {
      setOptimisticLiked(!optimisticLiked);
      setOptimisticLikedCount(optimisticLiked ? likedCount - 1 : likedCount + 1);
      if (optimisticLiked) {
        await removeReviewFav(reviewId, type);
      } else {
        await submitReviewFav(reviewId, type);
      }
    });
  };

  return (
    <div className='flex gap-1'>
      <Button
        variant={optimisticLiked ? 'default' : 'outline'}
        size='sm'
        onClick={handleLikeToggle}
      >
        <span className='font-tossFace'>👍</span>
        <span>{optimisticLikedCount}</span>
      </Button>
    </div>
  );
}
