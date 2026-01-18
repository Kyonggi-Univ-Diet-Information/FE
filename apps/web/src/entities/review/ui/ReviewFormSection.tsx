'use client';

import { SendIcon } from 'lucide-react';
import { memo, useActionState, useEffect, useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { useSWRConfig } from 'swr';

import type { ReviewPost } from '@/entities/review/model/review';

import { type FoodCourt } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/utils';

import ReviewStarSelector from './ReviewStarSelector';
import { submitReview } from '../api/submitReview';

interface ReviewTextAreaProps {
  register: UseFormRegisterReturn<'content'>;
  value: string;
}

const ReviewTextArea = memo(({ register, value }: ReviewTextAreaProps) => {
  return (
    <div className='relative flex flex-col gap-2'>
      <textarea
        className={cn(
          'min-h-[120px] w-full resize-none rounded-2xl bg-white p-4 text-[15px] leading-relaxed text-gray-900 outline-none transition-all focus:border-point/20 focus:border-1 placeholder:text-gray-300'
        )}
        placeholder='맛, 양, 서비스 등 솔직한 후기를 남겨주세요.'
        {...register}
      />
      <div className='absolute bottom-3 right-4 flex items-center gap-1'>
        <span className={cn(
          'text-[11px] font-bold',
          value?.length > 0 ? 'text-point' : 'text-gray-300'
        )}>
          {value?.length || 0}
        </span>
      </div>
    </div>
  );
});

interface ReviewFormSectionProps {
  foodCourt: FoodCourt;
  foodId: number;
}

export default function ReviewFormSection({
  foodCourt,
  foodId,
}: ReviewFormSectionProps) {
  const { mutate } = useSWRConfig();
  const { register, watch, reset } = useForm<ReviewPost>();
  const contentValue = watch('content') || '';

  const [selectedStars, setSelectedStars] = useState(3);
  const [state, formAction, isPending] = useActionState(submitReview, null);

  const isFormValid = contentValue.trim().length >= 2;

  useEffect(() => {
    if (state?.error) {
      alert(state.error);
    } else if (state?.success) {
      reset();
      setSelectedStars(3);
      mutate((key) => Array.isArray(key) && key[0] === 'reviews');
    }
  }, [state, reset, mutate]);

  return (
    <form
      className='flex w-full flex-col gap-4'
      action={formAction}
    >
      <input type='hidden' name='foodId' value={foodId} readOnly />
      <input type='hidden' name='foodCourt' value={foodCourt} readOnly />
      <input type='hidden' name='rating' value={selectedStars} readOnly />

      <div className='flex flex-col gap-4'>
        <div className='space-y-1 px-1'>
          <h3 className='font-brBold text-lg text-gray-900 leading-none'>이 메뉴는 어땠나요?</h3>
          <p className='text-xs font-medium text-gray-400'>별점을 선택하고 후기를 남겨주세요.</p>
        </div>

        <div className='flex justify-center py-2'>
          <ReviewStarSelector
            selectedStars={selectedStars}
            setSelectedStars={setSelectedStars}
          />
        </div>
      </div>

      <ReviewTextArea register={register('content')} value={contentValue} />

      <div className='flex items-center justify-between px-1'>
        <p className='text-[11px] font-medium text-gray-400'>
          {isFormValid ? '멋진 리뷰네요! 이제 등록해보세요.' : '최소 2글자 이상 작성해주세요.'}
        </p>
        <Button
          variant='primary'
          size='lg'
          className={cn(
            'h-11 gap-2 rounded-full px-6 transition-all active:scale-95 shadow-lg shadow-orange-100',
            !isFormValid && 'opacity-50 grayscale pointer-events-none'
          )}
          disabled={!isFormValid || isPending}
        >
          {isPending ? (
            <div className='size-4 animate-spin rounded-full border-2 border-white/30 border-t-white' />
          ) : (
            <>
              <span className='font-semibold text-sm'>등록하기</span>
              <SendIcon size={14} className='opacity-80' />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

ReviewTextArea.displayName = 'ReviewTextArea';
