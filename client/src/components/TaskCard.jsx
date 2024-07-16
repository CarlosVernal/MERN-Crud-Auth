import { useTask } from "../context/TasksContext";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTask();
  return (
    <div className="bg-zinc-800 shadow-md rounded-lg p-6 hover:shadow-white hover:shadow-lg transition-shadow duration-300">
      <header className="flex justify-between">
        <h1 className="text-xl font-bold text-white mb-2">{task.title}</h1>
        <div className="flex gap-2 items-center">
          <button
            className=""
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            Delete
          </button>
          <Link to={`/task/${task._id}`} className="">
            Edit
          </Link>
        </div>
      </header>
      <p className="text-gray-300">{task.description}</p>
      <p className="text-gray-300">
        {dayjs(task.date).utc().format("DD/MM/YYYY")}
      </p>
    </div>
  );
}

export default TaskCard;
