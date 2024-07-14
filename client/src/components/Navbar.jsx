import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, signout } = useAuth();
  return (
    <nav className="bg-zinc-800 my-4 flex justify-between items-center py-4 px-8 rounded-xl shadow-lg">
      <Link to="/">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          Task Manager
        </h1>
      </Link>
      <ul className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <li className="capitalize text-white font-medium">
              welcome {user.username}
            </li>
            <li>
              <Link
                to="/tasks"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                My Tasks
              </Link>
            </li>
            <li className="capitalize">
              <Link
                to="/add-task"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Add new Task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => signout()}
                className="text-red-500 hover:text-red-300 transition duration-300"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
