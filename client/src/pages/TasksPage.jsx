import { useEffect } from "react";
import { useTask } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTask();
  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <h1>No Tasks</h1>;

  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}
export default TasksPage;
