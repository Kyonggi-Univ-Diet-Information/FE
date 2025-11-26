import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
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
import { Link } from '@/shared/i18n/routing';
import { AuthService } from '@/shared/lib/auth';
import { Loader, Modal, Button, Title } from '@/shared/ui';

export interface ReviewPageProps {
  params: Promise<{ foodCourtId: string; foodId: string }>;
  searchParams: Promise<{
    reviewMode?: string;
    pageNo?: number;
  }>;
}

export default async function ReviewPage({
  params,
  searchParams,
}: ReviewPageProps) {
  const [
    { foodCourtId, foodId: foodIdParam },
    { reviewMode, pageNo },
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

  const t = await getTranslations('reviewPage');
  const isReviewMode = reviewMode === 'true';

  return (
    <div className='flex flex-col gap-4'>
      <section className='flex items-start justify-between'>
        <div className='flex flex-col gap-1'>
          <Title>
            <CampusMenuName
              foodCourt={foodCourt}
              menuId={foodId}
              className='text-point'
            />
            {t('reviewPromptTitle')}
          </Title>
          <p className='text-sm text-gray-600'>{t('reviewPrompt')}</p>
        </div>
        <Link href={`/review/${foodCourtId}/${foodId}?reviewMode=true`}>
          <Button variant='secondary' size='sm'>
            {t('writeReview')}
          </Button>
        </Link>
      </section>

      <CampusMenuImage
        foodCourt={foodCourt}
        menuId={foodId}
        className='aspect-square h-[180px] w-full border border-gray-200'
      />
      <p className='flex items-center justify-between px-4'>
        <span className='text-gray-500'>가격</span>
        <CampusMenuPrice foodCourt={foodCourt} menuId={foodId} />
      </p>

      {foodCourt === FOOD_COURT.KYONGSUL && (
        <CampusMenuSet type={foodCourt} baseFoodId={foodId} />
      )}

      <Suspense fallback={<Loader />}>
        {isAuthenticated && isReviewMode && (
          <ReviewFormSection foodCourt={foodCourt} foodId={foodId} />
        )}
        {!isAuthenticated && isReviewMode && (
          <LoginModal foodCourtId={foodCourtId} foodId={foodId} />
        )}
        <ReviewRating type={foodCourt} foodId={foodId} />
        <ReviewPagedView
          type={foodCourt}
          foodId={foodId}
          pageNo={pageNo || 0}
        />
      </Suspense>
    </div>
  );
}

async function LoginModal({
  foodCourtId,
  foodId,
}: {
  foodCourtId: string;
  foodId: number;
}) {
  const t = await getTranslations('reviewPage');
  const currentPath = `/review/${foodCourtId}/${foodId}`;

  return (
    <Modal href={`/review/${foodCourtId}/${foodId}`}>
      <Modal.Header title={t('loginRequiredTitle')} />
      <p>{t('loginRequiredDescription')}</p>
      <Link
        href={{
          pathname: '/auth/login',
          query: { returnUrl: currentPath },
        }}
        className='self-end'
      >
        <Button variant='secondary' size='lg' className='w-fit'>
          {t('loginButton')}
        </Button>
      </Link>
    </Modal>
  );
}
