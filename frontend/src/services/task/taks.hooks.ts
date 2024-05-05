import { useEffect, useState } from "react";
import { listTasksAsync } from "./task.service";
import { useQuery } from "@tanstack/react-query";
import { WindowsTask } from "@@models";

export const useTasksQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: listTasksAsync,
    enabled: true,
    retry: false,
  });
};

export type UseTasksHookProps = [Array<WindowsTask>];
export function useTasks(): UseTasksHookProps {
  const [tasks, setTasks] = useState<Array<WindowsTask>>([]);
  const { data } = useTasksQuery();

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return [tasks];
}
