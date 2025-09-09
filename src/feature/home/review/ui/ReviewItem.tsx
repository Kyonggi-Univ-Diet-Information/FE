import { useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";

import { MdOutlineThumbUp } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { cn, formatDatefromString, getCookie } from "~/shared/utils";
import { Review } from "~/feature/home/review/types";
import {
  useDeleteReviewFav,
  useFetchMemberFav,
  useSubmitReviewFav,
} from "../api";

export default function ReviewItem({
  id,
  createdAt,
  content,
  memberName,
  rating,
  favCount: initialFavCount = 0,
}: Review) {
  const [favCount, setFavCount] = useState(initialFavCount);
  const [fav, setFav] = useState(false);
  const { data: favList, refetch: reviewFavList } = useFetchMemberFav();
  const { mutate: submitReviewFav } = useSubmitReviewFav();
  const { mutate: deleteReviewFav } = useDeleteReviewFav();

  useEffect(() => {
    setFavCount(initialFavCount);
  }, [initialFavCount]);

  useEffect(() => {
    if (favList && Array.isArray(favList) && favList.length > 0) {
      const favoriteReviewIds = favList.map(
        (comment) => comment.dietFoodReviewId,
      );
      const isFavorited = favoriteReviewIds.includes(id);

      setFav(isFavorited);
    } else {
      setFav(false);
    }
  }, [favList, id]);

  const toggleFavorite = () => {
    if (!fav) {
      submitReviewFav(id, {
        onSuccess: () => {
          setFav(true);
          setFavCount((prev) => prev + 1);
          reviewFavList();
        },
        onError: (error) => {
          console.error("좋아요 추가 실패:", error);
        },
      });
    } else {
      deleteReviewFav(id, {
        onSuccess: () => {
          setFav(false);
          setFavCount((prev) => Math.max(0, prev - 1));
          reviewFavList();
        },
        onError: (error) => {
          console.error("좋아요 삭제 실패:", error);
        },
      });
    }
  };

  function maskName(name: string) {
    if (name.length <= 1) {
      return name;
    }
    return name[0] + "*".repeat(name.length - 1);
  }

  return (
    <div className="border-header-border m-0 box-border flex flex-col gap-y-1 rounded-lg border-[1px] bg-white/60 p-3 text-sm leading-normal">
      <div className="m-0 flex items-center justify-between pb-1 text-sm font-semibold">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-x-2">
            {maskName(memberName)}
            <div className="flex gap-y-1">
              {Array.from({ length: rating }).map(() => (
                <FaStar className="text-primary size-3" />
              ))}
            </div>
          </div>
          <span className="text-xs font-normal">
            {formatDatefromString(createdAt.slice(0, 10))}
          </span>
        </div>
      </div>
      {content}
      <button
        className={cn(
          "rounded-small hover:bg-primary border-header-border mt-1 flex w-fit cursor-pointer items-start gap-x-2 border-[1px] p-1 px-2 transition-colors duration-200 hover:text-white disabled:cursor-default disabled:text-gray-400 disabled:hover:bg-white",
          fav && "bg-primary text-white",
        )}
        onClick={() => toggleFavorite()}
        disabled={!getCookie("token")}
      >
        <div className="text-xs font-medium">{favCount}</div>
        <div className="border-none bg-transparent">
          {fav ? <IoMdThumbsUp size={16} /> : <MdOutlineThumbUp size={16} />}
        </div>
      </button>
    </div>
  );
}
