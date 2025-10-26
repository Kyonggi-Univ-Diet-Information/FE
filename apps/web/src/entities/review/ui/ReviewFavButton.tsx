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
  isDisabled,
}: ReviewLikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(initialIsLiked);

  const handleLikeToggle = async () => {
    startTransition(async () => {
      setOptimisticLiked(!optimisticLiked);

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
        disabled={isPending || isDisabled}
      >
        <span className='font-tossFace'>👍</span>
        <span>{likedCount}</span>
      </Button>
    </div>
  );
}
