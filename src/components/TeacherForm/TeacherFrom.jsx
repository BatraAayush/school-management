import "./TeacherForm.css";
import "../../App.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTeacherAsync,
  updateTeacherAsync,
} from "../../features/teachers/teacherSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { validateTeacherInput } from "./utils.js";

export const TeacherForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const teacher = state ? state : null;

  const [teacherInput, setTeacherInput] = useState({
    name: teacher ? teacher.name : "",
    subject: teacher ? teacher.subject : "",
    contact: teacher ? teacher.contact : 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = validateTeacherInput(teacherInput);

    if (isValidated) {
      setError("");

      if (teacher) {
        dispatch(
          updateTeacherAsync({ id: teacher._id, updatedTeacher: teacherInput })
        );
        navigate(`/teachers/${teacher._id}`);
      } else {
        dispatch(addTeacherAsync(teacherInput));
        navigate("/teachers");
      }
    } else {
      setError("Please fill all the required fields");
    }
  };

  return (
    <div className="teacher-form-container">
      <h2>{teacher ? "Edit Teacher" : "Add Teacher"}</h2>

      <form className="teacher-form">
        <label className="label">
          Name:
          <input
            placeholder="Enter Name"
            type="text"
            value={teacherInput.name}
            onChange={(e) =>
              setTeacherInput({ ...teacherInput, name: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Subject:
          <input
            placeholder="Enter Subject"
            type="text"
            value={teacherInput.subject}
            onChange={(e) =>
              setTeacherInput({ ...teacherInput, subject: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Contact:
          <input
            placeholder="Enter Contact No."
            name="contact"
            type="number"
            value={teacherInput.contact}
            onChange={(e) =>
              setTeacherInput({
                ...teacherInput,
                contact: e.target.value,
              })
            }
            required
          />
        </label>

        {error && <small className="error">{error}</small>}

        <button className="teacher-add-button" onClick={handleSubmit}>
          {teacher ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
