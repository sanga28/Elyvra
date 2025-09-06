import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // ✅ Load user from localStorage and listen for updates
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("elyvraUser"));
    if (storedUser) setUser(storedUser);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("elyvraUser"));
      setUser(updatedUser);
    };

    const loadUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("elyvraUser"));
      setUser(storedUser);
    };

    window.addEventListener("storage", loadUser);

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Logout (clear localStorage + trigger update)
  const handleLogout = () => {
    localStorage.removeItem("elyvraUser");
    setUser(null);
    window.dispatchEvent(new Event("storage")); // 🔑 notify other components
    alert("👋 Logged out successfully");
    navigate("/signup"); // redirect to signup
  };

  return (
    <nav className="navbar">
      <img src="/assets/logo.png" alt="Elyvra Logo" className="logo" />

      {/* Hamburger button (mobile only) */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/therapy" onClick={() => setMenuOpen(false)}>
            Therapy
          </NavLink>
        </li>
        <li>
          <NavLink to="/community" onClick={() => setMenuOpen(false)}>
            Community
          </NavLink>
        </li>

        {user ? (
          <li>
            <button onClick={handleLogout} className="nav-logout-btn">
              Logout
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/signup" onClick={() => setMenuOpen(false)}>
              Signup
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
