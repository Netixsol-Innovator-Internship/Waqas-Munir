"use client";

import { useState } from "react";
import Link from "next/link";
import NavActions from "./NavActions";
import NavLinks from "./NavLinks";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-white dark:bg-darkPrimary text-black dark:text-white px-16 max-sm:px-4 py-4 max-xs:px-2 flex justify-between items-center">
      <div>
        <Link href="/" className="font-logo font-thin text-2xl cursor-pointer">
          Meta <span className="font-semibold">Blog</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-4">
            <NavLinks />
          </ul>
        </nav>
      </div>
      <div className="hidden sm:block">
        <NavActions />
      </div>
      <button
        className="block sm:hidden p-2 rounded-md cursor-pointer"
        onClick={toggleSidebar}
      >
        <span className="block w-6 h-0.5 bg-black dark:bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-black dark:bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
      </button>

      {/* Sidebar with overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.div>

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full bg-white dark:bg-darkPrimary shadow-lg z-50 p-4"
              style={{ width: "250px" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Close (Cross) Icon */}
              <div className="flex justify-end">
                <button
                  className="text-black dark:text-white p-2"
                  onClick={toggleSidebar}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <ul
                  className="flex flex-col gap-4 w-auto"
                  onClick={toggleSidebar}
                >
                  <NavLinks />
                </ul>
                {/* Action button inside the sidebar */}
                <div>
                  <NavActions />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
