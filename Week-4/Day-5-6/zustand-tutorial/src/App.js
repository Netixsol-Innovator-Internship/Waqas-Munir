import "./App.css";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
export default function App() {
  return (
    <div className="main-container">
      <CourseForm />
      <CourseList />
    </div>
  );
}
