import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero text-center py-12 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Elyvra 🌸</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Your personal mental wellness companion – connect, learn, and grow
          with a supportive community and AI-powered guidance.
        </p>
        <Link
          to="/signup"
          className="mt-6 inline-block bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-purple-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="features">
  <h2>Why Choose Elyvra?</h2>
  <div className="feature-list">
    <div className="feature-item">
      <h3>🌿 Safe Space</h3>
      <p>Judgment-free environment to express yourself.</p>
    </div>
    <div className="feature-item">
      <h3>🤖 AI Support</h3>
      <p>Always-on companion for your emotional needs.</p>
    </div>
    <div className="feature-item">
      <h3>📈 Progress</h3>
      <p>Track growth with reports and insights.</p>
    </div>
    <div className="feature-item">
      <h3>🤝 Community</h3>
      <p>Connect with peers for mutual support.</p>
    </div>
  </div>
</section>

      {/* Quick Navigation */}
      <section className="quick-nav py-12 px-6 bg-gray-50 text-center">
        <h2 className="text-2xl font-semibold mb-6">Explore Elyvra</h2>
        <div className="nav-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Link to="/dashboard" className="nav-card p-6 bg-white shadow rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">📊 Dashboard</h3>
            <p>Track your therapy progress and download reports.</p>
          </Link>
          <Link to="/community" className="nav-card p-6 bg-white shadow rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">🤝 Community</h3>
            <p>Connect, share, and grow together with peers.</p>
          </Link>
          <Link to="/chatbot" className="nav-card p-6 bg-white shadow rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">📚 Resources</h3>
            <p>Explore articles, self-help guides, and wellness tips.</p>
          </Link>
          <Link to="/chatbot" className="nav-card p-6 bg-white shadow rounded-2xl hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">💬 Elyvra Bot</h3>
            <p>Your 24/7 companion for quick emotional support.</p>
          </Link>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="testimonial py-12 px-6 text-center max-w-3xl mx-auto">
        <blockquote className="text-xl italic text-gray-700 mb-4">
          "Taking care of your mental health is just as important as your
          physical health. Elyvra is here to walk with you on your journey."
        </blockquote>
        <p className="font-semibold text-purple-700">– The Elyvra Team</p>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner py-12 text-center bg-purple-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Start Your Wellness Journey Today</h2>
        <Link
          to="/signup"
          className="cta-btn inline-block bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-purple-100 transition"
        >
          Join Now
        </Link>
      </section>
    </div>
  );
}

export default Home;
