import React, { useState } from "react";
import "../styles.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    // ✅ Save user data to localStorage
    const users = JSON.parse(localStorage.getItem("elyvra_users")) || [];
    const userExists = users.find((u) => u.email === formData.email);

    if (userExists) {
      alert("⚠️ User already exists! Please log in instead.");
      return;
    }

    users.push({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("elyvra_users", JSON.stringify(users));

    alert("✅ Signup successful! You can now log in.");
    window.location.href = "/login"; // redirect to login
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create Your Account ✨</h2>
        <p>Join Elyvra and start your wellness journey</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
