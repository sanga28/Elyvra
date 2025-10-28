import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";

const moodData = [
  { day: "Mon", mood: 6 },
  { day: "Tue", mood: 7 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 8 },
  { day: "Fri", mood: 6 },
  { day: "Sat", mood: 9 },
  { day: "Sun", mood: 7 },
];

function Dashboard() {
  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Mental Health Progress Report", 20, 20);
    doc.setFontSize(12);
    doc.text("Mood Trends:", 20, 40);
    moodData.forEach((entry, index) => {
      doc.text(`${entry.day}: ${entry.mood}/10`, 20, 55 + index * 10);
    });
    doc.text("Mindfulness Streak: 12 days", 20, 140);
    doc.text("Upcoming Therapy Session: Sept 6, 5:00 PM", 20, 155);
    doc.save("progress_report.pdf");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Your Dashboard</h2>
      <p className="dashboard-subtitle">Track your growth, reflect on progress, and stay motivated.</p>

      {/* Mood Trend Chart */}
      <div className="dashboard-section">
        <h3>Mood Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line type="monotone" dataKey="mood" stroke="#7e57c2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Mindfulness Streak */}
      <div className="dashboard-section streak-box">
        <h3>Mindfulness Streak</h3>
        <p>🔥 You’ve meditated for <strong>12 consecutive days</strong>! Keep it going!</p>
      </div>

      {/* Upcoming Therapy Sessions */}
      <div className="dashboard-section session-box">
        <h3>Upcoming Session</h3>
        <p>📅 Next therapy session: <strong>Sept 6, 5:00 PM</strong></p>
      </div>

      {/* Daily Motivation */}
      <div className="dashboard-section tips-box">
        <h3>Daily Tip</h3>
        <p>💡 Remember: Progress is progress, no matter how small. 🌱</p>
      </div>

      {/* Download Report Button */}
      <div className="dashboard-section">
        <button className="download-btn" onClick={downloadReport}>📥 Download Progress Report</button>
      </div>
    </div>
  );
}

export default Dashboard;
