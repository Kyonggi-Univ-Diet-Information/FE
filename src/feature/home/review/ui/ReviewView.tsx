import { useEffect, useState } from "react";

import { MdOutlineMenuBook } from "react-icons/md";

import { ReviewInput, ReviewItem } from "~/feature/home/review/ui";
import { useMenuStore, useReviewStore } from "~/shared/store";
import { Review } from "../types/review";
import { get, REQUEST } from "~/shared/api";
import { Loading } from "~/assets";

export default function ReviewView() {
  const { selectedMenu, selectedMenuId } = useMenuStore();
  const { newReview } = useReviewStore();
  const [selectedReview, setSelectedReview] = useState<Review[]>([]);
  const [status, setStatus] = useState<React.JSX.Element>(LoadingStatus);

  async function fetchReview() {
    try {
      const response = await get({
        request: REQUEST.fetchMenuReview + selectedMenuId,
        format: true,
      });
      setSelectedReview(response.data);
    } catch (error) {
      console.error(error);
      setSelectedReview(undefined);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selectedReview) setStatus(FetchFailed);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedMenu]);

  useEffect(() => {
    if (selectedMenu) {
      fetchReview();
    }
    return () => {
      setSelectedReview(undefined);
      setStatus(LoadingStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMenu]);

  useEffect(() => {
    if (newReview) {
      fetchReview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReview]);

  const renderReviewContent = () => {
    if (!selectedMenu)
      return (
        <div className="flex h-full w-full flex-col items-center justify-center leading-loose">
          <MdOutlineMenuBook size={35} />
          메뉴를 선택하고 리뷰를 확인하세요!
        </div>
      );

    return (
      <>
        <p className="mb-4 text-xl">
          <b>{selectedMenu.name}</b>, 어떨까?
        </p>
        <ReviewInput menuId={selectedMenuId} />
        {!selectedReview ? (
          status
        ) : selectedReview.length === 0 ? (
          <NoReview />
        ) : (
          <div className="flex-shrink: 0 mt-2 flex h-full flex-col gap-y-2 overflow-scroll">
            {[...selectedReview].reverse().map((review, index) => (
              <ReviewItem key={index} {...review} />
            ))}
          </div>
        )}
      </>
    );
  };
  return (
    <div className="md:bg-secondary md:rounded-small hidden lg:flex lg:flex-1">
      <div className="flex size-full flex-col p-4">{renderReviewContent()}</div>
    </div>
  );
}

const NoReview = () => (
  <div className="grid h-full place-items-center overflow-auto">
    리뷰가 없습니다. 첫 리뷰를 남겨주세요!
  </div>
);

const LoadingStatus = () => (
  <div className="grid h-full place-items-center overflow-auto">
    <img src={Loading} alt="로딩 중" />
  </div>
);

const FetchFailed = () => (
  <div className="grid h-full place-items-center overflow-auto">
    리뷰를 가져오지 못했습니다.
  </div>
);
