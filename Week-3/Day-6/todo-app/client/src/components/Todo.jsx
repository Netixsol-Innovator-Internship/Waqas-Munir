import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import TodoDetails from "./TodoDetails";

/* eslint-disable react/prop-types */
export default function Todo({ todo }) {
  const { isCompleted, title, _id } = todo;
  const { updateTodo } = useTodo();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <TodoDetails isOpen={isOpen} closeModal={handleCloseModal} todo={todo} />
      <div className="flex w-full justify-between items-center py-3">
        <div className="w-3/4">
          <p
            className={` ${
              isCompleted ? "text-gray-500 line-through" : "text-gray-700"
            } transition-all cursor-pointer break-words whitespace-normal capitalize`}
            onClick={handleOpenModal}
          >
            {title}
          </p>
        </div>
        <input
          onChange={() => updateTodo(_id)}
          type="checkbox"
          className="accent-primary h-4 w-4 rounded-full"
          checked={isCompleted}
        />
      </div>
    </>
  );
}
