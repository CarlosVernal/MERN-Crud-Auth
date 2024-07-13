import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/tasks.js";
<context />;
export const TasksContext = createContext();

export const UseTask = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data)
    } catch (error) {
      console.error(error);
    }
    //console.log(res)
  };

  return (
    <TasksContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
