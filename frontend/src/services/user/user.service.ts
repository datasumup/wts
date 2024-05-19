import { User } from "@@models";
import axios from "axios";

export const getUserAsync = async () => {
  const response = await axios.get<User>(`/api/users/me`);
  if (response.status !== 200) {
    return { name: "anonymous", roles: [], authenticated: false };
  }
  return response.data;
};
