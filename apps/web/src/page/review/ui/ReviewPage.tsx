import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import {
  CampusMenuName,
  CampusMenuPrice,
  CampusMenuSet,
} from '@/entities/campus-menu';
import CampusMenuImage from '@/entities/campus-menu/ui/CampusMenuImage';
import {
  ReviewFormSection,
  ReviewPagedView,
  ReviewRating,
} from '@/entities/review';

import { FOOD_COURT, getFoodCourtById } from '@/shared/config';
import { AuthService } from '@/shared/lib/auth';
import {
  Loader,
  Modal,
  Button,
  AnimatedCard,
  Section,
} from '@/shared/ui';

export interface ReviewPageProps {
  params: Promise<{ foodCourtId: string; foodId: string }>;
  searchParams: Promise<{
    reviewMode?: string;
  }>;
}

export default async function ReviewPage({
  params,
  searchParams,
}: ReviewPageProps) {
  const [
    { foodCourtId, foodId: foodIdParam },
    { reviewMode },
    isAuthenticated,
  ] = await Promise.all([params, searchParams, AuthService.isAuthenticated()]);

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    notFound();
  }

  const foodId = Number(foodIdParam);
  if (isNaN(foodId) || !Number.isInteger(foodId) || foodId <= 0) {
    notFound();
  }

  const isReviewMode = reviewMode === 'true';

  return (
    <div className='flex flex-col gap-8 pb-10'>
      <AnimatedCard index={0} className='px-1'>
        <div className='flex flex-col gap-4'>
          <div className='space-y-1.5'>
            <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Menu Review</p>
            <CampusMenuName
              foodCourt={foodCourt}
              menuId={foodId}
              className='font-bold text-gray-900 text-xl leading-tight block'
            />
          </div>

          <div className='flex items-start gap-6'>
            <div className='relative size-20 shrink-0 overflow-hidden rounded-2xl bg-gray-50/50'>
              <CampusMenuImage
                foodCourt={foodCourt}
                menuId={foodId}
                className='h-full w-full object-cover'
              />
            </div>

            <div className='flex flex-1 flex-col justify-center min-w-0'>
              <div className='space-y-1'>
                <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Price</p>
                <div className='text-xl font-black text-point leading-none whitespace-nowrap'>
                  <CampusMenuPrice foodCourt={foodCourt} menuId={foodId} />
                </div>
              </div>
            </div>
          </div>

          <Suspense fallback={<div className='h-12 w-full animate-pulse bg-gray-50 rounded-xl' />}>
            <ReviewRating type={foodCourt} foodId={foodId} />
          </Suspense>

          {foodCourt === FOOD_COURT.KYONGSUL && (
            <CampusMenuSet type={foodCourt} baseFoodId={foodId} />
          )}
        </div>
      </AnimatedCard>

      <Suspense fallback={<Loader />}>
        {isAuthenticated && isReviewMode && (
          <AnimatedCard index={1}>
            <Section className='bg-white'>
              <ReviewFormSection foodCourt={foodCourt} foodId={foodId} />
            </Section>
          </AnimatedCard>
        )}
        {!isAuthenticated && isReviewMode && (
          <LoginModal foodCourtId={foodCourtId} foodId={foodId} />
        )}

        <AnimatedCard index={2}>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between px-1'>
                <h3 className='font-brBold text-lg text-gray-900'>리뷰 목록</h3>
              </div>
              <ReviewPagedView
                type={foodCourt}
                foodId={foodId}
              />
            </div>
          </div>
        </AnimatedCard>
      </Suspense>

      {!isReviewMode && (
        <div className='fixed bottom-12 left-1/2 z-50 -translate-x-1/2 w-full max-w-md px-6'>
          <Link
            href={`/review/${foodCourtId}/${foodId}?reviewMode=true`}
            className='flex justify-center'
          >
            <Button
              variant='primary'
              className='flex h-12 items-center gap-2 rounded-full px-6! shadow-lg shadow-orange-200 active:scale-95 transition-all'
            >
              <PencilIcon size={18} />
              <span className='font-semibold text-base'>리뷰 작성하기</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}


function LoginModal({
  foodCourtId,
  foodId,
}: {
  foodCourtId: string;
  foodId: number;
}) {
  const currentPath = `/review/${foodCourtId}/${foodId}`;

  return (
    <Modal href={`/review/${foodCourtId}/${foodId}`}>
      <Modal.Header title="로그인이 필요해요!" />
      <p>로그인 후 리뷰를 작성할 수 있어요.</p>
      <Link
        href={{
          pathname: '/auth/login',
          query: { returnUrl: currentPath },
        }}
        className='self-end'
      >
        <Button variant='secondary' size='lg' className='w-fit'>
          로그인 하러가기
        </Button>
      </Link>
    </Modal>
  );
}
