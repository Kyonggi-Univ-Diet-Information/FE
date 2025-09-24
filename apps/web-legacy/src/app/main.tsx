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
        errorElement: (
          <div className="grid h-screen w-full place-items-center">
            <div className="text-center">
              <div className="mb-4 text-red-500">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                데이터를 불러올 수 없습니다
              </h2>
              <p className="mb-4 text-gray-600">
                네트워크 연결을 확인하고 다시 시도해주세요.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                다시 시도
              </button>
            </div>
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
