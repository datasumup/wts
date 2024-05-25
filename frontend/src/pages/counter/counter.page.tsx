import { useValetCounter, useValetCounterQuery } from "@@services/parking";
import * as Switch from "@radix-ui/react-switch";
import { HomeIcon, ParkingCircleIcon } from "lucide-react";
import { updateParkingAvailabilityAsync } from "@@services/parking";
import { NavLink } from "react-router-dom";
import { SecureAccess } from "@@elements/secure";

// eslint-disable-next-line @typescript-eslint/ban-types
export type CounterPageProps = {};
// eslint-disable-next-line no-empty-pattern
export const CounterPage: React.FC = ({}: CounterPageProps) => {
  const valetCounterQuery = useValetCounterQuery();
  const [valetCounter] = useValetCounter();

  return (
    <div className="h-full w-full flex flex-col items-center p-2">
      <div className="w-72">
        <NavLink
          to={"/home"}
          className="text-blue-300 flex justify-start items-center underline mb-8 hover:text-green-400 cursor-pointer"
        >
          <HomeIcon className="h-6 w-6 mr-2" /> Home
        </NavLink>
      </div>
      {!valetCounter ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-2xl font-semibold text-slate-300">
            Loading...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 text-slate-300">
          <div className="text-2xl font-semibold col-span-2 flex justify-start items-center my-4">
            <ParkingCircleIcon className="h-7 w-7 mr-2" />{" "}
            {valetCounter?.CounterName}
          </div>
          <div className="border p-1">GroupName</div>{" "}
          <div className="border p-1">{valetCounter?.GroupName}</div>
          <div className="border p-1">CounterValue</div>{" "}
          <div className="border p-1">{valetCounter?.CounterValue}</div>
          <div className="border p-1">CounterOccupied</div>{" "}
          <div className="border p-1">{valetCounter?.CounterOccupied}</div>
          <div className="border p-1">CounterMaximum</div>{" "}
          <div className="border p-1">{valetCounter?.CounterMaximum}</div>
          <div className="border p-1">DisplayThreshold</div>{" "}
          <div className="border p-1">{valetCounter?.DisplayThreshold}</div>
          <div className="border p-1">MediumThreshold</div>{" "}
          <div className="border p-1">{valetCounter?.MediumThreshold}</div>
          <div className="border p-1">HighThreshold</div>{" "}
          <div className="border p-1">{valetCounter?.HighThreshold}</div>
          <SecureAccess
            roles={["CCAA.Custom.Owner", "CCAA.Custom.ValetParking.Manger"]}
          >
            <div className="flex items-center justify-start col-span-2 mt-4 ">
              <label
                className="text-white text-[15px] leading-none pr-[15px] text-xl font-semibold"
                htmlFor="valet-availability"
              >
                Available
              </label>
              <Switch.Root
                className="w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-black focus:shadow-[0_0_0_2px] focus:shadow-black bg-red-500 data-[state=checked]:bg-green-500 outline-none cursor-default"
                id="valet-availability"
                style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                defaultChecked={valetCounter?.CounterValue === 1}
                onCheckedChange={(checked) => {
                  updateParkingAvailabilityAsync(checked).then(() => {
                    valetCounterQuery.refetch();
                  });
                }}
              >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
            </div>
          </SecureAccess>
        </div>
      )}
    </div>
  );
};

export default CounterPage;
