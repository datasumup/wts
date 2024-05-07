export type RequestQueueMessage = {
  Id: string;
  TaskId: string;
  Operation: "ExecuteNow" | "Schedule";
  Payload: string;
  CreatedOn: number;
  CompletedOn: number | null;
  Message: string | null;
};

export type TaskTrigger = {
  StartDate: string;
  StartTime: string;
  IntervalHours?: number;
  IntervalMinutes?: number;
  IntervalSeconds?: number;
  RemoveExistingTriggers?: boolean;
  RunOnce?: boolean;
};
