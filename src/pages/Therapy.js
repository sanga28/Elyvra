import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Therapy() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("elyvraUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCTA = () => {
    if (user) {
      alert("💬 Start the convo now!");
    } else {
      navigate("/signup");
    }
  };

  // FAQ Data
  const faqs = [
    {
      q: "💡 How do sessions work?",
      a: "You can start a guided session anytime. The AI adapts in real-time to your responses.",
    },
    {
      q: "🔒 Is my data private?",
      a: "Yes. All your therapy data is encrypted and never shared without your consent.",
    },
    {
      q: "⏰ How long is a typical session?",
      a: "Most sessions last between 10-20 minutes, but you can end anytime you feel comfortable.",
    },
    {
      q: "📱 Can I access Elyvra on mobile?",
      a: "Yes! Elyvra is fully responsive and works on smartphones, tablets, and desktops.",
    },
    {
      q: "💰 Do I need to pay for sessions?",
      a: "Basic features are free. Premium plans unlock advanced insights and unlimited sessions.",
    },
  ];

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
          <button className="therapy-btn" onClick={handleCTA}>
            Start a Session
          </button>
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
          {faqs.map((item, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() =>
                  setOpenFAQ(openFAQ === index ? null : index)
                }
              >
                <span>{item.q}</span>
                <span className="faq-toggle">
                  {openFAQ === index ? "➖" : "➕"}
                </span>
              </div>
              {openFAQ === index && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Therapy;
