import { useState, useEffect } from "react";

import { MdOutlineThumbUp } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { del, get, post, REQUEST } from "~/shared/api";
import { cn, formatDatefromString, getCookie } from "~/shared/utils";
import { Review } from "~/feature/home/review/types";

export default function ReviewItem({ review }: { review: Review }) {
  const [favCount, setFavCount] = useState(0);
  const [fav, setFav] = useState(false);

  async function fetchFavCnt() {
    const response = await get({
      request: REQUEST.fetchReviewFav + review.id,
      format: true,
    });
    setFavCount(response.data);
  }

  async function fetchIsFaved() {
    try {
      const response = await get({
        request: REQUEST.fetchMemberFav,
        headers: { Authorization: `Bearer ${getCookie("token")}` },
        format: true,
      });
      const favList = response.data.map((item) => item.dietFoodReviewId);
      setFav(favList.includes(review.id));

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleFavorite() {
    if (!fav) {
      await post(
        REQUEST.toggleReviewFav + review.id + "/create-favorite",
        null,
        { headers: { Authorization: `Bearer ${getCookie("token")}` } },
      );
      await Promise.all([fetchIsFaved(), fetchFavCnt()]);
    } else {
      await del(REQUEST.toggleReviewFav + "delete/" + review.id, {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      await Promise.all([fetchIsFaved(), fetchFavCnt()]);
    }
  }

  useEffect(() => {
    if (getCookie("token")) {
      fetchIsFaved();
    }
    fetchFavCnt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   function maskName(name: string) {
  //     if (name.length <= 1) {
  //       return name;
  //     }
  //     return name[0] + "*".repeat(name.length - 1);
  //   }

  return (
    <div className="border-header-border m-0 box-border flex flex-col gap-y-1 rounded-lg border-[1px] bg-white/60 p-3 text-sm leading-normal">
      <div className="m-0 flex items-center justify-between pb-1 text-sm font-semibold">
        <div className="flex w-full items-center justify-between">
          익명
          <span className="text-xs font-normal">
            {formatDatefromString(review.createdAt.slice(0, 10))}
          </span>
        </div>
      </div>
      {review.content}
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
