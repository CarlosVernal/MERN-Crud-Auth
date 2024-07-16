import { useForm } from "react-hook-form";
import { useTask } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

//para formatear las fechas
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { tasks, createTask, getTask, updateTask } = useTask();
  const navigate = useNavigate();
  const params = useParams();
  //console.log(createTask);

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        //console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        const taskDate = dayjs(task.date).format("YYYY-MM-DD");
        setValue("date", taskDate);
      } else {
        // Establecer la fecha actual como valor predeterminado si no hay una tarea cargada
        const currentDate = dayjs().format("YYYY-MM-DD");
        setValue("date", currentDate);
      }
    }
    loadTask();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit((data) => {
    let dateValue = data.date ? dayjs.utc(data.date).format() : null;

    if (params.id) {
      updateTask(params.id, {
        ...data,
        date: dateValue,
      });
    } else {
      if (!dateValue) {
        dateValue = dayjs().format("YYYY-MM-DD");
      }
      createTask({
        ...data,
        date: dateValue,
      });
    }
    navigate("/tasks");
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className=" mx-auto p-8 rounded-lg shadow-lg bg-zinc-800 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-white">Task</h1>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          {...register("date")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Save
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage;
