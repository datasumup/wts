import { useTasks } from "@@services/task";
import { Task } from "./components/task";

// eslint-disable-next-line @typescript-eslint/ban-types
export type TasksPageProps = {};
// eslint-disable-next-line no-empty-pattern
export const HomePage: React.FC = ({}: TasksPageProps) => {
  const [tasks] = useTasks();

  return (
    <div className="h-full w-full flex flex-col items-center p-2">
      <h1 className="text-4xl font-extrabold text-yellow-500">
        Windows Task Management
      </h1>
      {tasks.map((task) => (
        <Task task={task} key={task.Id} />
      ))}
    </div>
  );
};

export default HomePage;
