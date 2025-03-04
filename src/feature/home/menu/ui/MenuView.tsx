import React, { useEffect, useState } from "react";
import { get, REQUEST } from "~/shared/api";
import { useDateStore, useMenuStore } from "~/shared/store";
import { cn, getDay, getDayKey } from "~/shared/utils";

import { MenuItem, Time, WeeklyMenu } from "~/widgets/home/types";
import { RUN_TIME, setMenuData, TIME } from "~/widgets/home/model";
import { Loading } from "~/assets";

interface MenuViewProps {
  time: Time;
}

export default function MenuView({ time }: MenuViewProps) {
  const {
    todayMenu,
    setTodayMenu,
    setWeeklyMenu,
    selectedMenu,
    setSelectedMenu,
    setSelectedMenuId,
  } = useMenuStore();
  const { selectedDate } = useDateStore();
  const key = getDayKey(getDay(selectedDate));
  const [status, setStatus] = useState<React.JSX.Element>(LoadingStatus);

  async function fetchMenu() {
    const data = await get({ request: REQUEST.fetchDormMenu });
    setMenuData(data);
    setWeeklyMenu(data as WeeklyMenu);
    setTodayMenu(data[key]);
  }

  useEffect(() => {
    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!todayMenu) setStatus(FetchFailed);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (key === "SUNDAY" || key === "SATURDAY") {
      return <>주말에는 운영하지 않습니다.</>;
    }

    if (!todayMenu) {
      return status;
    }

    if (todayMenu && !todayMenu[TIME[time]]) {
      return <>미운영</>;
    }

    if (todayMenu) {
      return (
        <>
          <p className="text-primary text-md-important">
            {RUN_TIME[TIME[time]]}
          </p>
          {todayMenu[TIME[time]].contents.map((menu: MenuItem) => (
            <p
              key={menu.dietFoodDTO.id}
              className={cn(
                selectedMenu === menu.dietFoodDTO && "text-primary",
                "hover:text-primary cursor-pointer",
                menu.dietFoodDTO.name.length > 15 && "hidden",
                menu.dietFoodDTO.name === "*운영시간 안내" && "hidden",
              )}
              onClick={() => {
                setSelectedMenu(menu.dietFoodDTO);
                setSelectedMenuId(menu.dietFoodDTO.id);
              }}
            >
              {menu.dietFoodDTO.name}
            </p>
          ))}
        </>
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2 text-xl font-medium md:w-90 md:text-2xl">
      {renderContent()}
    </div>
  );
}

const LoadingStatus = () => <img src={Loading} />;
const FetchFailed = () => (
  <div className="flex flex-col gap-y-2">
    <p>정보를 받아오지 못했어요.</p>
    <button
      className="text-md-important hover:primary hover:text-primary cursor-pointer text-center text-gray-400"
      onClick={() => window.location.reload()}
    >
      다시 시도하기
    </button>
  </div>
);
