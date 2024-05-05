import { Outlet } from "react-router-dom";

export const WithRouterOutlet = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};
