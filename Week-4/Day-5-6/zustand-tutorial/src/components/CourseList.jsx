import useStore from "../store";

export default function CourseList() {
  const courses = useStore((state) => state.courses);
  const toggleCourse = useStore((state) => state.toggleCourseStatus);
  const removeCourse = useStore((state) => state.removeCourse);

  console.log(courses);

  return (
    <ul>
      {courses.map((course) => (
        <>
          <li
            style={{ background: course.completed ? "#01ff0044" : "white" }}
            className={`course-item`}
            key={course.id}
          >
            <span className="course-item-col0">
              <input
                type="checkbox"
                checked={course.completed}
                onChange={(e) => toggleCourse(course.id)}
              />
            </span>
            <span style={{ color: "black" }}>{course.title}</span>
            <button
              className="delete btn"
              onClick={() => removeCourse(course.id)}
            >
              Delete
            </button>
          </li>
        </>
      ))}
    </ul>
  );
}
