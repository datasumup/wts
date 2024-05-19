import { SecureAccess } from "@@elements/secure";
import { CircleCheckBigIcon, ParkingCircleIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-types
export type HomePageProps = {};
// eslint-disable-next-line no-empty-pattern
export const HomePage: React.FC = ({}: HomePageProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex justify-center items-center space-x-4">
        <SecureAccess
          roles={["CCAA.Custom.Owner", "CCAA.Custom.ValetParking.Manger"]}
        >
          <NavLink
            to={"/parking"}
            className="h-64 w-64 bg-slate-900 flex flex-col items-center justify-center rounded-md shadow-black text-white hover:text-green-500 cursor-pointer "
          >
            <ParkingCircleIcon className="h-24 w-24  mx-auto" />
            <span className="text-center text-2xl">Valet Parking</span>
          </NavLink>
        </SecureAccess>
        <SecureAccess roles={["CCAA.Custom.Owner", "CCAA.Custom.Job.Restart"]}>
          <NavLink
            to={"/tasks"}
            className="h-64 w-64 bg-slate-900 flex flex-col items-center justify-center rounded-md shadow-black text-white hover:text-green-500 cursor-pointer"
          >
            <CircleCheckBigIcon className="h-24 w-24 mx-auto" />
            <span className="text-center text-2xl">Task Management</span>
          </NavLink>
        </SecureAccess>
      </div>
    </div>
  );
};

export default HomePage;
