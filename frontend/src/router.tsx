import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EmptyLayout } from "@@layouts/empty";
import { ErrorPage } from "@@pages/error";
import { lazy } from "react";
import { LazyWrapper } from "@@elements/lazy";

export type Breadcrumb = {
  title: string;
  url: string;
};

const TasksPageLazy = lazy(() => import("./pages/tasks/tasks.page"));

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
        element: <LazyWrapper children={<TasksPageLazy />} />,
        handle: {
          crumb: () => "home",
        },
      },
      {
        path: "",
        Component: TasksPageLazy,
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
