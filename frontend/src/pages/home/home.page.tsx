import { useTasks } from "@@services/task";

// eslint-disable-next-line @typescript-eslint/ban-types
export type HomePageProps = {};
// eslint-disable-next-line no-empty-pattern
export const HomePage: React.FC = ({}: HomePageProps) => {
  const [tasks] = useTasks();

  return (
    <div className="h-full w-full flex flex-col items-center p-2">
      <h1 className="text-4xl font-extrabold text-yellow-500">
        Windows Task Management
      </h1>
      {tasks.map((task) => (
        <div
          className="flex flex-col bg-slate-900 w-full p-4 max-w-2xl mt-4 rounded-lg shadow-md space-y-2"
          key={task.Id}
        >
          <div className="text-secondary-300 font-bold text-xl">
            {task.Name}
          </div>
          <div className="bg-blue-900 text-blue-300 w-fit px-4 py-1 rounded">
            {task.Status}
          </div>
          <div className="bg-slate-800 text-white p-2 rounded">
            {task.Description}
          </div>
          <div className="text-white">{task.Trigger}</div>
          <div className="flex justify-end space-x-2">
            <button className="bg-orange-600 text-white p-2 rounded">
              Schedule
            </button>
            <button className="bg-green-500 text-white p-2 rounded">
              Run Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
