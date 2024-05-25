import { ManualUpdateCounter } from "@@models";
import axios from "axios";

export const listManualUpdateCountersAsync = async () => {
  const response = await axios.get<Array<ManualUpdateCounter>>(
    `/api/parking/manual-update-counters`
  );
  return response.data;
};

export const updateManualUpdateCountersAsync = async (
  counters: Array<ManualUpdateCounter>
) => {
  const response = await axios.put<Array<ManualUpdateCounter>>(
    `/api/parking/manual-update-counters`,
    counters
  );
  return response.data;
};
