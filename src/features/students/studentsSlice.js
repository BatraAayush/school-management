import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils.js";

const initialState = {
  students: [],
  genderFilter: "All",
  sortBy: "Select",
  classFilter: "All",
  status: "idle",
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(`${BASE_URL}/students`);
    return response.data.students;
  }
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudentAsync",
  async (newStudent) => {
    const response = await axios.post(`${BASE_URL}/students`, newStudent);
    return response.data.student;
  }
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudentAsync",
  async ({ id, updatedStudent }) => {
    const response = await axios.put(
      `${BASE_URL}/students/${id}`,
      updatedStudent
    );
    return response.data.student;
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudentAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/students/${id}`);
    return response.data.student;
  }
);

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setGenderFilter: (state, action) => {
      state.genderFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setClassFilter: (state, action) => {
      state.classFilter = action.payload;
    },
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.status = "success";
      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.students.push(action.payload);
    },
    [addStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload;
      const index = state.students.findIndex(
        (s) => s._id === updatedStudent._id
      );

      if (index !== -1) {
        state.students[index] = updatedStudent;
      }
    },
    [updateStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const deletedStudent = action.payload;
      state.students = state.students.filter(
        (student) => student._id !== deletedStudent._id
      );
    },
    [deleteStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { setGenderFilter, setSortBy, setClassFilter } =
  studentsSlice.actions;

export default studentsSlice.reducer;
