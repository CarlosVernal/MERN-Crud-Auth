import { useForm } from "react-hook-form";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={handleSubmit((values) => console.log(values))}>
        <input
          type="text"
          {...register("Username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
          autoComplete="username"
        />
        <input
          type="email"
          {...register("Email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
          autoComplete="email"
        />
        <input
          type="password"
          {...register("Password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 my-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
