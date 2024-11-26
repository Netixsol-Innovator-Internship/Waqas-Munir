import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

const courseStore = (set) => ({
  courses: [],
  addCourse: (course) => {
    set((state) => ({
      courses: [course, ...state.courses],
    }));
  },
  removeCourse: (id) => {
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    }));
  },
  toggleCourseStatus: (id) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === id
          ? {
              ...course,
              completed: !course.completed,
            }
          : course
      ),
    }));
  },
});

const useStore = create(
  devtools(
    persist(courseStore, {
      name: "courses",
      courseStore,
    })
  )
);

export default useStore;
