import { Button } from '@/components/common/Button';
import React from 'react';

export default function ReviewPAge() {
  return (
    <div className='scrollbar-hide absolute inset-0 flex flex-col gap-8 overflow-y-scroll p-4 pb-20 pt-6'>
      <div className='flex flex-col gap-4'>
        <p className='text-xl font-bold'>
          <span className='underline'>오늘</span>의 점심, 어땠나요?
        </p>
        <div className='flex flex-wrap gap-2'>
          <Button variant='outline' size='sm' className='w-fit'>
            흑마늘구이
          </Button>
          <Button variant='outline' size='sm' className='w-fit'>
            크림브륄레
          </Button>
          <Button variant='outline' size='sm' className='w-fit'>
            고등어자반
          </Button>
          <Button variant='outline' size='sm' className='w-fit'>
            쌀밥
          </Button>
          <Button variant='outline' size='sm' className='w-fit'>
            요구르트
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='font-bold'>
          <span className='text-point text-lg'>고등어자반 </span>
          <span className='font-semibold'>리뷰</span>
        </p>
        <div className='flex items-center'>
          <div className='flex h-full w-40 flex-col items-start gap-1'>
            <span className='text-3xl font-black'>4.8</span>
            <span className='font-tossFace'>⭐️⭐️⭐️⭐️⭐️</span>
            <span className='text-sm text-gray-600'>리뷰 28개</span>
          </div>
          <div className='flex-1 space-y-2'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <span className='w-6 text-xs font-medium'>5</span>
                <div className='h-3 flex-1 rounded-full bg-gray-200'>
                  <div
                    className='bg-point/30 h-3 rounded-full'
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <span className='w-6 text-xs font-medium'>4</span>
                <div className='h-3 flex-1 rounded-full bg-gray-100'>
                  <div
                    className='bg-point/30 h-3 rounded-full'
                    style={{ width: '25%' }}
                  ></div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <span className='w-6 text-xs font-medium'>3</span>
                <div className='h-3 flex-1 rounded-full bg-gray-200'>
                  <div
                    className='bg-point/30 h-3 rounded-full'
                    style={{ width: '10%' }}
                  ></div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <span className='w-6 text-xs font-medium'>2</span>
                <div className='h-3 flex-1 rounded-full bg-gray-200'>
                  <div
                    className='bg-point/30 h-3 rounded-full'
                    style={{ width: '5%' }}
                  ></div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <span className='w-6 text-xs font-medium'>1</span>
                <div className='h-3 flex-1 rounded-full bg-gray-200'>
                  <div
                    className='bg-point/30 h-3 rounded-full'
                    style={{ width: '3%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='space-y-2'>
        <div className='flex w-full rounded-2xl bg-gray-100/50 p-4'>
          <div className='flex h-full w-40 shrink-0 flex-col items-start gap-0.5'>
            <p className='font-semibold'>김건국</p>
            <p className='text-sm text-gray-600'>2025-09-25</p>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-tossFace'>⭐️⭐️⭐️⭐️⭐️</span>
            <p className='text-sm text-gray-600'>
              고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!! 고등어자반은
              맛있어요. 근데 다른게 좀 아쉬워요!!!!! 고등어자반은 맛있어요. 근데
              다른게 좀 아쉬워요!!!!!
            </p>
          </div>
        </div>
        <div className='flex w-full rounded-2xl bg-gray-100/50 p-4'>
          <div className='flex h-full w-40 shrink-0 flex-col items-start gap-0.5'>
            <p className='font-semibold'>김건국</p>
            <p className='text-sm text-gray-600'>2025-09-25</p>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='font-tossFace'>⭐️⭐️⭐️⭐️⭐️</span>
            <p className='text-sm text-gray-600'>
              고등어자반은 맛있어요. 근데 다른게 좀 아쉬워요!!!!! 고등어자반은
              맛있어요. 근데 다른게 좀 아쉬워요!!!!! 고등어자반은 맛있어요. 근데
              다른게 좀 아쉬워요!!!!!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
