'use client';

import { memo, useActionState, useEffect, useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

import type { ReviewPost } from '@/entities/campus-review/model/review';
import { Button } from '@/shared/ui/Button';

import ReviewStarSelector from './ReviewStarSelector';
import { submitMenuReview } from '../services/submitMenuReview';

interface ReviewTextAreaProps {
  register: UseFormRegisterReturn<'content'>;
}

const ReviewTextArea = memo(({ register }: ReviewTextAreaProps) => {
  return (
    <textarea
      className='h-8 w-full resize-none outline-none'
      placeholder='리뷰를 입력해주세요.'
      {...register}
    />
  );
});

interface ReviewFormSectionProps {
  foodId: number;
}

export default function ReviewFormSection({ foodId }: ReviewFormSectionProps) {
  const { register, watch, reset } = useForm<ReviewPost>();

  const [selectedStars, setSelectedStars] = useState(3);
  const [state, formAction, isPending] = useActionState(submitMenuReview, null);

  const isFormValid = watch('content')?.length > 0;

  useEffect(() => {
    if (state?.error) {
      alert(state.error);
    } else if (state?.success) {
      reset();
      setSelectedStars(3);
    }
  }, [state, reset]);

  return (
    <form
      className='flex w-full flex-col gap-2 rounded-2xl border p-4'
      action={formAction}
    >
      <input type='hidden' name='foodId' value={foodId} readOnly />
      <input type='hidden' name='menuType' value='campus' readOnly />
      <input type='hidden' name='rating' value={selectedStars} readOnly />
      <ReviewStarSelector
        selectedStars={selectedStars}
        setSelectedStars={setSelectedStars}
      />
      <ReviewTextArea register={register('content')} />
      <Button
        variant='outline'
        size='sm'
        className='w-fit self-end'
        disabled={!isFormValid || isPending}
      >
        등록하기
      </Button>
    </form>
  );
}

ReviewTextArea.displayName = 'ReviewTextArea';
