import React from "react";
import { DormMenuBoard, HomeHeader } from "~/widgets/home/ui";

export default function HomeContainer() {
  return (
    <div className="padding h-[calc(100vh-4rem)] w-full">
      <div className="flex size-full flex-col gap-y-4 px-0 md:px-20">
        <HomeHeader />
        <DormMenuBoard />
      </div>
    </div>
  );
}
