import React, { useEffect, useState } from "react";
import { useDateStore, useLanguageStore, useMenuStore } from "~/shared/store";
import { cn, getDay, getDayKey } from "~/shared/utils";

import type { MenuItem, Time, WeeklyMenu } from "~/widgets/home/types";
import { RUN_TIME, setMenuData, TIME } from "~/widgets/home/model";
import { useLoaderData, useNavigate } from "react-router-dom";

interface MenuViewProps {
  time: Time;
}

export default function MenuView({ time }: MenuViewProps) {
  const {
    selectedMenu,
    setSelectedMenu,
    setSelectedMenuId,
    setWeeklyMenu,
    setTodayMenu,
    todayMenu,
  } = useMenuStore();
  const { selectedDate } = useDateStore();
  const { language } = useLanguageStore();
  const key = getDayKey(getDay(selectedDate));
  const { result: data } = useLoaderData<{ result: WeeklyMenu }>();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setMenuData(data);
      setWeeklyMenu(data as WeeklyMenu);
    }
  }, [data, setWeeklyMenu, setTodayMenu]);

  useEffect(() => {
    setTodayMenu(data[key] || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth < 1024;
      setIsMobile(newIsMobile);
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedCheckScreenSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 100);
    };

    checkScreenSize();
    window.addEventListener("resize", debouncedCheckScreenSize);

    return () => {
      window.removeEventListener("resize", debouncedCheckScreenSize);
      clearTimeout(timeoutId);
    };
  }, []);

  const renderContent = () => {
    if (key === "SUNDAY" || key === "SATURDAY")
      return <>주말에는 운영하지 않습니다.</>;
    if (!todayMenu) return <FetchFailed />;
    if (data && !todayMenu[TIME[time]]) return <>미운영</>;
    if (todayMenu) {
      return (
        <>
          <p className="text-primary text-md-important">
            {RUN_TIME[TIME[time]]}
          </p>
          {todayMenu[TIME[time]].contents.map((menu: MenuItem) => {
            return (
              <p
                key={menu.dietFoodDTO.id}
                className={cn(
                  selectedMenu === menu.dietFoodDTO && "text-primary",
                  "hover:text-primary cursor-pointer",
                  (language === "en"
                    ? menu.dietFoodDTO.nameEn
                    : menu.dietFoodDTO.name
                  ).length > 15 && "hidden",
                  menu.dietFoodDTO.name === "*운영시간 안내" && "hidden",
                )}
                onClick={() => {
                  if (isMobile) {
                    navigate(`/mobile/review/${menu.dietFoodDTO.id}`);
                  } else {
                    setSelectedMenu(menu.dietFoodDTO);
                    setSelectedMenuId(menu.dietFoodDTO.id);
                  }
                }}
              >
                {language === "en"
                  ? menu.dietFoodDTO.nameEn
                  : menu.dietFoodDTO.name}
              </p>
            );
          })}
        </>
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2 text-xl font-medium lg:w-90 lg:text-2xl">
      {renderContent()}
    </div>
  );
}

const FetchFailed = () => (
  <div className="flex flex-col gap-y-2">
    <p>정보를 받아오지 못했어요.</p>
    <button
      className="text-md-important hover:primary hover:text-primary cursor-pointer text-center text-gray-400 focus:outline-none"
      onClick={() => window.location.reload()}
    >
      다시 시도하기
    </button>
  </div>
);
