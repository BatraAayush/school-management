import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import {
  StudentView,
  StudentForm,
  StudentDetail,
  TeacherView,
  TeacherForm,
  TeacherDetail,
  ClassView,
  SchoolView,
} from "./components/index";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<StudentView />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/students/add" element={<StudentForm />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />
        <Route path="/teachers" element={<TeacherView />} />
        <Route path="/teachers/:id" element={<TeacherDetail />} />
        <Route path="/teachers/add" element={<TeacherForm />} />
        <Route path="/teachers/edit/:id" element={<TeacherForm />} />
        <Route path="/classes" element={<ClassView />} />
        <Route path="/schools" element={<SchoolView />} />
      </Routes>
    </div>
  );
}

export default App;
