'use client';

import { Button } from '@/components/common';
import { useOptimistic, useTransition } from 'react';
import { submitReviewLike } from '../services/submitReviewLike';
import { removeReviewLike } from '../services/removeReviewLike';
import type { MenuType } from '../services/reviewService';

interface ReviewReactButtonProps {
  reviewId: number;
  menuType: MenuType;
  initialIsLiked: boolean;
  likedCount: number;
}

export default function ReviewReactButton({
  reviewId,
  menuType,
  initialIsLiked,
  likedCount,
}: ReviewReactButtonProps) {
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
        disabled={isPending}
      >
        <span className='font-tossFace'>👍</span>
        <span>{likedCount}</span>
      </Button>
    </div>
  );
}
