import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth.js";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = handleSubmit(async (values) => {
    const res = await registerRequest(values);
    console.log(res);
  });
  
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
          autoComplete="username"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
          autoComplete="email"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 my-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
