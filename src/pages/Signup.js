import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";   
import "../styles.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Save fake login in localStorage
  const loginUser = (user) => {
    localStorage.setItem("elyvraUser", JSON.stringify(user));
  };

  // 🚀 Fake Signup (no Firebase Auth yet)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const fakeUser = {
        uid: "fake-" + Date.now(),
        email: formData.email,
        displayName: formData.name,
      };

      // Save to Firestore
      await setDoc(doc(db, "users", fakeUser.email), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
      });

      // Save login locally
      // Save login locally
      loginUser(fakeUser);

      // ✅ Trigger storage event so Navbar updates immediately
      window.dispatchEvent(new Event("storage"));

      alert("🎉 Signup successful, welcome " + formData.name + "!");
      navigate("/");

    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Fake Google Signup
  const handleGoogleSignup = async () => {
    try {
      const fakeUser = {
        uid: "google-" + Date.now(),
        email: "user@gmail.com",
        displayName: "Google User",
      };

      await setDoc(doc(db, "users", fakeUser.email), {
        name: fakeUser.displayName,
        email: fakeUser.email,
        createdAt: new Date(),
      }, { merge: true });

      // Save login locally
      loginUser(fakeUser);

      // ✅ Trigger storage event so Navbar updates immediately
      window.dispatchEvent(new Event("storage"));


      alert("🎉 Google signup successful, welcome " + fakeUser.displayName + "!");
      navigate("/");
    } catch (err) {
      console.error("Google signup error:", err.message);
      setError(err.message);
    }
  };

  // 🚀 Fake GitHub Signup
  const handleGithubSignup = async () => {
    try {
      const fakeUser = {
        uid: "github-" + Date.now(),
        email: "user@github.com",
        displayName: "GitHub User",
      };

      await setDoc(doc(db, "users", fakeUser.email), {
        name: fakeUser.displayName,
        email: fakeUser.email,
        createdAt: new Date(),
      }, { merge: true });

      loginUser(fakeUser);

      // ✅ Trigger storage event so Navbar updates immediately
      window.dispatchEvent(new Event("storage"));

      alert("🎉 GitHub signup successful, welcome " + fakeUser.displayName + "!");
      navigate("/");
    } catch (err) {
      console.error("GitHub signup error:", err.message);
      setError(err.message);
    }
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

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* OAuth Buttons */}
        <button onClick={handleGoogleSignup} className="google-btn">
          Sign Up with Google
        </button>

        <button onClick={handleGithubSignup} className="github-btn">
          Sign Up with GitHub
        </button>

        {error && <p className="error">{error}</p>}

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
