import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppLayout } from "~/app/layouts";
import { HomeRoutes } from "./routes/HomeRoutes";
import { ErrorPage } from "~/pages/error/ui";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [HomeRoutes],
  },
  { path: "/*", element: <ErrorPage /> },
]);

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
