import { Outlet } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyLayoutProps = {};
// eslint-disable-next-line no-empty-pattern
export const EmptyLayout = ({}: EmptyLayoutProps) => {
  return (
    <div className="w-full h-screen p-2">
      <Outlet />
    </div>
  );
};
