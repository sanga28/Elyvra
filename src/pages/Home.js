import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const features = [
  { title: "🌿 Safe Space", desc: "Judgment-free environment to express yourself." },
  { title: "🤖 AI Support", desc: "Always-on companion for your emotional needs." },
  { title: "📈 Progress", desc: "Track growth with reports and insights." },
  { title: "🤝 Community", desc: "Connect with peers for mutual support." },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Auto rotate features every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("elyvraUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle CTA button
  const handleCTA = () => {
    if (user) {
      alert("💬 Start the convo now!");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Elyvra </h1>
        <p>
          Your personal mental wellness companion – connect, learn, and grow
          with a supportive community and AI-powered guidance.
        </p>
        <button onClick={handleCTA} className="btn-primary">
          {user ? "Start Now" : "Get Started"}
        </button>
      </section>

      {/* Features Circular Roller */}
      <section className="features">
        <h2>Why Choose Elyvra?</h2>
        <div className="features-container">
          {/* Left: Roller */}
          <div className="roller">
            {features.map((feature, idx) => {
              const angle = (360 / features.length) * idx;
              return (
                <div
                  key={idx}
                  className={`feature-item ${idx === activeIndex ? "active" : ""}`}
                  style={{
                    transform:
                      idx === activeIndex
                        ? "translateX(0) scale(1.2)"
                        : `rotate(${angle}deg) translate(180px) rotate(-${angle}deg) scale(0.8)`,
                  }}
                >
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Right: Text */}
          <div className="feature-text">
            <h3>Your Wellness, Our Focus</h3>
            <p>
              Elyvra brings together safe spaces, AI guidance, progress tracking,
              and community support — all designed to help you thrive mentally
              and emotionally.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="quick-nav">
        <h2 className="features-title">Explore Elyvra</h2>
        <div className="nav-grid">
          <Link to="/dashboard" className="nav-card">
            <h3>📊 Dashboard</h3>
            <p>Track your therapy progress and download reports.</p>
          </Link>
          <Link to="/community" className="nav-card">
            <h3>🤝 Community</h3>
            <p>Connect, share, and grow together with peers.</p>
          </Link>
          <Link to="/therapy" className="nav-card">
            <h3>📚 Resources</h3>
            <p>Explore articles, self-help guides, and wellness tips.</p>
          </Link>
          <Link to="chatbot" className="nav-card">
            <h3>💬 Elyvra Bot</h3>
            <p>Your 24/7 companion for quick emotional support.</p>
          </Link>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial">
        <blockquote>
          "Taking care of your mental health is just as important as your
          physical health. Elyvra is here to walk with you on your journey."
        </blockquote>
        <p className="author">– The Elyvra Team</p>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <h2>Start Your Wellness Journey Today</h2>
        <button onClick={handleCTA} className="btn-primary">
          {user ? "Start Now" : "Join Now"}
        </button>
      </section>
    </div>
  );
}

export default Home;
