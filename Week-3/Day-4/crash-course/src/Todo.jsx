import React from "react";

export default function Todo({ todo, onToggle }) {
  return (
    <div>
      <label htmlFor={todo.id}>
        <input
          id={todo.id}
          type="checkbox"
          checked={todo.complete}
          //   Toggling the complete property of the todo
          onChange={() => onToggle(todo.id)}
        />
        {todo.name}
      </label>
    </div>
  );
}
