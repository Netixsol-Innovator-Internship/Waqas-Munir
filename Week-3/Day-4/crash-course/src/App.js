import { useState, useRef, useEffect } from "react";
import { v4 } from "uuid";

import TodoList from "./TodoList";

export default function App() {
  // Creating a state, initializing it with getting data from local storage if there is any, otherwise initialize it as empty array
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  // creating ref for getting input value
  const todoRef = useRef();

  // Updating items from in local storage whenever todos is updated
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Updating individual todo items
  function toggleTodo(id) {
    const newTodos = [...todos]; // creating a copy of state
    const todo = newTodos.find((todo) => todo.id === id); // finding the todo with id passing in the parameter
    todo.complete = !todo.complete; // toggling complete property
    setTodos(newTodos); // setting todos to the updated items
  }

  function handleAddTodo(event) {
    const name = todoRef.current.value; //getting value of the input
    if (name.trim() === "") return; // if name is empty, then just return it

    // adding new todo at the front of array, then spreading all the previous todo items
    setTodos((prev) => {
      return [{ id: v4(), name: name, complete: false }, ...todos];
    });

    // Setting the input null
    todoRef.current.value = null;
  }

  // clearing all the completed todos from the state
  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} onToggle={toggleTodo} />
      <input ref={todoRef} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todo</button>
      {/* Showing count of un-completed todos */}
      <div>{todos.filter((todo) => !todo.complete).length} left todo</div>
    </>
  );
}
