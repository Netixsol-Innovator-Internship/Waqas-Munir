/* eslint-disable react/prop-types */
export default function Spinner({ className }) {
  return (
    <div
      className={`w-5 h-5 border-4 ${className} border-t-transparent rounded-full animate-spin`}
    ></div>
  );
}
