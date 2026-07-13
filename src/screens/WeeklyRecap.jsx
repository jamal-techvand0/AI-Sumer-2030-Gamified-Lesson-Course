import { Sparkles } from "lucide-react";
import { mockCreations } from "../data/lessonData";
import Mascot from "../components/Mascot";
import CreationCard from "../components/CreationCard";
import "./WeeklyRecap.css";

export default function WeeklyRecap({ week = 1, studentName, onBack }) {
  const weekCreations = mockCreations
    .filter((c) => c.week === week)
    .slice(0, 5);

  return (
    <div className="recap screen">
      <div className="container">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Back to Map
        </button>

        <div className="recap-header animate-fadeInDown">
          <h1 className="recap-title">
            <Sparkles size={24} /> Week {week} Recap!
          </h1>
          <p className="recap-subtitle">
            Look at everything you created, {studentName}!
          </p>
        </div>

        <div className="recap-mascot">
          <Mascot
            message={`Wow, ${studentName}! Look at all the amazing things you made this week! Each one is a step in your creative journey. I'm SO proud of you! 🌟`}
            mood="proud"
          />
        </div>

        <div className="recap-grid">
          {weekCreations.map((creation, i) => (
            <CreationCard key={creation.day} creation={creation} index={i} />
          ))}
        </div>

        <div className="recap-summary animate-fadeInUp">
          <div className="recap-stat-row">
            <div className="recap-stat">
              <span className="recap-stat-num">{weekCreations.length}</span>
              <span className="recap-stat-label">Creations</span>
            </div>
            <div className="recap-stat">
              <span className="recap-stat-num">{weekCreations.length}</span>
              <span className="recap-stat-label">AI Tools Used</span>
            </div>
            <div className="recap-stat">
              <span className="recap-stat-num">
                <Sparkles size={16} />
              </span>
              <span className="recap-stat-label">Great Work!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
