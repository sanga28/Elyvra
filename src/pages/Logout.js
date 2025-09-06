import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // ✅ use AuthContext
import "../styles.css";

function Logout() {
  const { logout } = useAuth();   // ✅ logout comes from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();   // ✅ uses context method
      alert("👋 You have been logged out successfully.");
      navigate("/login");  // ✅ use navigate instead of window.location.href
    } catch (err) {
      console.error("Logout error:", err.message);
      alert("❌ Logout failed: " + err.message);
    }
  };

  return (
    <div className="logout-page">
      <div className="logout-container">
        <h2>Ready to Leave? 👋</h2>
        <p>We’ll miss you! Come back soon for more wellness support.</p>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
