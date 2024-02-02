import "./StudentForm.css";
import "../../App.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addStudentAsync,
  updateStudentAsync,
} from "../../features/students/studentsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { grades, classes, validateStudentInput } from "./utils";

export const StudentForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const student = state ? state : null;

  const [studentInput, setStudentInput] = useState({
    name: student ? student.name : "",
    age: student ? student.age : 0,
    grade: student ? student.grade : grades[0],
    gender: student ? student.gender : "Male",
    attendance: student ? student.attendance : 0,
    marks: student ? student.marks : 0,
    class: student ? student.class : classes[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = validateStudentInput(studentInput);

    if (isValidated) {
      setError("");

      if (student) {
        dispatch(
          updateStudentAsync({ id: student._id, updatedStudent: studentInput })
        );
        navigate(`/students/${student._id}`);
      } else {
        dispatch(addStudentAsync(studentInput));
        navigate("/");
      }
    } else {
      setError("Please fill all the required fields");
    }
  };

  return (
    <div className="student-form-container">
      <h2>{student ? "Edit Student" : "Add Student"}</h2>

      <form className="student-form">
        <label className="label">
          Name:
          <input
            placeholder="Enter Name"
            type="text"
            value={studentInput.name}
            onChange={(e) =>
              setStudentInput({ ...studentInput, name: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Age:
          <input
            placeholder="Age"
            type="number"
            min={0}
            value={studentInput.age}
            onChange={(e) =>
              setStudentInput({ ...studentInput, age: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Grade:
          <select
            onChange={(e) =>
              setStudentInput({ ...studentInput, grade: e.target.value })
            }
            value={studentInput.grade}
          >
            {grades.map((grade) => (
              <option value={grade} key={grade}>
                {grade}
              </option>
            ))}
          </select>
        </label>

        <div>
          <label className="label">
            Gender:
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={studentInput.gender === "Male"}
                onChange={(e) =>
                  setStudentInput({ ...studentInput, gender: e.target.value })
                }
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={studentInput.gender === "Female"}
                onChange={(e) =>
                  setStudentInput({ ...studentInput, gender: e.target.value })
                }
              />
              Female
            </label>
          </label>
        </div>

        <label className="label">
          Attendance:
          <input
            placeholder="Attendance"
            name="attendance"
            type="number"
            min={0}
            value={studentInput.attendance}
            onChange={(e) =>
              setStudentInput({
                ...studentInput,
                attendance: e.target.value,
              })
            }
            required
          />
        </label>

        <label className="label">
          Marks:
          <input
            placeholder="Marks"
            name="marks"
            type="number"
            max={100}
            value={studentInput.marks}
            onChange={(e) =>
              setStudentInput({ ...studentInput, marks: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Class:
          <select
            onChange={(e) =>
              setStudentInput({ ...studentInput, class: e.target.value })
            }
            value={studentInput.class}
          >
            {classes.map((standard) => (
              <option value={standard} key={standard}>
                {standard}
              </option>
            ))}
          </select>
        </label>

        {error && <small className="error">{error}</small>}

        <button className="student-add-button" onClick={handleSubmit}>
          {student ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
