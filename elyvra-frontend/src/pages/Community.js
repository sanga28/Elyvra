import React from "react";

function Community() {
  return (
    <div className="page community-page">
      <h2 className="community-title">Welcome to the Elyvra Community!!</h2>
      <p className="community-intro">
        This is your safe space to <strong>connect, share, heal, and grow</strong>.
        Together, we build a circle of trust, empathy, and positive energy. 💜
      </p>

      {/* Discussion Section */}
      <div className="community-section">
        <h3>💬 Open Discussions</h3>
        <p>
          Share your thoughts, daily reflections, or simply say hello. Your voice matters
          and can inspire others who may be going through similar experiences.
        </p>
        <div className="community-box">
          <p>"What’s one small thing that made you smile today?"</p>
        </div>
      </div>

      {/* Support Groups */}
      <div className="community-section">
        <h3>🤝 Support Circles</h3>
        <p>
          Join groups that align with your journey: Anxiety Support, Mindfulness Practice,
          Gratitude Journals, or Creative Healing. Elyvra ensures you’re never alone.
        </p>
        <div className="community-grid">
          <div className="community-card">🌿 Anxiety Support</div>
          <div className="community-card">🧘 Mindfulness Circle</div>
          <div className="community-card">📔 Gratitude Journals</div>
          <div className="community-card">🎨 Creative Healing</div>
        </div>
      </div>

      {/* Events Section */}
      <div className="community-section">
        <h3>📅 Upcoming Events</h3>
        <ul className="community-events">
          <li>✨ Guided Meditation – Every Monday</li>
          <li>🎤 Open Sharing Night – Every Friday</li>
          <li>🌙 Sleep & Relaxation Workshop – Coming Soon</li>
        </ul>
      </div>

      {/* Motivational Corner */}
      <div className="community-section">
        <h3>🌟 Daily Motivation</h3>
        <blockquote className="community-quote">
          "You are stronger than you think, and more loved than you know."
        </blockquote>
      </div>
    </div>
  );
}

export default Community;
