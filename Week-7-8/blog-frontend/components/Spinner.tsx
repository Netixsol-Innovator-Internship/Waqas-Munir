export default function Spinner() {
  return (
    <div className="w-full py-16 flex justify-center items-center">
      <div className="w-12 h-12 border-2 animate-spin rounded-full border-t-0 border-darkBg dark:border-gray-200" />
    </div>
  );
}
