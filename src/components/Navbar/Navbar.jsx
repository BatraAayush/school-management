import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <h2>
        <NavLink to="/">School Management System</NavLink>
      </h2>

      <ul className="nav-pills">
        <li>
          <NavLink to="/">Students</NavLink>
        </li>
        <li>
          <NavLink to="/teachers">Teachers</NavLink>
        </li>
        <li>
          <NavLink to="classes">Classes</NavLink>
        </li>
        <li>
          <NavLink to="/schools">Schools</NavLink>
        </li>
      </ul>
    </nav>
  );
};
