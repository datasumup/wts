export type RequestQueue = {
  id: string;
  taskId: string;
  operation: string;
  payload: string;
  createdOn: number;
  completedOn?: number;
  message?: string;
};
