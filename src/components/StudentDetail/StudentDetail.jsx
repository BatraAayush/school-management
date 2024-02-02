import "./StudentDetail.css";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteStudentAsync } from "../../features/students/studentsSlice";

export const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector((state) =>
    state.students.students.find((student) => student._id === id)
  );

  if (!student) {
    return <div>Student not found.</div>;
  }

  const handleDelete = (id) => {
    dispatch(deleteStudentAsync(id));
    navigate("/");
  };

  return (
    <div className="student-details-page">
      <h2>Student Detail</h2>

      <div>
        <div className="student-detail">
          <p>Name:</p>
          <p>{student.name}</p>
        </div>
        <div className="student-detail">
          <p>Age:</p>
          <p>{student.age}</p>
        </div>
        <div className="student-detail">
          <p>Grade:</p>
          <p>{student.grade}</p>
        </div>
        <div className="student-detail">
          <p>Gender:</p>
          <p>{student.gender}</p>
        </div>
        <div className="student-detail">
          <p>Attendance:</p>
          <p>{student.attendance}%</p>
        </div>
        <div className="student-detail">
          <p>Marks:</p>
          <p>{student.marks}%</p>
        </div>
        <div className="student-detail">
          <p>Class:</p>
          <p>{student.class}</p>
        </div>

        <div className="buttons-container">
          <Link to={`/students/edit/${student._id}`} state={student}>
            <button className="primary-button">Edit Details</button>
          </Link>
          <button
            className="secondary-button"
            onClick={() => handleDelete(student._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
