import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { ReviewFormSection } from '@/features/review';

import { CampusMenuName } from '@/entities/campus-menu';
import { ReviewPagedView, ReviewRating } from '@/entities/review';

import { FOOD_COURT } from '@/shared/config';
import { Link } from '@/shared/i18n/routing';
import { AuthService } from '@/shared/lib/auth';
import { Loader, Modal } from '@/shared/ui';
import { Button, Title } from '@/shared/ui';

export interface CampusReviewPageProps {
  params: Promise<{ foodId: string }>;
  searchParams: Promise<{
    reviewMode?: string;
    pageNo?: number;
  }>;
}

export default async function CampusReviewPage({
  params,
  searchParams,
}: CampusReviewPageProps) {
  const [{ foodId: foodIdParam }, { reviewMode, pageNo }, isAuthenticated] =
    await Promise.all([params, searchParams, AuthService.isAuthenticated()]);

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
            <CampusMenuName menuId={foodId} className='text-point' />
            {t('reviewPromptTitle')}
          </Title>
          <p className='text-sm text-gray-600'>{t('reviewPrompt')}</p>
        </div>
        <Link href={`/review/${foodId}?reviewMode=true`}>
          <Button variant='secondary' size='sm'>
            {t('writeReview')}
          </Button>
        </Link>
      </section>

      <Suspense fallback={<Loader />}>
        {isAuthenticated && isReviewMode && (
          <ReviewFormSection foodId={foodId} />
        )}
        {!isAuthenticated && isReviewMode && <LoginModal foodId={foodId} />}
        <ReviewRating type={FOOD_COURT.KYONGSUL} foodId={foodId} />
        <ReviewPagedView
          type={FOOD_COURT.KYONGSUL}
          foodId={foodId}
          pageNo={pageNo || 0}
        />
      </Suspense>
    </div>
  );
}

async function LoginModal({ foodId }: { foodId: number }) {
  const t = await getTranslations('reviewPage');
  const currentPath = `/review/${foodId}`;

  return (
    <Modal href={`/review/${foodId}`}>
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
