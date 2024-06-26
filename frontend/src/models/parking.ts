export type ValetCounter = {
  CounterId: number;
  CounterName?: string;
  GroupName?: string;
  CounterValue?: number;
  CounterOccupied: number;
  CounterMaximum?: number;
  DisplayThreshold?: number;
  MediumThreshold?: number;
  HighThreshold?: number;
};

export type ManualUpdateCounter = {
  CounterId: number;
  CounterName: string | null;
  GroupName: string | null;
  CounterValue: number;
  CounterMaximum: number;
  DisplayThreshold: number | null;
  MediumThreshold: number | null;
  HighThreshold: number | null;
  validTill: string; // example 2024-05-24T13:27:53.510000
};
