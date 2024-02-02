import "./ClassView.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  setClassFilter,
  setGenderFilter,
  setSortBy,
} from "../../features/students/studentsSlice";
import { StudentList } from "../StudentList/StudentList";
import { classes, genders, sortOptions, applyFilters } from "./utils";

export const ClassView = () => {
  const dispatch = useDispatch();
  const { students, genderFilter, sortBy, classFilter, error, status } =
    useSelector((state) => state.students);

  const filteredStudents = applyFilters(
    students,
    classFilter,
    genderFilter,
    sortBy
  );

  const handleClassChange = (e) => dispatch(setClassFilter(e.target.value));

  const handleFilterChange = (e) => dispatch(setGenderFilter(e.target.value));

  const handleSortChange = (e) => dispatch(setSortBy(e.target.value));

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students.length]);

  return (
    <div className="class-view">
      <h2>Class View</h2>

      <div className="class-filters">
        <label>
          Class:
          <select id="class" onChange={handleClassChange}>
            {classes.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Gender:
          <select id="filter" onChange={handleFilterChange}>
            {genders.map((gender) => (
              <option value={gender} key={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by:
          <select id="sort" onChange={handleSortChange}>
            {sortOptions.map((sort) => (
              <option value={sort} key={sort}>
                {sort}
              </option>
            ))}
          </select>
        </label>
      </div>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <StudentList students={filteredStudents} />
    </div>
  );
};
