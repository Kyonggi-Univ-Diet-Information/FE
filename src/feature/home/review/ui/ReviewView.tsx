import { MdOutlineMenuBook } from "react-icons/md";

import { ReviewInput, ReviewItem } from "~/feature/home/review/ui";
import { useMenuStore } from "~/shared/store";
import { Loading } from "~/assets";
import { useFetchReview } from "../api";

export default function ReviewView() {
  const { selectedMenu, selectedMenuId } = useMenuStore();

  const { data: reviews, isLoading, isError } = useFetchReview(selectedMenuId);

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
        {isLoading ? (
          <LoadingStatus />
        ) : isError ? (
          <FetchFailed />
        ) : !reviews || reviews.length === 0 ? (
          <NoReview />
        ) : (
          <div className="scrollbar-hide flex-shrink: 0 mt-2 flex h-full flex-col gap-y-2 overflow-scroll">
            {[...reviews].reverse().map((review, index) => (
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
