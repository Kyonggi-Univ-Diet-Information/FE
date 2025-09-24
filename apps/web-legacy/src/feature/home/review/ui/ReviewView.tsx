import { MdOutlineMenuBook } from 'react-icons/md';

import { ReviewInput, ReviewItem } from '~/feature/home/review/ui';
import { useLanguageStore, useMenuStore } from '~/shared/store';
import { Loading } from '~/assets';
import { useReviewPagination, useFetchBatchFavCounts } from '../api';
import { useMemo, useEffect } from 'react';

export default function ReviewView() {
  const { selectedMenu, selectedMenuId } = useMenuStore();
  const { language } = useLanguageStore();

  const {
    reviews,
    pagination,
    isLoading,
    isError,
    goToPage,
    goToNextPage,
    goToPrevPage,
    resetPage,
  } = useReviewPagination(selectedMenuId || 0);

  useEffect(() => {
    resetPage();
  }, [selectedMenuId, resetPage]);

  const reviewIds = useMemo(() => {
    return (
      reviews
        ?.map(review => review.id)
        .filter((id): id is number => id !== undefined) || []
    );
  }, [reviews]);

  const { data: favCounts } = useFetchBatchFavCounts(reviewIds);

  const reviewsWithFavCounts = useMemo(() => {
    if (!reviews || !favCounts) return reviews;
    return reviews.map(review => ({
      ...review,
      favCount: review.id ? favCounts[review.id] || 0 : 0,
    }));
  }, [reviews, favCounts]);

  const renderReviewContent = () => {
    if (!selectedMenu)
      return (
        <div className='flex h-full w-full flex-col items-center justify-center leading-loose'>
          <MdOutlineMenuBook size={35} />
          {language === 'en'
            ? 'Select a menu and check reviews!'
            : '메뉴를 선택하고 리뷰를 확인하세요!'}
        </div>
      );

    return (
      <>
        <p className='mb-4 text-xl'>
          <b>{language === 'en' ? selectedMenu.nameEn : selectedMenu.name}</b>,{' '}
          {language === 'en' ? 'how is it?' : '어떨까?'}
        </p>
        <ReviewInput menuId={selectedMenuId || 0} />
        {isLoading ? (
          <LoadingStatus />
        ) : isError ? (
          <FetchFailed language={language} />
        ) : !reviewsWithFavCounts || reviewsWithFavCounts.length === 0 ? (
          <NoReview language={language} />
        ) : (
          <>
            <div className='scrollbar-hide flex-shrink: 0 mt-2 flex h-full flex-col gap-y-2 overflow-scroll'>
              {[...reviewsWithFavCounts].reverse().map(review => (
                <ReviewItem key={review.id} {...review} />
              ))}
            </div>
            {pagination.totalPages > 0 && (
              <PaginationControls
                pagination={pagination}
                goToPage={goToPage}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
                language={language}
              />
            )}
          </>
        )}
      </>
    );
  };
  return (
    <div className='md:bg-secondary md:rounded-small hidden lg:flex lg:flex-1'>
      <div className='flex size-full flex-col p-4'>{renderReviewContent()}</div>
    </div>
  );
}

const NoReview = ({ language }: { language: string }) => (
  <div className='grid h-full place-items-center overflow-auto'>
    {language === 'en'
      ? 'No reviews yet. Be the first to leave a review!'
      : '리뷰가 없습니다. 첫 리뷰를 남겨주세요!'}
  </div>
);

const LoadingStatus = () => (
  <div className='grid h-full place-items-center overflow-auto'>
    <img src={Loading} alt='로딩 중' />
  </div>
);

const FetchFailed = ({ language }: { language: string }) => (
  <div className='grid h-full place-items-center overflow-auto'>
    {language === 'en'
      ? 'Failed to fetch reviews.'
      : '리뷰를 가져오지 못했습니다.'}
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
  language: string;
}

const PaginationControls = ({
  pagination,
  goToPage,
  goToNextPage,
  goToPrevPage,
  language,
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
        {language === 'en'
          ? `Page ${currentPage + 1} of ${totalElements} reviews`
          : `총 ${totalElements}개의 리뷰 중 ${currentPage + 1}페이지`}
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
          {language === 'en' ? 'Prev' : '이전'}
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
          {language === 'en' ? 'Next' : '다음'}
        </button>
      </div>
    </div>
  );
};
