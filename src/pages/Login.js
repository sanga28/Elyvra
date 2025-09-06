import React, { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import auth context
import "../styles.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ so we can store logged-in user

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Fake Login with email/password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userRef = doc(db, "users", formData.email);
      const userSnap = await getDoc(userRef);

      let userData;

      if (userSnap.exists()) {
        userData = userSnap.data();
        alert("🎉 Welcome back " + userData.name + "!");
      } else {
        userData = {
          name: formData.email.split("@")[0],
          email: formData.email,
          createdAt: new Date(),
        };
        await setDoc(userRef, userData);
        alert("🎉 Account created & logged in as " + formData.email);
      }

      setUser(userData); // ✅ store in context
      navigate("/"); // ✅ redirect after login
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Fake Google Login
  const handleGoogleLogin = async () => {
    try {
      const fakeUser = {
        email: "user@gmail.com",
        name: "Google User",
      };

      await setDoc(doc(db, "users", fakeUser.email), {
        ...fakeUser,
        createdAt: new Date(),
      });

      setUser(fakeUser);
      alert("🎉 Google login successful, welcome " + fakeUser.name + "!");
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err.message);
      setError(err.message);
    }
  };

  // 🚀 Fake GitHub Login
  const handleGithubLogin = async () => {
    try {
      const fakeUser = {
        email: "user@github.com",
        name: "GitHub User",
      };

      await setDoc(doc(db, "users", fakeUser.email), {
        ...fakeUser,
        createdAt: new Date(),
      });

      setUser(fakeUser);
      alert("🎉 GitHub login successful, welcome " + fakeUser.name + "!");
      navigate("/");
    } catch (err) {
      console.error("GitHub login error:", err.message);
      setError(err.message);
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

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* OAuth Buttons */}
        <button onClick={handleGoogleLogin} className="google-btn">
          Continue with Google
        </button>

        <button onClick={handleGithubLogin} className="github-btn">
          Continue with GitHub
        </button>

        {error && <p className="error">{error}</p>}

        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
