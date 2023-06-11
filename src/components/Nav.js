import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
export default function Nav() {
  return (
    <div className="topnav">
      <NavLink to="/" exact="true">
        Home
      </NavLink>
      <NavLink to="/create">Create</NavLink>
      <NavLink to="/index">Index</NavLink>
    </div>
  );
}
