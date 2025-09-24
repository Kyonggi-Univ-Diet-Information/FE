import { useMemo, useEffect } from 'react';
import { MdOutlineMenuBook } from 'react-icons/md';
import { useParams, useLoaderData } from 'react-router-dom';
import { Loading } from '~/assets';
import {
  useFetchBatchFavCounts,
  useReviewPagination,
} from '~/feature/home/review/api';
import { ReviewInput, ReviewItem } from '~/feature/home/review/ui';
import { useMenuStore } from '~/shared/store';
import { WeeklyMenu } from '~/widgets/home/types';

export default function ReviewPage() {
  const { menuId } = useParams();
  const loaderData = useLoaderData() as { result: WeeklyMenu };
  const { weeklyMenu, setWeeklyMenu } = useMenuStore();

  useEffect(() => {
    if (loaderData?.result && !weeklyMenu) {
      setWeeklyMenu(loaderData.result);
    }
  }, [loaderData, weeklyMenu, setWeeklyMenu]);

  const menuName = useMemo(() => {
    const menuData = weeklyMenu || loaderData?.result;
    if (!menuData || !menuId) return null;

    for (const day in menuData) {
      const dailyMenu = menuData[day as keyof typeof menuData];
      for (const time in dailyMenu) {
        const meal = dailyMenu[time as keyof typeof dailyMenu];
        for (const menuItem of meal.contents) {
          if (menuItem.dietFoodDTO.id === Number(menuId)) {
            return menuItem.dietFoodDTO.name;
          }
        }
      }
    }
    return null;
  }, [weeklyMenu, loaderData, menuId]);

  const {
    reviews,
    pagination,
    isLoading,
    isError,
    goToPage,
    goToNextPage,
    goToPrevPage,
  } = useReviewPagination(Number(menuId));

  // 리뷰 ID들을 추출
  const reviewIds = useMemo(() => {
    return (
      reviews
        ?.map(review => review.id)
        .filter((id): id is number => id !== undefined) || []
    );
  }, [reviews]);

  // 배치로 좋아요 수 가져오기
  const { data: favCounts } = useFetchBatchFavCounts(reviewIds);

  // 리뷰에 좋아요 수 추가
  const reviewsWithFavCounts = useMemo(() => {
    if (!reviews || !favCounts) return reviews;
    return reviews.map(review => ({
      ...review,
      favCount: review.id ? favCounts[review.id] || 0 : 0,
    }));
  }, [reviews, favCounts]);
  const renderReviewContent = () => {
    console.log('renderReviewContent:', {
      menuId,
      menuName,
      reviews,
      isLoading,
      isError,
    });

    if (!menuId)
      return (
        <div className='flex h-full w-full flex-col items-center justify-center leading-loose'>
          <MdOutlineMenuBook size={35} />
          메뉴를 선택하고 리뷰를 확인하세요!
        </div>
      );

    return (
      <>
        <p className='mb-4 text-xl'>
          <b>{menuName || `메뉴 ${menuId}`}</b>, 어떨까?
        </p>
        <ReviewInput menuId={Number(menuId)} />
        {isLoading ? (
          <LoadingStatus />
        ) : isError ? (
          <FetchFailed />
        ) : !reviewsWithFavCounts || reviewsWithFavCounts.length === 0 ? (
          <NoReview />
        ) : (
          <>
            <div className='mt-2 flex max-h-[calc(100vh-380px)] flex-1 flex-col gap-y-2 overflow-y-auto'>
              {[...reviewsWithFavCounts].reverse().map(review => (
                <ReviewItem key={review.id} {...review} />
              ))}
            </div>
            {pagination.totalPages > 1 && (
              <PaginationControls
                pagination={pagination}
                goToPage={goToPage}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
              />
            )}
          </>
        )}
      </>
    );
  };
  return (
    <div className='flex h-screen w-full flex-col overflow-hidden'>
      <div className='flex h-full w-full flex-col p-4'>
        {renderReviewContent()}
      </div>
    </div>
  );
}

const NoReview = () => (
  <div className='mt-8 grid h-full place-items-center overflow-auto'>
    리뷰가 없습니다. 첫 리뷰를 남겨주세요!
  </div>
);

const LoadingStatus = () => (
  <div className='mt-8 grid h-full place-items-center overflow-auto'>
    <img src={Loading} alt='로딩 중' />
  </div>
);

const FetchFailed = () => (
  <div className='mt-8 grid h-full place-items-center overflow-auto'>
    리뷰를 가져오지 못했습니다.
  </div>
);

interface PaginationControlsProps {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
    size: number;
  };
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

const PaginationControls = ({
  pagination,
  goToPage,
  goToNextPage,
  goToPrevPage,
}: PaginationControlsProps) => {
  const { currentPage, totalPages, totalElements, isFirst, isLast } =
    pagination;

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(0, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className='mt-4 flex flex-col items-center gap-2 border-t border-gray-200 pt-4'>
      <div className='text-sm text-gray-600'>
        총 {totalElements}개의 리뷰 중 {currentPage + 1}페이지
      </div>
      <div className='flex items-center gap-1'>
        <button
          onClick={goToPrevPage}
          disabled={isFirst}
          className={`rounded px-3 py-1 text-sm ${
            isFirst
              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : 'cursor-pointer border border-gray-200 bg-white hover:bg-gray-50'
          }`}
        >
          이전
        </button>

        {getPageNumbers().map(pageNum => (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`rounded px-3 py-1 text-sm ${
              pageNum === currentPage
                ? 'bg-primary text-white'
                : 'cursor-pointer border border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            {pageNum + 1}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={isLast}
          className={`rounded px-3 py-1 text-sm ${
            isLast
              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : 'cursor-pointer border border-gray-200 bg-white hover:bg-gray-50'
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};
