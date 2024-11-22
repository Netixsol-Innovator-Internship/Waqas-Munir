import { useTodo } from "../context/TodoContext";
import Spinner from "./Spinner";
import Todo from "./Todo";

export default function TodoList() {
  const { todos, isLoading } = useTodo();

  return (
    <div className="px-5 py-5 max-h-80 overflow-y-auto">
      {todos?.length > 0 ? (
        todos.map((todo) => <Todo key={todo._id} todo={todo} />)
      ) : (
        <div className="flex justify-center items-center py-4 text-gray-500 font-semibold ">
          {isLoading ? (
            <Spinner className="border-primary" />
          ) : (
            <p>No Todos Found</p>
          )}
        </div>
      )}
    </div>
  );
}
