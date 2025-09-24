import { RouteObject } from "react-router-dom";

import { PATH } from "~/shared/constants";

import { HomePage, LoadingPage } from "~/pages/home/ui";
import { LoginPage } from "~/pages/login/ui";
import { RestaurantPage } from "~/pages/restaurant/ui";
import { AuthPage } from "~/pages/auth/ui";
import { fetchDormMenu } from "~/feature/home/menu/utils";
import { NoticeImg } from "~/assets";

export const HomeRoutes: RouteObject = {
  children: [
    {
      path: PATH.HOME,
      element: <HomePage />,
      loader: fetchDormMenu,
      hydrateFallbackElement: <LoadingPage />,
      errorElement: (
        <div className="grid h-[90vh] w-full place-items-center">
          <div className="flex flex-col justify-center text-center leading-relaxed md:text-2xl">
            <img src={NoticeImg} className="mx-auto size-60" />
            기룡이가 열심히 다음 주 데이터를 받아오고 있어요!
            <br />
            월요일에 만나요.
          </div>
        </div>
      ),
    },
    { path: PATH.LOGIN, element: <LoginPage /> },
    { path: PATH.RESTAURANT, element: <RestaurantPage /> },
    { path: PATH.AUTH, element: <AuthPage /> },
  ],
};
