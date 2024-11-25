/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function Button({ text, className, onClick }) {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 0.95 }}
      className={`bg-primary py-2 px-5 rounded-lg text-white font-semibold text-sm leading-6 ${className}`}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
}
