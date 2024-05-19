import { useEffect, useState } from "react";
import axios from "axios";
import { useUserQuery } from "@@services/user";
import { LogInIcon } from "lucide-react";
export type LogoutPageProps = {
  className?: string;
};
export const LogoutPage = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const userQuery = useUserQuery();
  useEffect(() => {
    axios.get("/auth/logout").then(() => {
      setLoggedOut(true);
      userQuery.refetch();
    });
  }, []);
  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center">
      {loggedOut ? (
        <>
          <div className="text-2xl font-semibold my-8 text-slate-300">
            Logged out
          </div>
          <a
            href={"/auth/login"}
            className="text-blue-300 space-x-1  text-md px-4 p-1 rounded border border-slate-900  bg-slate-800 font-semibold flex justify-start items-center hover:text-green-400 cursor-pointer"
          >
            Login <LogInIcon className="ml-2 h-6 w-6" />
          </a>
        </>
      ) : (
        <div className="text-white text-2xl">Logging out...</div>
      )}
    </div>
  );
};

export default LogoutPage;
