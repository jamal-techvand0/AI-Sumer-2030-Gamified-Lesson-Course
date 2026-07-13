import { useEffect, useState } from "react";
import {
  BookOpenCheck,
  Flame,
  Sparkles,
  Trophy,
  FolderKanban,
} from "lucide-react";
import { lessonData } from "../data/lessonData";
import Mascot from "../components/Mascot";
import "./Home.css";

export default function Home({
  completedDays,
  currentDay,
  streak,
  studentName,
  animalName,
  animalEmoji,
  onDayClick,
  onPortfolioClick,
}) {
  const totalCompleted = completedDays.length;
  const xp = totalCompleted * 120 + streak * 25;
  const badgeLabel =
    totalCompleted >= 20
      ? "Master Creator"
      : totalCompleted >= 15
        ? "Super Star"
        : totalCompleted >= 10
          ? "Rising Star"
          : "Starter";
  const nextGoal =
    totalCompleted >= 20
      ? "All missions complete!"
      : `Next badge at ${Math.min(20, totalCompleted + 5)} days`;

  const [lockedPulseDay, setLockedPulseDay] = useState(null);

  useEffect(() => {
    if (!lockedPulseDay) return;
    const timer = window.setTimeout(() => setLockedPulseDay(null), 700);
    return () => window.clearTimeout(timer);
  }, [lockedPulseDay]);

  const handleDayNodeClick = (day) => {
    if (day.day > currentDay) {
      setLockedPulseDay(day.day);
      return;
    }
    onDayClick(day.day);
  };

  return (
    <div className="home screen">
      <div className="container">
        {/* Header stats */}
        <div className="home-header animate-fadeInDown">
          <div className="home-welcome">
            <h1 className="home-title">
              <span className="home-title-icon">
                <Sparkles size={24} />
              </span>{" "}
              {studentName}'s Adventure
            </h1>
            <p className="home-subtitle">Your 20-Day AI Creative Journey</p>
          </div>
          <div className="home-stats">
            <div className="streak">
              <span className="streak-fire">
                <Flame size={18} />
              </span>
              <span>{streak} day streak</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-icon">
                <BookOpenCheck size={16} />
              </span>
              <span>{totalCompleted}/20 completed</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={onPortfolioClick}>
              <FolderKanban size={16} /> My Creations
            </button>
          </div>
        </div>

        <div className="home-adventure-hud animate-fadeInUp">
          <div>
            <p className="home-hud-label">Adventure HQ</p>
            <h2 className="home-hud-title">
              {animalName ? `${animalName}'s quest board` : "Your quest board"}
            </h2>
            <p className="home-hud-copy">{nextGoal}</p>
          </div>
          <div className="home-hud-stats">
            <div className="stat-pill">
              <Sparkles size={16} /> {xp} XP
            </div>
            <div className="stat-pill">
              <Flame size={16} /> {streak} streak
            </div>
            <div className="stat-pill">
              <Trophy size={16} /> {badgeLabel}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {streak >= 2 && totalCompleted > 0 && (
          <div className="home-momentum-pill animate-fadeInUp">
            <Sparkles size={16} /> On a roll!
          </div>
        )}

        <div className="home-progress-bar animate-fadeIn">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(totalCompleted / 20) * 100}%` }}
            />
          </div>
          <span className="progress-label">
            {Math.round((totalCompleted / 20) * 100)}% complete
          </span>
        </div>

        {/* Mascot */}
        <div className="home-mascot">
          <Mascot
            message={
              totalCompleted === 0
                ? `Welcome, ${studentName}! Your ${animalName} adventure starts here! Click Day 1 to begin!`
                : totalCompleted >= 20
                  ? `YOU DID IT, ${studentName}! All 20 days complete! You're an AI Creative Master!`
                  : `Great work, ${studentName}! You've completed ${totalCompleted} days! Ready for Day ${currentDay}? Let's make something amazing with your ${animalName}!`
            }
            mood={
              totalCompleted >= 20
                ? "celebrating"
                : totalCompleted > 0
                  ? "excited"
                  : "happy"
            }
          />
        </div>

        {/* Week labels + Map */}
        <div className="progress-map">
          {[1, 2, 3, 4].map((week) => {
            const weekDays = lessonData.filter((d) => d.week === week);
            const weekLabel =
              week === 4 ? "Week 4: Final Project" : `Week ${week}`;
            return (
              <div
                key={week}
                className="week-section animate-fadeInUp"
                style={{ animationDelay: `${week * 0.1}s` }}
              >
                <div className="week-header">
                  <h3 className="week-label">{weekLabel}</h3>
                  <div className="week-line" />
                </div>
                <div className="week-days">
                  {weekDays.map((day) => {
                    const isCompleted = completedDays.includes(day.day);
                    const isCurrent = day.day === currentDay;
                    const isLocked = day.day > currentDay;

                    return (
                      <button
                        key={day.day}
                        className={`day-node ${isCompleted ? "completed" : ""} ${isCurrent ? "current" : ""} ${isLocked ? "locked" : ""} ${lockedPulseDay === day.day ? "shake" : ""}`}
                        onClick={() => handleDayNodeClick(day)}
                        aria-disabled={isLocked}
                        style={{ "--day-color": day.color }}
                      >
                        <div className="day-node-circle">
                          {isCompleted ? (
                            <span className="day-check">
                              <Sparkles size={18} />
                            </span>
                          ) : isLocked ? (
                            <span
                              className={`day-lock ${lockedPulseDay === day.day ? "wiggle" : ""}`}
                            >
                              <BookOpenCheck size={16} />
                            </span>
                          ) : (
                            <span className="day-emoji">{day.emoji}</span>
                          )}
                        </div>
                        <span className="day-node-number">Day {day.day}</span>
                        <span className="day-node-title">{day.title}</span>
                        {isCurrent && (
                          <span className="day-node-badge">START →</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
