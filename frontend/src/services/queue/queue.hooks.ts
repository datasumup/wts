import { useEffect, useState } from "react";
import { listRequestQueueItemsByTaskIdAsync } from "./queue.service";
import { useQuery } from "@tanstack/react-query";
import { RequestQueueMessage } from "@@models";

export const useQueueItemsByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      return listRequestQueueItemsByTaskIdAsync(id);
    },
    enabled: true,
    retry: false,
  });
};

export type UseQueueItemsByIdHookProps = [Array<RequestQueueMessage>];
export function useQueueItemsById(id: string): UseQueueItemsByIdHookProps {
  const [queueItems, setQueueItems] = useState<Array<RequestQueueMessage>>([]);
  const { data } = useQueueItemsByIdQuery(id);

  useEffect(() => {
    if (data) {
      setQueueItems(data);
    }
  }, [data]);

  return [queueItems];
}
