/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdDeleteOutline } from "react-icons/md";
import { useTodo } from "../context/TodoContext";
import Spinner from "./Spinner";

export default function TodoDetails({ isOpen, closeModal, todo }) {
  const { deleteTodo, isLoading } = useTodo();

  const handleDeleteTodo = async () => {
    await deleteTodo(todo._id);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        {/* Modal Panel */}
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="md:w-2/5 w-[90%] transform bg-white p-6 shadow-xl transition-all">
              <div className="flex w-full justify-between items-center max-xs:flex-col">
                <div className="w-3/4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 break-words whitespace-normal">
                    {todo.title}
                  </h3>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded shadow max-xs:w-full flex justify-center items-center mt-4"
                  onClick={handleDeleteTodo}
                >
                  {isLoading ? (
                    <Spinner className="border-white" />
                  ) : (
                    <MdDeleteOutline size={24} />
                  )}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
