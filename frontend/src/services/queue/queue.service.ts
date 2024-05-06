import { RequestQueueMessage } from "@@models";
import axios from "axios";

export const addMessageToQueueAsync = async (data: RequestQueueMessage) => {
  const response = await axios.post(`/api/queue/`, data);
  return response.data;
};

export const listRequestQueueItemsByTaskIdAsync = async (taskId: string) => {
  const response = await axios.get<Array<RequestQueueMessage>>(
    `/api/queue/${taskId}`
  );
  return response.data ?? [];
};
