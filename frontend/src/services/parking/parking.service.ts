import { ValetCounter } from "@@models";
import axios from "axios";

export const getValetParkingCounterAsync = async () => {
  const response = await axios.get<ValetCounter>(`/api/parking/valet/counter`);
  return response.data;
};

export const updateParkingAvailabilityAsync = async (available: boolean) => {
  const response = await axios.put<boolean>(
    `/api/parking/valet/availability/${available ? 1 : 0}`
  );
  return response.data ?? false;
};
