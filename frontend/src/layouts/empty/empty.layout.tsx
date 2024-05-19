import { useUser } from "@@services/user";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyLayoutProps = {};
// eslint-disable-next-line no-empty-pattern
export const EmptyLayout = ({}: EmptyLayoutProps) => {
  const [user] = useUser();
  return (
    <div className="w-full h-screen p-2">
      <div className="flex w-full justify-end">
        {user?.authenticated ? (
          <NavLink
            to={"/auth/logout"}
            title="Logout"
            className="text-md flex items-center space-x-1 px-4 bg-slate-800 font-semibold text-slate-300 p-1 rounded border border-slate-900 shadow"
          >
            {user?.name} <LogOutIcon className="ml-2 h-6 w-6" />
          </NavLink>
        ) : (
          <NavLink
            to={"/auth/login"}
            className="text-blue-300 space-x-1  text-md px-4 p-1 rounded border border-slate-900  bg-slate-800 font-semibold flex justify-start items-center hover:text-green-400 cursor-pointer"
          >
            Login <LogInIcon className="ml-2 h-6 w-6" />
          </NavLink>
        )}
      </div>
      <Outlet />
    </div>
  );
};
