import React from "react";
import { getCookie } from "~/shared/utils";
import { HomeContainer } from "~/widgets/home/ui";

export default function HomePage() {
  console.log(getCookie("token"));
  return (
    <div className="w-full flex-1">
      <HomeContainer />
    </div>
  );
}
