import { useEffect, useState } from "react";
import { getUserAsync } from "./user.service";
import { useQuery } from "@tanstack/react-query";
import { User } from "@@models";

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserAsync,
    enabled: true,
    retry: false,
    refetchInterval: 60 * 1000,
  });
};

export type UsersHookProps = [User | undefined];
export function useUser(): UsersHookProps {
  const [user, setUser] = useState<User>();
  const { data } = useUserQuery();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return [user];
}
