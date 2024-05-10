import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EmptyLayout } from "@@layouts/empty";
import { ErrorPage } from "@@pages/error";
import { lazy } from "react";
import { LazyWrapper } from "@@elements/lazy";
import { HomePage } from "@@pages/home";

export type Breadcrumb = {
  title: string;
  url: string;
};

const TasksPageLazy = lazy(() => import("./pages/tasks/tasks.page"));
const ParkingPageLazy = lazy(() => import("./pages/parking/parking.page"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <EmptyLayout />,
    errorElement: <ErrorPage />,
    handle: {
      // crumb: () => "Home",
    },
    children: [
      {
        path: "home",
        element: <LazyWrapper children={<HomePage />} />,
        handle: {
          crumb: () => "home",
        },
      },
      {
        path: "tasks",
        element: <LazyWrapper children={<TasksPageLazy />} />,
        handle: {
          crumb: () => "tasks",
        },
      },
      {
        path: "parking",
        element: <LazyWrapper children={<ParkingPageLazy />} />,
        handle: {
          crumb: () => "parking",
        },
      },
      {
        path: "",
        Component: HomePage,
        handle: {},
      },
    ],
  },
]);

// eslint-disable-next-line @typescript-eslint/ban-types
export type AppRouterProps = {};
// eslint-disable-next-line no-empty-pattern
export const AppRouter = ({}: AppRouterProps) => {
  return <RouterProvider router={router}></RouterProvider>;
};
