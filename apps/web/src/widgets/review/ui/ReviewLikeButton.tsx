'use client';

import { Button } from '@/shared/ui';
import { useOptimistic, useTransition } from 'react';

import { removeCampusReviewLike } from '@/entities/campus-review/api/removeCampusReviewLike';
import { submitCampusReviewLike } from '@/entities/campus-review/api/submitCampusReviewLike';

interface ReviewLikeButtonProps {
  reviewId: number;
  initialIsLiked: boolean;
  likedCount: number;
  isDisabled: boolean;
}

export default function ReviewLikeButton({
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
        await removeCampusReviewLike(reviewId);
      } else {
        await submitCampusReviewLike(reviewId);
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
