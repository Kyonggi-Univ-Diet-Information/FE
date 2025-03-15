import { type Dispatch, type SetStateAction } from "react";

import type { Time } from "~/widgets/home/types";
import { cn } from "~/shared/utils";
import { TIME_LABELS } from "~/widgets/home/model";

interface TimeSelectorProps {
  selected: Time;
  setSelected: Dispatch<SetStateAction<Time>>;
}

export default function TimeSelector({
  selected,
  setSelected,
}: TimeSelectorProps) {
  const TimeButton = ({ time }: { time: Time }) => (
    <button
      className={cn(
        "hover:bg-primary w-full transform cursor-pointer bg-white py-4 duration-200 hover:text-white md:py-14",
        selected === time && "bg-primary text-white",
      )}
      onClick={() => setSelected(time)}
    >
      {time}
    </button>
  );

  return (
    <div className="rounded-normal text-md mb-4 flex h-fit w-full items-center justify-center overflow-hidden bg-white font-medium md:mb-0 md:flex md:h-full md:w-20 md:min-w-20 md:flex-col md:text-lg">
      {TIME_LABELS.map((time) => (
        <TimeButton time={time} key={time} />
      ))}
    </div>
  );
}
