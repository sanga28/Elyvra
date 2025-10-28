import React, { useState } from "react";
import "../styles.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("elyvra_users")) || [];
    const foundUser = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (foundUser) {
      alert(`✅ Welcome back, ${foundUser.name}!`);
      localStorage.setItem("elyvra_loggedin_user", JSON.stringify(foundUser));
      window.location.href = "/"; // redirect to home/dashboard
    } else {
      alert("❌ Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue your wellness journey</p>
        <form onSubmit={handleSubmit} className="login-form">
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
