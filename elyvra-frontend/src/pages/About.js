import React from "react";
import "../styles.css";

function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">About Elyvra</h2>
      <p className="about-intro">
          Elyvra is an AI-powered, inclusive mental wellness ecosystem designed
          to support psychological well-being. It combines intelligent therapy,
          supportive communities, and calming tools to help individuals thrive
          in their mental health journey.
      </p>
     
      <div className="about-sections">
        <div className="about-section">
          <h3>🌿 Wellness First</h3>
          <p>
            Our goal is to create a calming space where technology and empathy
            meet to nurture your mind.
          </p>
        </div>
        <div className="about-section">
          <h3>🤝 Inclusive Support</h3>
          <p>
            Elyvra ensures accessibility for everyone, providing safe and
            inclusive care tailored to individual needs.
          </p>
        </div>
        <div className="about-section">
          <h3>💡 AI-Driven Insights</h3>
          <p>
            With intelligent analysis, Elyvra helps track emotions and provides
            personalized therapy recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
