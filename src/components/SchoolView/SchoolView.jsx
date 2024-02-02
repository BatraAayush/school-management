import { useDispatch, useSelector } from "react-redux";
import "./SchoolView.css";
import { useEffect } from "react";
import { fetchStudents } from "../../features/students/studentsSlice";

export const SchoolView = () => {
  const students = useSelector((state) => state.students.students);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);
  const dispatch = useDispatch();

  const totalStudents = students.length;

  const averageAttendance =
    students.reduce((total, curr) => (total += curr.attendance), 0) /
    totalStudents;

  const averageMarks =
    students.reduce((total, curr) => (total += curr.marks), 0) / totalStudents;

  const topStudent = students.reduce(
    (topper, curr) => {
      if (curr.marks > topper.marks) {
        topper = {
          name: curr.name,
          marks: curr.marks,
        };
      }
      return topper;
    },
    { name: "", marks: 0 }
  );

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  return (
    <div className="school-view">
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {status !== "loading" && students && (
        <>
          <p>
            <strong>Total Students: </strong>
            {totalStudents}
          </p>
          <p>
            <strong>Average Attendance: </strong>
            {averageAttendance.toFixed(2)}
          </p>
          <p>
            <strong>Average Marks: </strong>
            {averageMarks.toFixed(2)}
          </p>
          <p>
            <strong>Top Student: </strong>
            {topStudent.name}
          </p>
        </>
      )}
    </div>
  );
};
