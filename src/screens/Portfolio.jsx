import { useState } from "react";
import { Sparkles } from "lucide-react";
import { mockCreations } from "../data/lessonData";
import CreationCard from "../components/CreationCard";
import Mascot from "../components/Mascot";
import "./Portfolio.css";

export default function Portfolio({
  studentName,
  animalName,
  animalEmoji,
  onBack,
}) {
  const [filterWeek, setFilterWeek] = useState("All");

  const filteredCreations =
    filterWeek === "All"
      ? mockCreations
      : mockCreations.filter((c) => c.week === Number(filterWeek));

  const totalCreations = mockCreations.length;

  return (
    <div className="portfolio screen">
      <div className="container">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          ← Back to Map
        </button>

        <div className="portfolio-header animate-fadeInDown">
          <div>
            <h1 className="portfolio-title">
              <span className="portfolio-title-icon">
                <Sparkles size={24} />
              </span>{" "}
              {studentName}'s Portfolio
            </h1>
            <p className="portfolio-subtitle">
              Your collection of AI masterpieces!
            </p>
          </div>
          <div className="portfolio-stats">
            <span className="badge badge-primary">
              {totalCreations} Total Creations
            </span>
          </div>
        </div>

        {totalCreations === 0 ? (
          <div className="portfolio-empty animate-fadeInUp">
            <Mascot
              message={`Your portfolio is waiting for its first masterpiece, ${studentName}! Let's start the adventure!`}
              mood="thinking"
            />
          </div>
        ) : (
          <>
            <div className="portfolio-filters animate-fadeInUp delay-1">
              <div className="tabs">
                <button
                  className={`tab ${filterWeek === "All" ? "active" : ""}`}
                  onClick={() => setFilterWeek("All")}
                >
                  All Creations
                </button>
                {[1, 2, 3, 4].map((week) => (
                  <button
                    key={week}
                    className={`tab ${filterWeek === week ? "active" : ""}`}
                    onClick={() => setFilterWeek(week)}
                  >
                    Week {week}
                  </button>
                ))}
              </div>
            </div>

            <div className="portfolio-grid">
              {filteredCreations.map((creation, i) => (
                <CreationCard
                  key={creation.day}
                  creation={creation}
                  index={i}
                />
              ))}
            </div>

            {filteredCreations.length === 0 && (
              <div className="portfolio-empty-filter animate-fadeIn">
                <p>No creations found for Week {filterWeek} yet. Keep going!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
