import React, { useEffect } from "react";
import { useDateStore, useMenuStore } from "~/shared/store";
import { cn, getDay, getDayKey } from "~/shared/utils";

import { DailyMenu, MenuItem, Time, WeeklyMenu } from "~/widgets/home/types";
import { RUN_TIME, setMenuData, TIME } from "~/widgets/home/model";
import { useLoaderData } from "react-router-dom";
import { Review } from "../../review/types";

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
  } = useMenuStore();
  const { selectedDate } = useDateStore();
  const key = getDayKey(getDay(selectedDate));
  const data = useLoaderData();

  const sampleReviews: Review[] = [];

  const createMenuItem = (id: number, name: string): MenuItem => ({
    id,
    dietFoodDTO: {
      id: 1000 + id,
      name,
      dietFoodReviews: sampleReviews,
    },
  });

  const breakfastMenus = [
    "닭가슴살 샐러드",
    "오트밀과 바나나",
    "계란 흰자 스크램블",
    "고구마와 삶은 계란",
    "그릭 요거트",
    "토마토 치즈 오픈 샌드위치",
    "연어 아보카도 토스트",
    "닭죽",
  ].map((name, i) => createMenuItem(i + 1, name));

  const lunchMenus = [
    "현미밥과 불고기",
    "닭가슴살 김밥",
    "두부 샐러드",
    "우엉조림 도시락",
    "닭가슴살 볶음밥",
    "현미 리조또",
    "쌈밥",
    "연어 샐러드",
  ].map((name, i) => createMenuItem(i + 100, name));

  const dinnerMenus = [
    "두부 스테이크",
    "야채 스프",
    "닭가슴살 구이",
    "곤약국수",
    "닭죽",
    "샐러드볼",
    "현미죽",
    "계란찜과 나물",
  ].map((name, i) => createMenuItem(i + 200, name));

  const todayMenu: DailyMenu = {
    BREAKFAST: { contents: breakfastMenus },
    LUNCH: { contents: lunchMenus },
    DINNER: { contents: dinnerMenus },
  };

  useEffect(() => {
    if (data) {
      setMenuData(data);
      setWeeklyMenu(data as WeeklyMenu);
      setTodayMenu(data[key] || null);
    }
  }, [data, key, setWeeklyMenu, setTodayMenu]);

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
