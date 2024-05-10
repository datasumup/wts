import { CircleCheckBigIcon, ParkingCircleIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-types
export type HomePageProps = {};
// eslint-disable-next-line no-empty-pattern
export const HomePage: React.FC = ({}: HomePageProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        <NavLink
          to={"/parking"}
          className="h-64 w-64 bg-slate-900 flex flex-col items-center justify-center rounded-md shadow-black text-white hover:text-green-500 cursor-pointer "
        >
          <ParkingCircleIcon className="h-24 w-24  mx-auto" />
          <span className="text-center text-2xl">Valet Parking</span>
        </NavLink>
        <NavLink
          to={"/tasks"}
          className="h-64 w-64 bg-slate-900 flex flex-col items-center justify-center rounded-md shadow-black text-white hover:text-green-500 cursor-pointer"
        >
          <CircleCheckBigIcon className="h-24 w-24 mx-auto" />
          <span className="text-center text-2xl">Task Management</span>
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
