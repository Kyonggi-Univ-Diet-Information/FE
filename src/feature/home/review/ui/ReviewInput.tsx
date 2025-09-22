import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { cn, getCookie } from "~/shared/utils";
import { PATH } from "~/shared/constants";
import { useLanguageStore } from "~/shared/store";
import { FaStar } from "react-icons/fa";
import { useFetchReview, useSubmitReview } from "../api";

export default function ReviewInput({ menuId }: { menuId: number }) {
  const { refetch: refetchReview } = useFetchReview(menuId);
  const { mutate } = useSubmitReview();
  const { language } = useLanguageStore();
  const [selectedStars, setSelectedStars] = useState(3);
  const [value, setValue] = useState("");
  const token = getCookie("token");

  const Star = ({ selected, index }: { selected: boolean; index: number }) => (
    <FaStar
      className={cn(
        "size-3.5 cursor-pointer",
        selected ? "text-primary" : "text-gray",
      )}
      onClick={() => setSelectedStars(index + 1)}
    />
  );

  const postComment = (comment: string) => {
    const data = { title: comment, content: comment, rating: selectedStars };
    mutate(
      { data: { ...data }, menuId: menuId },
      {
        onSuccess: () => {
          setValue("");
          refetchReview();
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  useEffect(() => {
    setValue("");
  }, []);

  return (
    <>
      {token ? (
        <div className="flex h-26 flex-col">
          <div className="mb-2 flex items-center gap-x-2">
            <span className="text-sm">
              {language === "en"
                ? "Please rate the food!"
                : "음식에 대한 평점을 표시해 주세요!"}
            </span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} index={i} selected={selectedStars > i} />
              ))}
            </div>
          </div>
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
                  alert(
                    language === "en"
                      ? "Please enter content!"
                      : "내용을 입력하세요!",
                  );
                }
              }}
            >
              {language === "en" ? "Submit" : "완료"}
            </button>
          </div>
        </div>
      ) : (
        <div className="h-20">
          <div className="relative mb-4 grid h-20 w-full grid-cols-6">
            <div className="border-header-border absolute inset-0 z-10 grid place-items-center rounded-lg border-[1px] bg-transparent backdrop-blur-sm">
              <div className="grid place-items-center">
                <p className="m-0 mb-1.5 text-sm">
                  {language === "en"
                    ? "Please login to write a review!"
                    : "로그인 후 후기를 작성하세요!"}
                </p>
                <Link
                  to={PATH.LOGIN}
                  className="border-header-border mx-auto cursor-pointer rounded border bg-white px-3 py-1 text-sm leading-normal text-black no-underline transition-colors duration-200 hover:bg-[#00abaa] hover:text-white"
                >
                  {language === "en" ? "Login" : "로그인"}
                </Link>
              </div>
            </div>
            <textarea className="col-span-5 box-border h-full w-full resize-none rounded-l-lg border border-gray-200 bg-white p-4 text-sm outline-none" />
            <button className="col-span-1 w-full rounded-r-lg border-none bg-gray-800 text-white">
              {language === "en" ? "Submit" : "완료"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
