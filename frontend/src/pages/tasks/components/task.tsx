import { Dialog } from "@@elements/dialog";
import { WindowsTask } from "@@models";
import classNames from "classnames";
import { Clock10Icon, HistoryIcon, PlayIcon } from "lucide-react";
import { TaskScheduler } from "./scheduler";
import { useState } from "react";
import { Loader } from "@@elements/loader";
import { addMessageToQueueAsync, useQueueItemsById } from "@@services/queue";
import { v4 as uuidv4 } from "uuid";

export type TaskProps = {
  className?: string;
  task: WindowsTask;
};
export const Task = ({ task, className }: TaskProps) => {
  const [wip, setWip] = useState(false);
  const [queueItems] = useQueueItemsById(task.Id);

  const runNow = () => {
    setWip(true);
    addMessageToQueueAsync({
      TaskId: task.Id,
      Operation: "ExecuteNow",
      Payload: "{}",
      CreatedOn: Date.now(),
      Id: uuidv4(),
      CompletedOn: null,
      Message: null,
    }).finally(() => setWip(false));
  };
  return (
    <div
      className={classNames(
        "flex flex-col bg-slate-900 w-full p-4 max-w-2xl mt-4 rounded-lg shadow-md space-y-2",
        className
      )}
    >
      <div className="text-secondary-300 font-bold text-xl">{task.Name}</div>
      <div className="bg-blue-900 text-blue-300 w-fit px-4 py-1 rounded">
        {task.Status}
      </div>
      <div className="bg-slate-800 text-white p-2 rounded">
        {task.Description}
      </div>
      <div className="text-white">{task.Trigger?.split(",")?.join("\n")}</div>
      <div className="flex justify-end space-x-2">
        {wip ? <Loader /> : null}{" "}
        <Dialog
          trigger={
            <button
              className="bg-blue-600 text-white h-8 space-x-2 px-2 rounded flex justify-center items-center disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={wip}
            >
              <HistoryIcon className="h-4 w-4" /> History
            </button>
          }
        >
          <table>
            <thead>
              <tr className="rounded my-1 bg-secondary-600">
                <th className="text-left px-1">Operation</th>
                <th className="text-left px-1">Created On</th>
                <th className="text-left px-1">Completed On</th>
                <th className="text-left px-1">Message</th>
              </tr>
            </thead>
            <tbody>
              {queueItems.map((item) => (
                <tr key={item.Id} className="p-2 bg-slate-800 rounded my-1">
                  <td className="text-left px-1">{item.Operation}</td>
                  <td className="text-left px-1">
                    {new Date(item.CreatedOn).toLocaleString()}
                  </td>
                  <td className="text-left px-1">
                    {item.CompletedOn
                      ? new Date(item.CompletedOn * 1000).toLocaleString()
                      : null}
                  </td>
                  <td className="text-left px-1">{item.Message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Dialog>
        <Dialog
          trigger={
            <button
              className="bg-orange-600 text-white h-8 space-x-2 px-2 rounded flex justify-center items-center disabled:bg-orange-400 disabled:cursor-not-allowed"
              disabled={wip}
            >
              <Clock10Icon className="h-4 w-4" /> Schedule
            </button>
          }
        >
          <TaskScheduler className="min-w-72" />
        </Dialog>
        <button
          className="bg-green-500 text-white h-8 space-x-2 px-2 rounded flex justify-center items-center disabled:bg-green-400 disabled:cursor-not-allowed"
          disabled={wip}
          onClick={runNow}
        >
          <PlayIcon className="h-4-w-4" /> Run Now
        </button>
      </div>
    </div>
  );
};
