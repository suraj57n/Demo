import React from "react";
import { Link } from "react-router-dom";
import './App.css'
function Navbar() {
  return (
    <nav>
      <ul>
      <li>
          <Link to="/maps">PLANNER</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
