import { configureStore } from "@reduxjs/toolkit";
import { studentsSlice } from "./features/students/studentsSlice";
import { teachersSlice } from "./features/teachers/teacherSlice";

export default configureStore({
  reducer: {
    students: studentsSlice.reducer,
    teachers: teachersSlice.reducer,
  },
});
