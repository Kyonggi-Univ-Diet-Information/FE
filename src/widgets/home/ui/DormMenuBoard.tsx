import { useState } from "react";

import { Time } from "~/widgets/home/types";
import { MenuView } from "~/feature/home/menu/ui";
import { ReviewView } from "~/feature/home/review/ui";
import { TimeSelector } from "~/widgets/home/ui";

export default function DormMenuBoard() {
  const [time, setTime] = useState<Time>("점심");
  return (
    <div className="flex h-[75%] w-full flex-shrink-0 flex-col gap-x-4 md:flex-row">
      <TimeSelector selected={time} setSelected={setTime} />
      <div className="scrollbar-hide rounded-normal flex h-full w-full flex-1 gap-x-5 overflow-scroll bg-white p-5">
        <MenuView time={time} />
        <ReviewView />
      </div>
    </div>
  );
}
