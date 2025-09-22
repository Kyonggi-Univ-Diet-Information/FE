import { useMemo, useEffect } from "react";
import { MdOutlineMenuBook } from "react-icons/md";
import { useParams, useLoaderData } from "react-router-dom";
import { Loading } from "~/assets";
import {
  useFetchBatchFavCounts,
  useFetchReview,
} from "~/feature/home/review/api";
import { ReviewInput, ReviewItem } from "~/feature/home/review/ui";
import { useMenuStore } from "~/shared/store";
import { WeeklyMenu } from "~/widgets/home/types";

export default function ReviewPage() {
  const { menuId } = useParams();
  const loaderData = useLoaderData() as { result: WeeklyMenu };
  const { weeklyMenu, setWeeklyMenu } = useMenuStore();

  console.log("ReviewPage render:", { menuId, loaderData, weeklyMenu });

  useEffect(() => {
    if (loaderData?.result && !weeklyMenu) {
      setWeeklyMenu(loaderData.result);
    }
  }, [loaderData, weeklyMenu, setWeeklyMenu]);

  const menuName = useMemo(() => {
    const menuData = weeklyMenu || loaderData?.result;
    if (!menuData || !menuId) return null;

    for (const day in menuData) {
      const dailyMenu = menuData[day];
      for (const time in dailyMenu) {
        const meal = dailyMenu[time];
        for (const menuItem of meal.contents) {
          if (menuItem.dietFoodDTO.id === Number(menuId)) {
            return menuItem.dietFoodDTO.name;
          }
        }
      }
    }
    return null;
  }, [weeklyMenu, loaderData, menuId]);

  const { data: reviews, isLoading, isError } = useFetchReview(Number(menuId));

  // 리뷰 ID들을 추출
  const reviewIds = useMemo(() => {
    return (
      reviews?.content
        ?.map((review) => review.id)
        .filter((id): id is number => id !== undefined) || []
    );
  }, [reviews]);

  // 배치로 좋아요 수 가져오기
  const { data: favCounts } = useFetchBatchFavCounts(reviewIds);

  // 리뷰에 좋아요 수 추가
  const reviewsWithFavCounts = useMemo(() => {
    if (!reviews || !favCounts) return reviews.content;
    return reviews.content.map((review) => ({
      ...review,
      favCount: review.id ? favCounts[review.id] || 0 : 0,
    }));
  }, [reviews, favCounts]);
  const renderReviewContent = () => {
    console.log("renderReviewContent:", {
      menuId,
      menuName,
      reviews,
      isLoading,
      isError,
    });

    if (!menuId)
      return (
        <div className="flex h-full w-full flex-col items-center justify-center leading-loose">
          <MdOutlineMenuBook size={35} />
          메뉴를 선택하고 리뷰를 확인하세요!
        </div>
      );

    return (
      <>
        <p className="mb-4 text-xl">
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
          <div className="mt-2 flex flex-1 flex-col gap-y-2 overflow-y-auto">
            {[...reviewsWithFavCounts].reverse().map((review) => (
              <ReviewItem key={review.id} {...review} />
            ))}
          </div>
        )}
      </>
    );
  };
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-col p-4">
        {renderReviewContent()}
      </div>
    </div>
  );
}

const NoReview = () => (
  <div className="mt-8 grid h-full place-items-center overflow-auto">
    리뷰가 없습니다. 첫 리뷰를 남겨주세요!
  </div>
);

const LoadingStatus = () => (
  <div className="mt-8 grid h-full place-items-center overflow-auto">
    <img src={Loading} alt="로딩 중" />
  </div>
);

const FetchFailed = () => (
  <div className="mt-8 grid h-full place-items-center overflow-auto">
    리뷰를 가져오지 못했습니다.
  </div>
);
