import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot"; // ✅ Import chatbot

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Therapy from "./pages/Therapy";
import Community from "./pages/Community";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/therapy" element={<Therapy />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* ✅ Chatbot stays on all pages */}
      <Chatbot />

      <Footer />
    </Router>
  );
}

export default App;
