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

const HomePageLazy = lazy(() => import("./pages/home/home.page"));

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
        element: <LazyWrapper children={<HomePageLazy />} />,
        handle: {
          crumb: () => "home",
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
