import { useTodo } from "../context/TodoContext";
import DateComponent from "./DateComponent";

export default function Header() {
  const { todos } = useTodo();

  return (
    <header className="flex justify-between items-start max-xs:flex-col px-5 py-5 border-b-2 border-gray-300">
      <DateComponent />
      <div className="mt-1 max-xs:text-center max-xs:w-full">
        <p className="text-gray-500">
          <span className="font-bold">{todos && todos.length}</span> Tasks
        </p>
      </div>
    </header>
  );
}
