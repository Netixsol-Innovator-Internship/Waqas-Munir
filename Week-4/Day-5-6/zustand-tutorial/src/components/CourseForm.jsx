import { useState } from "react";
import useStore from "../store";

export default function CourseForm() {
  const [title, setTitle] = useState("");
  const addCourse = useStore((state) => state.addCourse);

  const handleSubmit = () => {
    if (!title) return;
    addCourse({
      title,
      id: Math.floor(Math.random() * 100000000),
      completed: false,
    });
    setTitle("");
  };

  return (
    <div className="form-container">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
      />
      <button className="form-submit-btn" onClick={handleSubmit}>
        Add Course
      </button>
    </div>
  );
}
