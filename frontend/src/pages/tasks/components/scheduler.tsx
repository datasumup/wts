import { TaskTrigger } from "@@models";
import classNames from "classnames";
import { TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export type TaskSchedulerProps = {
  className?: string;
  addTrigger: (trigger: TaskTrigger) => Promise<any>;
};
export const TaskScheduler = ({
  addTrigger,
  className,
}: TaskSchedulerProps) => {
  const [trigger, setTrigger] = useState<Partial<TaskTrigger>>({});

  const updateTriggerValues = (
    key: keyof TaskTrigger,
    value: string | number | boolean
  ) => {
    setTrigger((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(trigger);
    addTrigger(trigger as TaskTrigger).then(() => {
      setTrigger({});
      toast.success("Trigger added successfully");
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames("space-y-4", className)}
    >
      <div>
        <label className="block">
          Start Date:
          <input
            type="date"
            value={trigger.StartDate}
            onChange={(e) => updateTriggerValues("StartDate", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-1 text-black bg-white hover:bg-gray-100"
          />
        </label>
      </div>
      <div>
        <label className="block">
          Start Time:
          <input
            type="time"
            value={trigger.StartTime}
            onChange={(e) => updateTriggerValues("StartTime", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-1 text-black bg-white hover:bg-gray-100"
          />
        </label>
      </div>
      {trigger.RunOnce ? null : (
        <div>
          <label className="block">
            Interval (HH:MM:SS):
            <div className="flex justify-start items-center space-x-1">
              <input
                type="number"
                min={0}
                max={23}
                value={trigger.IntervalHours}
                onChange={(e) =>
                  updateTriggerValues("IntervalHours", parseInt(e.target.value))
                }
                placeholder="HH"
                className="mt-1 block w-1/5 rounded-md border-gray-300 shadow-sm p-1 text-black bg-white hover:bg-gray-100"
              />
              <span>:</span>
              <input
                type="number"
                value={trigger.IntervalMinutes}
                min={0}
                max={59}
                onChange={(e) =>
                  updateTriggerValues(
                    "IntervalMinutes",
                    parseInt(e.target.value)
                  )
                }
                placeholder="MM"
                className="mt-1 block w-1/5 rounded-md border-gray-300 shadow-sm p-1 text-black bg-white hover:bg-gray-100"
              />
              <span>:</span>
              <input
                type="number"
                value={trigger.IntervalSeconds}
                min={0}
                max={59}
                onChange={(e) =>
                  updateTriggerValues(
                    "IntervalSeconds",
                    parseInt(e.target.value)
                  )
                }
                placeholder="SS"
                className="mt-1 block w-1/5 rounded-md border-gray-300 shadow-sm p-1 text-black bg-white hover:bg-gray-100"
              />
            </div>
          </label>
        </div>
      )}
      <div className="flex items-center justify-start space-x-1">
        <input
          type="checkbox"
          onChange={(e) => updateTriggerValues("RunOnce", e.target.checked)}
          className="mt-1 h-5 w-5 rounded"
          checked={trigger.RunOnce}
        />
        <label className="block">Run Once</label>
      </div>
      <div className="flex items-center justify-start space-x-1">
        <input
          type="checkbox"
          checked={trigger.RemoveExistingTriggers}
          onChange={(e) =>
            updateTriggerValues("RemoveExistingTriggers", e.target.checked)
          }
          className="mt-1 h-5 w-5 rounded"
        />
        <label className="block">Clear Existing Triggers</label>
      </div>
      {trigger.RemoveExistingTriggers ? (
        <div className="bg-orange-200 border-orange-700 border text-red-900 p-1 rounded flex items-center space-x-1">
          <TriangleAlertIcon className="h-4 w-4" />{" "}
          <span className="text-sm">
            All the existing triggers will be removed.
          </span>
        </div>
      ) : null}
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
