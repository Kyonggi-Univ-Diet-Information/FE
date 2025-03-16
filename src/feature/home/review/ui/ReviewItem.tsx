import { useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";

import { MdOutlineThumbUp } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { del, get, post, REQUEST } from "~/shared/api";
import { cn, formatDatefromString, getCookie } from "~/shared/utils";
import { Review } from "~/feature/home/review/types";
import { useQuery } from "@tanstack/react-query";

export default function ReviewItem({
  id,
  createdAt,
  content,
  memberName,
  rating,
}: Review) {
  const [favCount, setFavCount] = useState(0);
  const [fav, setFav] = useState(false);
  const { data: favCnt, refetch: reviewFavCnt } = useQuery({
    queryKey: ["reviewFavCnt", id],
    queryFn: async () => {
      const response = await get({
        request: REQUEST.fetchReviewFav + id,
        format: true,
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getCookie("token"),
  });

  const { data: favList, refetch: reviewFavList } = useQuery({
    queryKey: ["reviewFavList", id],
    queryFn: async () => {
      try {
        const response = await get({
          request: REQUEST.fetchMemberFav,
          headers: { Authorization: `Bearer ${getCookie("token")}` },
          format: true,
        });
        return response.data.map((item) => item.dietFoodReviewId);
      } catch (error) {
        console.log(error);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!getCookie("token"),
  });

  useEffect(() => {
    if (favCnt !== undefined) {
      setFavCount(favCnt);
    }
  }, [favCnt]);

  useEffect(() => {
    if (favList && Array.isArray(favList)) {
      setFav(favList.includes(id));
    }
  }, [favList, id]);

  async function toggleFavorite() {
    try {
      if (!fav) {
        await post(REQUEST.toggleReviewFav + id + "/create-favorite", null, {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        setFav(true);
        setFavCount((prev) => prev + 1);
      } else {
        await del(REQUEST.toggleReviewFav + "delete/" + id, {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        setFav(false);
        setFavCount((prev) => Math.max(0, prev - 1));
      }
      Promise.all([reviewFavCnt(), reviewFavList()]);
    } catch (error) {
      console.log(error);
      reviewFavCnt();
      reviewFavList();
    }
  }

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
