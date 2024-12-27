"use client";

import { Category } from "@/app/(admin)/categories/page";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";

type CategoryTableProps = {
  categories: Category[];
  onUpdate: (category: Category) => void;
  onDelete: (id: string) => void;
};

export default function CategoryTable({
  categories,
  onUpdate,
  onDelete,
}: CategoryTableProps) {
  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleUpdate = (category: Category) => {
    onUpdate(category);
  };

  if (!categories || categories.length <= 0) return <p>No Categories found</p>;

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-darkSecondary p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Categories List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left border-b border-gray-300 dark:border-gray-600">
                <th className="max-sm:hidden block px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Id
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={category._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <td className="max-sm:hidden block px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 flex space-x-3">
                    <button
                      onClick={() => handleUpdate(category)}
                      className="bg-green-500 hover:bg-green-700 py-2 px-3 rounded-md text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded-md text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                      <MdDelete size={20} />
                    </button>
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
