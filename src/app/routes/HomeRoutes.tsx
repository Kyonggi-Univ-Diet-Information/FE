import { RouteObject } from "react-router-dom";

import { HomePage } from "~/pages/home/ui";
import { LoginPage } from "~/pages/login/ui";
import { PATH } from "~/shared/constants";

export const HomeRoutes: RouteObject = {
  children: [
    { path: PATH.HOME, element: <HomePage /> },
    { path: PATH.LOGIN, element: <LoginPage /> },
  ],
};
