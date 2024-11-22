import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, onToggle }) {
  // Mapping over todo array and rendering Todo Component for each todo
  return todos.map((todo) => (
    <Todo todo={todo} key={todo.id} onToggle={onToggle} />
  ));
}
