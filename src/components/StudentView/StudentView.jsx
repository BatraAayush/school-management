import "./StudentView.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../features/students/studentsSlice";
import { StudentList } from "../StudentList/StudentList";
import { Link } from "react-router-dom";

export const StudentView = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  return (
    <div className="students-view">
      <h2>Student View</h2>

      <Link to={`/students/add`}>
        <button className="primary-button">Add student</button>
      </Link>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <StudentList students={students} />
    </div>
  );
};
