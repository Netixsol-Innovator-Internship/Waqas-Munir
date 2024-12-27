"use client";

import { User } from "@/context/AuthContext";

type UserTableProps = {
  users: User[];
  onAction: (id: string, action: "blocked" | "unblocked") => void;
};

export default function UserTable({ users, onAction }: UserTableProps) {
  if (users.length === 0) {
    return <p className="text-center text-gray-500">No users available</p>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-darkSecondary p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Users List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left border-b border-gray-300 dark:border-gray-600">
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  #
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 capitalize">
                    {user.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                    {user.status === "blocked" ? (
                      <button
                        onClick={() => onAction(user._id, "unblocked")}
                        className="text-green-500 hover:underline"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => onAction(user._id, "blocked")}
                        className="text-red-500 hover:underline"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
