import classNames from "classnames";
import { useState } from "react";

export type TaskSchedulerProps = {
  className?: string;
};
export const TaskScheduler = ({ className }: TaskSchedulerProps) => {
  const [triggerType, setTriggerType] = useState("");
  const [schedule, setSchedule] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [recurrence, setRecurrence] = useState("");

  const handleTriggerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTriggerType(e.target.value);
  };

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchedule(e.target.value);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleRecurrenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecurrence(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!triggerType || !schedule || !startTime || !endTime || !recurrence) {
      alert("Please fill in all fields");
      return;
    }
    alert(
      `Trigger Type: ${triggerType}, Schedule: ${schedule}, Start Time: ${startTime}, End Time: ${endTime}, Recurrence: ${recurrence}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames("space-y-4", className)}
    >
      <div>
        <label className="block">
          Trigger Type:
          <select
            value={triggerType}
            onChange={handleTriggerChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-md p-1 text-black bg-white hover:bg-gray-100"
          >
            <option
              className="bg-primary-400 p-1 hover:bg-primary-600 hover:text-white"
              value=""
            >
              Select...
            </option>
            <option
              className="bg-primary-400 p-1 hover:bg-primary-600 hover:text-white"
              value="daily"
            >
              Daily
            </option>
            <option
              className="bg-primary-400 p-1 hover:bg-primary-600 hover:text-white"
              value="weekly"
            >
              Weekly
            </option>
            <option
              className="bg-primary-400 p-1 hover:bg-primary-600 hover:text-white"
              value="monthly"
            >
              Monthly
            </option>
          </select>
        </label>
      </div>
      <div>
        <label className="block">
          Schedule:
          <input
            type="text"
            value={schedule}
            onChange={handleScheduleChange}
            placeholder="Enter schedule..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-1 text-black bg-white hover:bg-gray-100"
          />
        </label>
      </div>
      <div>
        <label className="block">
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={handleStartTimeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-1 text-black bg-white hover:bg-gray-100"
          />
        </label>
      </div>
      <div>
        <label className="block">
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={handleEndTimeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-1 text-black bg-white hover:bg-gray-100"
          />
        </label>
      </div>
      <div>
        <label className="block">
          Recurrence:
          <input
            type="number"
            value={recurrence}
            onChange={handleRecurrenceChange}
            placeholder="Enter recurrence..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-1 text-black bg-white hover:bg-gray-100"
          />
        </label>
      </div>
      <div>
        <input
          type="submit"
          value="Add Trigger"
          className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        />
      </div>
    </form>
  );
};
