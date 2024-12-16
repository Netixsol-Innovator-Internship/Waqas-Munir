import { FormEvent, useRef } from "react";

type InputProps = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  onAdd: (e: FormEvent) => void;
};

export default function Input({ todo, setTodo, onAdd }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        onAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a task"
        className="input__box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit">Go</button>
    </form>
  );
}
