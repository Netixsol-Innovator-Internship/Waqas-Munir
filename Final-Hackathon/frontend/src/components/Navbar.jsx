import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
    navigate("/");
  };

  return (
    <div className=" bg-gray-800 p-4 w-full shadow-md flex justify-center items-center">
      <nav className="w-full flex items-center justify-between md:max-w-3xl">
        <div className="text-white font-semibold text-xl">
          <Link to="/">SM</Link>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleSidebar}
            className="text-white p-2 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white hover:text-indigo-600">
                View Profile
              </Link>
              <Link to="/new" className="text-white hover:text-indigo-600">
                Create Post
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105 flex justify-center items-center"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105 flex justify-center items-center"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <motion.div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        initial={{ x: "100%" }}
        animate={{ x: isSidebarOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-64 h-full bg-gray-900 text-white p-5">
          <div className="text-2xl font-semibold mb-8">SM</div>
          <div className="space-y-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block text-white hover:text-indigo-600"
                  onClick={toggleSidebar}
                >
                  View Profile
                </Link>
                <Link
                  to="/new"
                  className="block text-white hover:text-indigo-600"
                  onClick={toggleSidebar}
                >
                  Create Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105 flex justify-center items-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105 flex justify-center items-center"
              >
                Login
              </Link>
            )}
          </div>
          <button
            className="absolute top-5 right-5 text-white"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
