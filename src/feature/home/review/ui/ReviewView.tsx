import { useEffect, useState } from "react";

import { MdOutlineMenuBook } from "react-icons/md";

import { ReviewInput, ReviewItem } from "~/feature/home/review/ui";
import { useDateStore, useMenuStore, useReviewStore } from "~/shared/store";
import { Review } from "../types/review";
import { get, REQUEST } from "~/shared/api";
import { getDay, getDayKey } from "~/shared/utils";
import { setMenuData } from "~/widgets/home/model";
import { WeeklyMenu } from "~/widgets/home/types";

export default function ReviewView() {
  const {
    selectedMenu,
    setSelectedMenu,
    selectedMenuId,
    setSelectedMenuId,
    setTodayMenu,
    setWeeklyMenu,
  } = useMenuStore();
  const { selectedDate } = useDateStore();
  const { newReview } = useReviewStore();
  const [selectedReview, setSelectedReview] = useState<Review[]>(null);
  const key = getDayKey(getDay(selectedDate));

  function fetchReview() {
    const reviews: Review[] = selectedMenu.dietFoodReviews;
    setSelectedReview(reviews);
  }

  async function fetchMenu() {
    const data = await get({ request: REQUEST.fetchDormMenu });
    setMenuData(data);
    setWeeklyMenu(data as WeeklyMenu);
    setTodayMenu(data[key]);
    setSelectedMenu(selectedMenu);
    setSelectedMenuId(selectedMenuId);
  }

  useEffect(() => {
    if (selectedMenu) {
      fetchReview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMenu]);

  useEffect(() => {
    if (newReview) {
      fetchMenu();
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
          <NoReview />
        ) : (
          <div className="mt-2 flex h-full flex-col gap-y-2 overflow-auto">
            {[...selectedReview].reverse().map((review, index) => (
              <ReviewItem key={index} review={review} />
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

// const LoadingStatus = () => (
//   <div className="grid h-full place-items-center overflow-auto">
//     <img src={Loading} alt="로딩 중" />
//   </div>
// ); 리뷰를 메뉴 통해서 받아오기 때문에, 리뷰를 따로 로딩할 경우는 없다고 가정
