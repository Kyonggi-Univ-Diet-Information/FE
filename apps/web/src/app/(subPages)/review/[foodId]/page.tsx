import { notFound } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/common/Button';
import { Title } from '@/components/layout';

import {
  ReviewFormSection,
  ReviewPagedView,
  ReviewRatingSection,
} from '@/features/review/components';
import { getReviewService, MenuType } from '@/features/review/services';
import { AuthService } from '@/lib/services';
import { Modal } from '@/components/common';
import { fetchCampusMenu, fetchDormMenu } from '@/features/menu/services';

export default async function ReviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ foodId: string }>;
  searchParams: Promise<{
    reviewMode?: string;
    pageNo?: number;
    menuType?: string;
  }>;
}) {
  const [
    { foodId: foodIdParam },
    { reviewMode, pageNo, menuType = 'campus' },
    isAuthenticated,
  ] = await Promise.all([params, searchParams, AuthService.isAuthenticated()]);

  const foodId = Number(foodIdParam);
  if (isNaN(foodId) || !Number.isInteger(foodId) || foodId <= 0) {
    notFound();
  }

  const reviewService = getReviewService(menuType as MenuType);

  const [rating, averageRating, allMenu] = await Promise.all([
    reviewService.fetchRatings(foodId),
    reviewService.fetchAverage(foodId),
    menuType === 'dorm' ? fetchDormMenu() : fetchCampusMenu(),
  ]);

  const isReviewMode = reviewMode === 'true';

  const menuName =
    menuType === 'dorm'
      ? Object.values(allMenu)
          .flatMap(day => Object.values(day))
          .flatMap((time: any) => time.contents)
          .find((menu: any) => menu.dietFoodDTO.id === foodId)?.dietFoodDTO.name
      : Object.values(allMenu)
          .flat()
          .find(menu => menu.id === foodId)?.name;

  const reviewCount = rating[1] + rating[2] + rating[3] + rating[4] + rating[5];

  function LoginModal() {
    return (
      <Modal href={`/review/${foodId}`}>
        <Modal.Header title='로그인이 필요해요!' />
        <p>로그인 후 리뷰를 작성할 수 있어요.</p>
        <Link href='/auth/login' className='self-end'>
          <Button variant='secondary' size='lg' className='w-fit'>
            로그인 하러가기
          </Button>
        </Link>
      </Modal>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <section className='flex items-start justify-between'>
          <div className='flex flex-col gap-1'>
            <Title>
              <span className='text-point'>{menuName}</span>, 어땠나요?
            </Title>
            <p className='text-sm text-gray-600'>리뷰를 작성해주세요!</p>
          </div>
          <Link href={`/review/${foodId}?reviewMode=true&menuType=${menuType}`}>
            <Button variant='secondary' size='sm'>
              리뷰 작성하기
            </Button>
          </Link>
        </section>
        {isAuthenticated && isReviewMode && (
          <ReviewFormSection foodId={foodId} menuType={menuType as MenuType} />
        )}
        {!isAuthenticated && isReviewMode && <LoginModal />}
        <ReviewRatingSection
          rating={rating}
          reviewCount={reviewCount}
          averageRating={averageRating}
        />
        <ReviewPagedView
          foodId={foodId}
          pageNo={pageNo || 0}
          menuType={menuType as MenuType}
        />
      </div>
    </>
  );
}
