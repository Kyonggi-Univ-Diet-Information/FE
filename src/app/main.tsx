import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppLayout, MobileLayout } from "~/app/layouts";
import { HomeRoutes } from "./routes/HomeRoutes";
import { ErrorPage } from "~/pages/error/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PATH } from "~/shared/constants";
import ReviewPage from "~/pages/review/ui/ReviewPage";
import { fetchDormMenu } from "~/feature/home/menu/utils";
import { Loading } from "~/assets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [HomeRoutes],
  },
  {
    path: PATH.MOBILE,
    element: <MobileLayout />,
    children: [
      {
        path: PATH.REVIEW,
        element: <ReviewPage />,
        loader: fetchDormMenu,
        hydrateFallbackElement: (
          <div className="grid h-screen w-full place-items-center">
            <img src={Loading} />
          </div>
        ),
      },
    ],
  },

  { path: "/*", element: <ErrorPage /> },
]);

const rootElement = document.getElementById("root") as HTMLElement;
const queryClient = new QueryClient();

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
