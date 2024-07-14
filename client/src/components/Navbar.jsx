import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import react, { useState } from "react";

function Navbar() {
  const { isAuthenticated, user, signout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-zinc-800 my-4 flex flex-col lg:flex-row lg:justify-between items-center py-4 px-8 rounded-xl shadow-lg">
      <div className="flex justify-between w-full lg:w-auto">
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Task Manager
          </h1>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none lg:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <ul
        className={`lg:flex lg:items-center lg:space-x-4 w-full lg:w-auto ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >
        {isAuthenticated ? (
          <>
            <li className="capitalize text-white font-medium py-2 px-4 lg:py-0 lg:px-0">
              welcome {user.username}
            </li>
            <li className="py-2 px-4 lg:py-0 lg:px-0">
              <Link
                to="/tasks"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                My Tasks
              </Link>
            </li>
            <li className="capitalize py-2 px-4 lg:py-0 lg:px-0">
              <Link
                to="/add-task"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Add new Task
              </Link>
            </li>
            <li className="py-2 px-4 lg:py-0 lg:px-0">
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
            <li className="py-2 px-4 lg:py-0 lg:px-0">
              <Link
                to="/login"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li className="py-2 px-4 lg:py-0 lg:px-0">
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
