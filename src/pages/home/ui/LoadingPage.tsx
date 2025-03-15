import React from "react";
import { Loading } from "~/assets";
import { cn } from "~/shared/utils";
import { TIME_LABELS } from "~/widgets/home/model";
import { HomeHeader } from "~/widgets/home/ui";

export default function LoadingPage() {
  return (
    <div className="w-full flex-1">
      <div className="padding h-[calc(100vh-4rem)] w-full">
        <div className="flex size-full flex-col gap-y-4 px-0 md:px-20">
          <HomeHeader />
          <div className="flex h-[75%] w-full flex-shrink-0 flex-col gap-x-4 md:flex-row">
            <div className="rounded-normal text-md mb-4 flex h-fit w-full items-center justify-center overflow-hidden bg-white font-medium md:mb-0 md:flex md:h-full md:w-20 md:min-w-20 md:flex-col md:text-lg">
              {TIME_LABELS.map((time) => (
                <div
                  key={time}
                  className={cn(
                    "grid w-full transform cursor-pointer place-items-center bg-white py-4 duration-200 md:py-14",
                    time === "점심" && "bg-primary text-white",
                  )}
                >
                  {time}
                </div>
              ))}
            </div>
            <div className="scrollbar-hide rounded-normal flex h-full w-full flex-1 gap-x-5 overflow-scroll bg-white p-5">
              <div className="flex w-full flex-col items-center justify-center gap-y-2 text-xl font-medium lg:w-90 lg:text-2xl">
                <img src={Loading} />
              </div>
              <div className="md:bg-secondary md:rounded-small hidden lg:flex lg:flex-1">
                <div className="grid size-full place-items-center p-4">
                  <p>메뉴가 로딩 중이에요!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
