import "./StudentList.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export const StudentList = ({ students }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="student-list-container">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Gender</th>
              <th>Attendance</th>
              <th>Marks</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                onClick={() => navigate(`/students/${student._id}`)}
                className="table-row"
              >
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
                <td>{student.gender}</td>
                <td>{student.attendance}</td>
                <td>{student.marks}</td>
                <td>{student.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
