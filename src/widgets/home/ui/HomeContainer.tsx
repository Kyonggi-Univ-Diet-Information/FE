import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiceImg } from "~/assets";
import { useDateStore } from "~/shared/store";
import { formatDate, getDay, getDayKey } from "~/shared/utils";
import { DormMenuBoard } from "~/widgets/home/ui";

export default function HomeContainer() {
  return (
    <div className="padding size-full">
      <div className="flex size-full flex-col gap-y-4 px-0 md:px-20">
        <HomeHeader />
        <DormMenuBoard />
      </div>
    </div>
  );
}

function HomeHeader() {
  const { selectedDate, setSelectedDateAfter, setSelectedDateBefore } =
    useDateStore();
  return (
    <div className="flex h-fit w-full items-center justify-start gap-x-2">
      <img src={RiceImg} className="size-30" />
      <div className="flex flex-col gap-y-2">
        <p className="text-3xl font-bold">오늘의 드림타워 식단</p>
        <div className="flex gap-x-2">
          <button
            onClick={() => setSelectedDateBefore()}
            className="hover:text-primary cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
            disabled={getDayKey(getDay(selectedDate)) === "MONDAY"}
          >
            <IoIosArrowBack size={16} />
          </button>
          <span className="text-xl font-semibold">
            {formatDate(selectedDate)}
          </span>
          <button
            onClick={() => setSelectedDateAfter()}
            className="hover:text-primary cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
            disabled={getDayKey(getDay(selectedDate)) === "SUNDAY"}
          >
            <IoIosArrowForward size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
