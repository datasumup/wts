import { useEffect, useState } from "react";
import { getValetParkingCounterAsync } from "./parking.service";
import { useQuery } from "@tanstack/react-query";
import { ValetCounter } from "@@models";

export const useValetCounterQuery = () => {
  return useQuery({
    queryKey: ["parking", "valet"],
    queryFn: async () => {
      return getValetParkingCounterAsync();
    },
    enabled: true,
    retry: false,
  });
};

export type UseValetCounterHookProps = [ValetCounter | undefined];
export function useValetCounter(): UseValetCounterHookProps {
  const [valetCounter, setValetCounter] = useState<ValetCounter>();
  const { data } = useValetCounterQuery();

  useEffect(() => {
    if (data) {
      setValetCounter(data);
    }
  }, [data]);

  return [valetCounter];
}
