import { useState } from "react";
import TodoModal from "./TodoModal";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <TodoModal isOpen={isOpen} closeModal={handleModalClose} />
      <div className="flex py-6 justify-center items-center relative">
        <button
          onClick={handleModalOpen}
          className="text-4xl absolute bg-primary text-white w-12 h-12 rounded-full top-1/2"
        >
          +{" "}
        </button>
      </div>
    </>
  );
}
