import "./TeacherDetail.css";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTeacherAsync } from "../../features/teachers/teacherSlice";

export const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teacher = useSelector((state) =>
    state.teachers.teachers.find((teacher) => teacher._id === id)
  );

  if (!teacher) {
    return <div>Teacher not found.</div>;
  }

  const handleDelete = (id) => {
    dispatch(deleteTeacherAsync(id));
    navigate("/teachers");
  };

  return (
    <div className="teacher-details-page">
      <h2>Teacher Detail</h2>

      <div>
        <div className="teacher-detail">
          <p>Name:</p>
          <p>{teacher.name}</p>
        </div>
        <div className="teacher-detail">
          <p>Age:</p>
          <p>{teacher.subject}</p>
        </div>
        <div className="teacher-detail">
          <p>Contact:</p>
          <p>{teacher.contact}</p>
        </div>

        <div className="buttons-container">
          <Link to={`/teachers/edit/${teacher._id}`} state={teacher}>
            <button className="primary-button">Edit Details</button>
          </Link>
          <button
            className="secondary-button"
            onClick={() => handleDelete(teacher._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
