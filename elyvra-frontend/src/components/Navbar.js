import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // ✅ icons for menu

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Elyvra</h1>

      {/* Hamburger button (mobile only) */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
        <li><NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink></li>
        <li><NavLink to="/therapy" onClick={() => setMenuOpen(false)}>Therapy</NavLink></li>
        <li><NavLink to="/community" onClick={() => setMenuOpen(false)}>Community</NavLink></li>
        <li><NavLink to="/signup" onClick={() => setMenuOpen(false)}>Signup</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
