export type RequestQueueMessage = {
  Id: string;
  TaskId: string;
  Operation: "ExecuteNow" | "UpdateTaskSchedule";
  Payload: string;
  CreatedOn: number;
  CompletedOn: number | null;
  Message: string | null;
};
