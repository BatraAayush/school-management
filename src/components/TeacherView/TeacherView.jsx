import "./TeacherView.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../features/teachers/teacherSlice";
import { TeacherList } from "../TeacherList/TeacherList";
import { Link } from "react-router-dom";

export const TeacherView = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachers);
  const status = useSelector((state) => state.teachers.status);
  const error = useSelector((state) => state.teachers.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [dispatch, status]);

  return (
    <div className="teachers-view">
      <h2>Teacher View</h2>

      <Link to={`/teachers/add`}>
        <button className="primary-button">Add teacher</button>
      </Link>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <TeacherList teachers={teachers} />
    </div>
  );
};
