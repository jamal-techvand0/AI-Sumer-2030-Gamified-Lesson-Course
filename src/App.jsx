import { useState, useEffect } from "react";
import { Compass, Sparkles } from "lucide-react";
import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import DailyLesson from "./screens/DailyLesson";
import WeeklyRecap from "./screens/WeeklyRecap";
import {
  Day17Storyboard,
  Day18Mixing,
  Day19Improve,
  Day20Showcase,
} from "./screens/FinalWeek";
import Portfolio from "./screens/Portfolio";
import { lessonData } from "./data/lessonData";

function App() {
  const [currentScreen, setCurrentScreen] = useState("onboarding");
  const [student, setStudent] = useState({ name: "", animal: "", emoji: "" });
  const [completedDays, setCompletedDays] = useState([]);
  const [currentDayNumber, setCurrentDayNumber] = useState(1);
  const [activeLessonDay, setActiveLessonDay] = useState(null);
  const [activeRecapWeek, setActiveRecapWeek] = useState(null);
  const [streak, setStreak] = useState(0);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  const handleOnboardingComplete = (data) => {
    setStudent(data);
    setCurrentScreen("home");
    setCompletedDays([]);
    setCurrentDayNumber(1);
    setStreak(1);
  };

  const navigateToDay = (dayNum) => {
    if (!Number.isInteger(dayNum)) return;
    setActiveLessonDay(dayNum);

    if (dayNum === 17) {
      setActiveRecapWeek(null);
      setCurrentScreen("day17");
    } else if (dayNum === 18) {
      setActiveRecapWeek(null);
      setCurrentScreen("day18");
    } else if (dayNum === 19) {
      setActiveRecapWeek(null);
      setCurrentScreen("day19");
    } else if (dayNum === 20) {
      setActiveRecapWeek(null);
      setCurrentScreen("day20");
    } else if (dayNum % 5 === 0 && dayNum < 20) {
      setActiveRecapWeek(dayNum / 5);
      setCurrentScreen("recap");
    } else {
      setActiveRecapWeek(null);
      setCurrentScreen("lesson");
    }
  };

  const handleDayComplete = (dayNum) => {
    if (!Number.isInteger(dayNum)) return;

    setCompletedDays((prev) => {
      if (prev.includes(dayNum)) {
        return prev;
      }
      return [...prev, dayNum];
    });

    setStreak((s) => s + 1);

    if (dayNum === currentDayNumber && currentDayNumber < 20) {
      setCurrentDayNumber((value) => value + 1);
    }

    setActiveRecapWeek(null);
    setCurrentScreen("home");
  };

  // Screen Router
  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <Onboarding onComplete={handleOnboardingComplete} />;

      case "home":
        return (
          <Home
            completedDays={completedDays}
            currentDay={currentDayNumber}
            streak={streak}
            studentName={student.name}
            animalName={student.animal}
            animalEmoji={student.emoji}
            onDayClick={navigateToDay}
            onPortfolioClick={() => setCurrentScreen("portfolio")}
          />
        );

      case "lesson":
        return (
          <DailyLesson
            dayNumber={activeLessonDay}
            animalName={student.animal}
            animalEmoji={student.emoji}
            studentName={student.name}
            onComplete={handleDayComplete}
            onBack={() => setCurrentScreen("home")}
          />
        );

      case "recap":
        return (
          <WeeklyRecap
            week={activeRecapWeek}
            studentName={student.name}
            onBack={() => setCurrentScreen("home")}
          />
        );

      case "portfolio":
        return (
          <Portfolio
            studentName={student.name}
            animalName={student.animal}
            animalEmoji={student.emoji}
            onBack={() => setCurrentScreen("home")}
          />
        );

      case "day17":
        return (
          <Day17Storyboard
            studentName={student.name}
            animalName={student.animal}
            animalEmoji={student.emoji}
            onComplete={handleDayComplete}
            onBack={() => setCurrentScreen("home")}
          />
        );

      case "day18":
        return (
          <Day18Mixing
            studentName={student.name}
            animalName={student.animal}
            animalEmoji={student.emoji}
            onComplete={handleDayComplete}
            onBack={() => setCurrentScreen("home")}
          />
        );

      case "day19":
        return (
          <Day19Improve
            studentName={student.name}
            animalName={student.animal}
            animalEmoji={student.emoji}
            onComplete={handleDayComplete}
            onBack={() => setCurrentScreen("home")}
          />
        );

      case "day20":
        return (
          <Day20Showcase
            studentName={student.name}
            animalName={student.animal}
            animalEmoji={student.emoji}
            onComplete={handleDayComplete}
            onBack={() => setCurrentScreen("home")}
          />
        );

      default:
        return <Onboarding onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="app app-bg">
      {currentScreen !== "onboarding" && (
        <nav className="navbar">
          <div className="navbar-inner">
            <div
              className="navbar-brand"
              onClick={() => {
                setActiveRecapWeek(null);
                setCurrentScreen("home");
              }}
            >
              <span className="navbar-brand-emoji">
                {student.emoji ? <Sparkles size={18} /> : <Compass size={18} />}
              </span>
              <span>AI Summer 2030</span>
            </div>
            <div className="navbar-actions">
              <button
                className={`navbar-link ${currentScreen === "home" ? "active" : ""}`}
                onClick={() => {
                  setActiveRecapWeek(null);
                  setCurrentScreen("home");
                }}
              >
                <span>Map</span>
              </button>
              <button
                className={`navbar-link ${currentScreen === "portfolio" ? "active" : ""}`}
                onClick={() => {
                  setActiveRecapWeek(null);
                  setCurrentScreen("portfolio");
                }}
              >
                <span>Portfolio</span>
              </button>
            </div>
          </div>
        </nav>
      )}

      <main key={currentScreen} className="app-main">
        {renderScreen()}
      </main>

      {/* Global confetti effect for reaching end of weeks or project completion */}
      {(currentDayNumber === 6 ||
        currentDayNumber === 11 ||
        currentDayNumber === 16 ||
        currentDayNumber > 20) && (
        <div className="confetti-overlay">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                background: [
                  "#FF6B6B",
                  "#4ECDC4",
                  "#FFE66D",
                  "#B19CD9",
                  "#87CEEB",
                ][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
