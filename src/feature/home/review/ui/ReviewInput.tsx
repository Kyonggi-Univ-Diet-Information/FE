import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useReviewStore } from "~/shared/store";
import { post, REQUEST } from "~/shared/api";
import { getCookie } from "~/shared/utils";
import { Config, Review } from "../types/review";
import { PATH } from "~/shared/constants";

export default function ReviewInput({ menuId }: { menuId: number }) {
  const { setNewReview } = useReviewStore();
  const [value, setValue] = useState("");
  const token = getCookie("token");

  async function postComment(comment: string) {
    try {
      await post<Review, Config>(
        REQUEST.postMenuReview + menuId,
        {
          rating: 5,
          title: "",
          content: comment,
        },
        { headers: { Authorization: `Bearer ${getCookie("token")}` } },
      );
      setValue("");
      setNewReview(comment);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setValue("");
  }, []);

  return (
    <>
      {token ? (
        <div className="h-20">
          <div className="mb-4 grid h-20 w-full grid-cols-6">
            <textarea
              className="border-header-border col-span-5 box-border h-full w-full resize-none rounded-l-lg border bg-white p-4 text-sm transition-colors duration-200 outline-none focus:border-[#00abaa]"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <button
              className="col-span-1 w-full cursor-pointer rounded-r-lg border-none bg-gray-800 text-white transition-colors duration-300 hover:bg-[#00abaa]"
              onClick={() => {
                if (value.length > 0) {
                  postComment(value);
                } else {
                  alert("내용을 입력하세요!");
                }
              }}
            >
              완료
            </button>
          </div>
        </div>
      ) : (
        <div className="h-20">
          <div className="relative mb-4 grid h-20 w-full grid-cols-6">
            <div className="border-header-border absolute inset-0 z-10 grid place-items-center rounded-lg border bg-transparent backdrop-blur-sm">
              <div className="grid place-items-center">
                <p className="m-0 mb-1.5 text-sm">
                  로그인 후 후기를 작성하세요!
                </p>
                <Link
                  to={PATH.LOGIN}
                  className="border-header-border mx-auto cursor-pointer rounded border bg-white px-3 py-1 text-sm leading-normal text-black no-underline transition-colors duration-200 hover:bg-[#00abaa] hover:text-white"
                >
                  로그인
                </Link>
              </div>
            </div>
            <textarea className="col-span-5 box-border h-full w-full resize-none rounded-l-lg border border-gray-200 bg-white p-4 text-sm outline-none" />
            <button className="col-span-1 w-full rounded-r-lg border-none bg-gray-800 text-white">
              완료
            </button>
          </div>
        </div>
      )}
    </>
  );
}
