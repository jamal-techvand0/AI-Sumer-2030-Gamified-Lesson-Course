import { lessonData } from '../data/lessonData';
import Mascot from '../components/Mascot';
import './Home.css';

export default function Home({ completedDays, currentDay, streak, studentName, animalName, animalEmoji, onDayClick, onPortfolioClick }) {
  const totalCompleted = completedDays.length;

  return (
    <div className="home screen">
      <div className="container">
        {/* Header stats */}
        <div className="home-header animate-fadeInDown">
          <div className="home-welcome">
            <h1 className="home-title">
              {animalEmoji} {studentName}'s Adventure
            </h1>
            <p className="home-subtitle">Your 20-Day AI Creative Journey</p>
          </div>
          <div className="home-stats">
            <div className="streak">
              <span className="streak-fire">🔥</span>
              <span>{streak} day streak</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-icon">✅</span>
              <span>{totalCompleted}/20 completed</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={onPortfolioClick}>
              📁 My Creations
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="home-progress-bar animate-fadeIn">
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${(totalCompleted / 20) * 100}%` }} />
          </div>
          <span className="progress-label">{Math.round((totalCompleted / 20) * 100)}% complete</span>
        </div>

        {/* Mascot */}
        <div className="home-mascot">
          <Mascot
            message={
              totalCompleted === 0
                ? `Welcome, ${studentName}! Your ${animalName} adventure starts here! Click Day 1 to begin! 🌟`
                : totalCompleted >= 20
                ? `YOU DID IT, ${studentName}! All 20 days complete! You're an AI Creative Master! 🏆`
                : `Great work, ${studentName}! You've completed ${totalCompleted} days! Ready for Day ${currentDay}? Let's make something amazing with your ${animalName}! 💪`
            }
            mood={totalCompleted >= 20 ? 'celebrating' : totalCompleted > 0 ? 'excited' : 'happy'}
          />
        </div>

        {/* Week labels + Map */}
        <div className="progress-map">
          {[1, 2, 3, 4].map(week => {
            const weekDays = lessonData.filter(d => d.week === week);
            const weekLabel = week === 4 ? 'Week 4: Final Project' : `Week ${week}`;
            return (
              <div key={week} className="week-section animate-fadeInUp" style={{ animationDelay: `${week * 0.1}s` }}>
                <div className="week-header">
                  <h3 className="week-label">{weekLabel}</h3>
                  <div className="week-line" />
                </div>
                <div className="week-days">
                  {weekDays.map(day => {
                    const isCompleted = completedDays.includes(day.day);
                    const isCurrent = day.day === currentDay;
                    const isLocked = day.day > currentDay;

                    return (
                      <button
                        key={day.day}
                        className={`day-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}`}
                        onClick={() => !isLocked && onDayClick(day.day)}
                        disabled={isLocked}
                        style={{ '--day-color': day.color }}
                      >
                        <div className="day-node-circle">
                          {isCompleted ? (
                            <span className="day-check">✓</span>
                          ) : isLocked ? (
                            <span className="day-lock">🔒</span>
                          ) : (
                            <span className="day-emoji">{day.emoji}</span>
                          )}
                        </div>
                        <span className="day-node-number">Day {day.day}</span>
                        <span className="day-node-title">{day.title}</span>
                        {isCurrent && <span className="day-node-badge">START →</span>}
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
