import { Dispatch, SetStateAction, useState } from "react";

import { Time } from "~/widgets/home/types";
import { TIME_LABELS } from "~/widgets/home/model";
import { cn } from "~/shared/utils";
import { MenuView } from "~/feature/home/menu/ui";
import { ReviewView } from "~/feature/home/review/ui";

export default function DormMenuBoard() {
  const [time, setTime] = useState<Time>("점심");
  return (
    <div className="flex h-[75%] w-full gap-x-4 2xl:h-130">
      <TimeSelector selected={time} setSelected={setTime} />
      <div className="rounded-normal flex flex-1 gap-x-5 bg-white p-5">
        <MenuView time={time} />
        <ReviewView />
      </div>
    </div>
  );
}

interface TimeSelectorProps {
  selected: Time;
  setSelected: Dispatch<SetStateAction<Time>>;
}

function TimeSelector({ selected, setSelected }: TimeSelectorProps) {
  const TimeButton = ({ time }: { time: Time }) => (
    <button
      className={cn(
        "hover:bg-primary w-full transform cursor-pointer bg-white py-14 duration-200 hover:text-white",
        selected === time && "bg-primary text-white",
      )}
      onClick={() => setSelected(time)}
    >
      {time}
    </button>
  );

  return (
    <div className="rounded-normal flex h-full w-20 flex-col items-center justify-center overflow-hidden bg-white text-lg font-medium">
      {TIME_LABELS.map((time) => (
        <TimeButton time={time} key={time} />
      ))}
    </div>
  );
}
