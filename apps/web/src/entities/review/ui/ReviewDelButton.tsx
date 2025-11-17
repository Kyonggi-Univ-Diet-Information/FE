'use client';

import { useState } from 'react';

import { type FoodCourt } from '@/shared/config';
import { Button } from '@/shared/ui';

import { removeReview } from '../api/removeReview';

interface ReviewDelButtonProps {
  type: FoodCourt;
  foodId: number;
  reviewId: number;
  isDisabled?: boolean;
}

export default function ReviewDelButton({
  type,
  foodId,
  reviewId,
  isDisabled = false,
}: ReviewDelButtonProps) {
  const [pending, setPending] = useState(false);

  const handleDel = async () => {
    setPending(true);
    await removeReview(reviewId, foodId, type);
    setPending(false);
  };

  return (
    <div className='flex gap-1'>
      <Button
        className='border-destructive/80 text-destructive hover:bg-destructive/20 hover:text-destructive bg-destructive/10'
        size='sm'
        onClick={handleDel}
        disabled={pending || isDisabled}
      >
        <span className='font-tossFace'>삭제</span>
      </Button>
    </div>
  );
}
