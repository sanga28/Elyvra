import React from "react";
import { useNavigate } from "react-router-dom";
function Therapy() {
  const navigate = useNavigate();

  const startSession = () => {
    navigate("/chatbot"); 
  };
  return (
    <div className="therapy-page">
      <div className="therapy-container">
        {/* Hero */}
        <div className="therapy-hero">
          <h2>Therapy & Support</h2>
          <p>
            Explore guided sessions, emotional tracking, and AI-driven therapy
            designed to help you live mindfully and improve your well-being.
          </p>
          <button className="therapy-btn" onClick={startSession}>Start a Session</button>
        </div>

        {/* Therapy Types */}
        <div className="therapy-boxes">
          <div className="therapy-box">
            <h3>Mindfulness</h3>
            <p>Calming practices to reduce stress and improve focus.</p>
          </div>
          <div className="therapy-box">
            <h3>Cognitive Support</h3>
            <p>CBT-inspired exercises for positive thinking patterns.</p>
          </div>
          <div className="therapy-box">
            <h3>Emotion Tracking</h3>
            <p>Monitor moods daily to understand emotional trends.</p>
          </div>
          <div className="therapy-box">
            <h3>Group Support</h3>
            <p>Join safe spaces where you can share and connect.</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="therapy-testimonials">
          <h3>What Our Users Say</h3>
          <blockquote>
            “Elyvra’s therapy sessions helped me manage my anxiety better than
            anything I’ve tried before.”
          </blockquote>
          <p>– Alex, 27</p>
        </div>

        {/* FAQ */}
        <div className="therapy-faq">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-item">
            <strong>💡 How do sessions work?</strong>
            <p>
              You can start a guided session anytime. The AI adapts in real-time
              to your responses.
            </p>
          </div>
          <div className="faq-item">
            <strong>🔒 Is my data private?</strong>
            <p>
              Yes. All your therapy data is encrypted and never shared without
              your consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Therapy;
