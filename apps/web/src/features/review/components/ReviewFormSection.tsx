'use client';

import { memo, useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

import type { ReviewPost } from '@/types';
import { Button } from '@/components/common/Button';

import ReviewStarSelector from './ReviewStarSelector';

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

export default function ReviewFormSection() {
  const [selectedStars, setSelectedStars] = useState(3);
  const { register, handleSubmit, watch } = useForm<ReviewPost>({});
  const isFormValid = watch('content')?.length > 0;

  const onSubmit = (data: ReviewPost) => {
    console.log(data);
  };

  return (
    <form
      className='flex w-full flex-col gap-2 rounded-2xl border p-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <ReviewStarSelector
        selectedStars={selectedStars}
        setSelectedStars={setSelectedStars}
      />
      <ReviewTextArea register={register('content')} />
      <Button
        variant='outline'
        size='sm'
        className='w-fit self-end'
        disabled={!isFormValid}
      >
        등록하기
      </Button>
    </form>
  );
}
