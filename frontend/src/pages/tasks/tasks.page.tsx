import { useTasks } from "@@services/task";
import { Task } from "./components/task";
import { NavLink } from "react-router-dom";
import { CircleCheckBigIcon, HomeIcon } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/ban-types
export type TasksPageProps = {};
// eslint-disable-next-line no-empty-pattern
export const HomePage: React.FC = ({}: TasksPageProps) => {
  const [tasks] = useTasks();

  return (
    <div className="h-full w-full flex flex-col items-center p-2">
      <div className="w-full lg:w-1/2 2xl:w-1/3 ">
        <div className="w-72">
          <NavLink
            to={"/home"}
            className="text-blue-300 flex justify-start items-center underline mb-8 hover:text-green-400 cursor-pointer"
          >
            <HomeIcon className="h-6 w-6 mr-2" /> Home
          </NavLink>
        </div>
        <div className="text-2xl font-semibold col-span-2 flex justify-start items-center my-4 text-slate-300">
          <CircleCheckBigIcon className="h-7 w-7 mr-2" /> Windows Task
          Management
        </div>
        {tasks.map((task) => (
          <Task task={task} key={task.Id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
