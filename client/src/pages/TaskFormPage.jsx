import { useForm } from "react-hook-form";
import { UseTask } from "../context/TasksContext";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { tasks, createTask } = UseTask();
  //console.log(createTask);
  const onSubmit = handleSubmit((data) => {
    createTask(data);
  });
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className=" mx-auto p-8 rounded-lg shadow-lg bg-zinc-800 max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-white">Task</h1>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Save
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage;
