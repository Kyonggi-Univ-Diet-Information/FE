import { RouteObject } from "react-router-dom";

import { PATH } from "~/shared/constants";

import { HomePage } from "~/pages/home/ui";
import { LoginPage } from "~/pages/login/ui";
import { RestaurantPage } from "~/pages/restaurant/ui";
import { AuthPage } from "~/pages/auth/ui";
import { fetchDormMenu } from "~/feature/home/menu/ui/MenuView";

export const HomeRoutes: RouteObject = {
  children: [
    { path: PATH.HOME, element: <HomePage />, loader: fetchDormMenu },
    { path: PATH.LOGIN, element: <LoginPage /> },
    { path: PATH.RESTAURANT, element: <RestaurantPage /> },
    { path: PATH.AUTH, element: <AuthPage /> },
  ],
};
