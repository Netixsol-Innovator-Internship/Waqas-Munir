/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          transition={{ duration: 0.3 }}
        />
      )}

      <motion.div
        className="fixed top-0 right-0 max-w-[250px] w-full shadow-xl h-screen bg-primaryBg z-50"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-2 text-2xl text-white"
        >
          <IoClose />
        </button>
        <div className="px-6 mt-8 space-y-6">
          <p
            className="opacity-75 hover:opacity-100 transition-all"
            onClick={onClose}
          >
            <a href="#home">Home</a>
          </p>
          <p
            className="opacity-75 hover:opacity-100 transition-all"
            onClick={onClose}
          >
            <a href="#nft">NFT</a>
          </p>
          <p
            className="opacity-75 hover:opacity-100 transition-all"
            onClick={onClose}
          >
            <a href="#roadmap">Roadmap</a>
          </p>
          <p
            className="opacity-75 hover:opacity-100 transition-all"
            onClick={onClose}
          >
            <a href="#community">About Us</a>
          </p>
          <p
            className="opacity-75 hover:opacity-100 transition-all"
            onClick={onClose}
          >
            <a href="#collab">Pages</a>
          </p>
          <p
            className="opacity-75 hover:opacity-100 transition-all"
            onClick={onClose}
          >
            <a href="#newsletter">Contact Us</a>
          </p>
        </div>
      </motion.div>
    </>
  );
}
