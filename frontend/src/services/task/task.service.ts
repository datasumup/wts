import { WindowsTask } from "@@models";
import axios from "axios";

export const listTasksAsync = async () => {
  const response = await axios.get<Array<WindowsTask>>(`/api/tasks/`);
  return response.data;
};
