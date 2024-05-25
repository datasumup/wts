import { useEffect, useState } from "react";
import { listManualUpdateCountersAsync } from "./counter.service";
import { useQuery } from "@tanstack/react-query";
import { ManualUpdateCounter } from "@@models";

export const useManaulUpdateCountersQuery = () => {
  return useQuery({
    queryKey: ["parking", "manual-counters"],
    queryFn: async () => {
      return listManualUpdateCountersAsync();
    },
    enabled: true,
    retry: false,
  });
};

export type UseValetCounterHookProps = [Array<ManualUpdateCounter>];
export function useManualUpdateCounters(): UseValetCounterHookProps {
  const [counters, setCounters] = useState<Array<ManualUpdateCounter>>([]);
  const { data } = useManaulUpdateCountersQuery();

  useEffect(() => {
    if (data) {
      setCounters(data);
    }
  }, [data]);

  return [counters];
}
