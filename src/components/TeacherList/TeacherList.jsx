import "./TeacherList.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export const TeacherList = ({ teachers }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="teacher-list-container">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr
                key={teacher._id}
                onClick={() => navigate(`/teachers/${teacher._id}`)}
                className="table-row"
              >
                <td>{teacher.name}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
