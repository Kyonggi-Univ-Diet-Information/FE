import React from "react";

export default function ErrorPage() {
  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="flex flex-col gap-y-2">
        <span className="text-lg font-semibold">404 Not Found</span>
        <button
          className="hover:bg-primary rounded-normal border-header-border h-[50px] w-full cursor-pointer border-[1px] bg-white px-4 text-black transition-all duration-300 hover:text-white"
          onClick={() => (window.location.href = "https://www.kiryong.site/")}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
