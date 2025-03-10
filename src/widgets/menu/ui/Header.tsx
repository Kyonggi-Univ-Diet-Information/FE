import { ComponentProps } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import { PATH } from "~/shared/constants";
import { cn, getCookie } from "~/shared/utils";

export default function Header() {
  const location = useLocation();
  const theme = location.pathname === "/restaurant" ? "black" : "white";
  return (
    <div
      className={cn(
        "padding border-header-border flex h-10 w-full items-center justify-between",
        theme === "black"
          ? "bg-black text-white"
          : "border-b-[0.5px] bg-white/40",
      )}
    >
      <div className="flex items-baseline">
        <Link className="text-2xl font-bold" to={PATH.HOME}>
          기밥
        </Link>
        <span className="md:text-md ml-2 hidden md:flex">기룡아 밥먹자</span>
      </div>
      <div className="m-0 flex items-center justify-end gap-x-7">
        <NavButton label="교내식당" to={PATH.RESTAURANT} />
        <NavButton
          label="문의하기"
          onClick={() =>
            window.location.assign("https://open.kakao.com/o/sgcUtX3g")
          }
        />
        {getCookie("token") ? (
          <NavButton onClick={LogOut} label="로그아웃" />
        ) : (
          <NavButton label="로그인" to={PATH.LOGIN} />
        )}
      </div>
    </div>
  );
}

const LogOut = () => {
  document.cookie = "token=; max-age=0; path=/";
  window.location.reload();
};

interface NavButtonProp {
  label: string;
  to?: string;
}

function NavButton({
  label,
  to,
  onClick,
}: NavButtonProp & ComponentProps<"button">) {
  if (onClick) {
    return (
      <button
        className="active:text-primary hover:text-primary md:text-md cursor-pointer text-sm"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
  return (
    <NavLink
      className="active:text-primary hover:text-primary md:text-md text-sm"
      to={to}
    >
      {label}
    </NavLink>
  );
}
