import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Compass,
  Sparkles,
  BookOpenText,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import { lessonData } from "../data/lessonData";
import Mascot from "../components/Mascot";
import "./DailyLesson.css";

export default function DailyLesson({
  dayNumber,
  animalName,
  animalEmoji,
  studentName,
  onComplete,
  onBack,
}) {
  const day = lessonData.find((d) => d.day === dayNumber);

  const getStoredValue = (key, fallback = "") => {
    if (typeof window === "undefined") return fallback;
    return window.localStorage.getItem(key) ?? fallback;
  };

  const [userPrompt, setUserPrompt] = useState(() =>
    getStoredValue(`ai2030-day-${dayNumber}-prompt`),
  );
  const [reflection, setReflection] = useState(() =>
    getStoredValue(`ai2030-day-${dayNumber}-reflection`),
  );
  const [showComplete, setShowComplete] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [proofType, setProofType] = useState("self");
  const [proofValue, setProofValue] = useState("");
  const [returning, setReturning] = useState(false);

  const walkthroughSteps = useMemo(
    () =>
      (day?.toolSteps || day?.steps || []).map((step, index) => ({
        id: `${day.day}-${index}`,
        title: step.title,
        description: step.description,
        image: step.image || "✨",
        tip: step.tip || "Tap the big button when you're ready!",
      })),
    [day],
  );

  useEffect(() => {
    window.localStorage.setItem(`ai2030-day-${dayNumber}-prompt`, userPrompt);
  }, [dayNumber, userPrompt]);

  useEffect(() => {
    window.localStorage.setItem(
      `ai2030-day-${dayNumber}-reflection`,
      reflection,
    );
  }, [dayNumber, reflection]);

  if (!day) return null;

  const handleComplete = () => {
    setShowComplete(true);
    setTimeout(() => {
      onComplete(dayNumber);
    }, 1500);
  };

  const nextStep = () => {
    setActiveStep((current) =>
      Math.min(current + 1, walkthroughSteps.length - 1),
    );
  };

  const previousStep = () => {
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  const handleProofSubmit = () => {
    if (proofType === "self" || proofValue.trim()) {
      setReturning(false);
      handleComplete();
    }
  };

  return (
    <div className="lesson screen">
      {showComplete && (
        <div className="lesson-complete-overlay">
          <div className="lesson-complete-message animate-popIn">
            <span className="complete-emoji">
              <Sparkles size={48} />
            </span>
            <h2>Day {dayNumber} Complete!</h2>
            <p>Amazing work, {studentName}!</p>
          </div>
        </div>
      )}

      <div className="container container-narrow">
        <button className="btn btn-ghost btn-sm lesson-back" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Map
        </button>

        <div className="lesson-topbar">
          <div className="lesson-badges">
            <span className="badge badge-primary">Day {day.day}</span>
            <span className="badge badge-success">{day.tool}</span>
          </div>
          <div className="lesson-quest-card">
            <span className="lesson-quest-label">Quest progress</span>
            <strong>
              {Math.min(activeStep + 1, walkthroughSteps.length)}/
              {walkthroughSteps.length} steps
            </strong>
          </div>
        </div>

        {/* Day Header */}
        <div
          className="lesson-header animate-fadeInDown"
          style={{ "--day-color": day.color }}
        >
          <div className="lesson-day-badge" style={{ background: day.color }}>
            Day {day.day}
          </div>
          <div>
            <h1 className="lesson-title">
              <span className="lesson-title-icon">
                <Sparkles size={22} />
              </span>{" "}
              {day.title}
            </h1>
            <div className="lesson-meta">
              <span className="lesson-tool">
                Tool:
                <a
                  href={day.toolLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {day.tool}
                </a>
              </span>
              <span className="lesson-skill">
                <Sparkles size={14} /> Skill: {day.skill}
              </span>
            </div>
          </div>
        </div>

        <div className="lesson-mascot animate-fadeInUp delay-1">
          <Mascot
            message={day.mascotIntro.replace(
              /your animal/gi,
              `your ${animalName}`,
            )}
            mood="excited"
          />
        </div>

        <div className="lesson-section animate-fadeInUp delay-2">
          <div
            className="lesson-task-card"
            style={{ borderLeftColor: day.color }}
          >
            <p>
              {day.task
                .replace(/your animal/gi, `your ${animalName}`)
                .replace(/your chosen animal/gi, `your ${animalName}`)}
            </p>
          </div>
        </div>

        <div className="lesson-section animate-fadeInUp delay-3">
          <div
            className="lesson-carousel-card"
            style={{ borderColor: day.color }}
          >
            <div className="lesson-carousel-head">
              <div>
                <h2 className="lesson-section-title">
                  <Compass size={20} /> Tool Quest
                </h2>
                <p className="lesson-carousel-subtitle">
                  Follow the steps, then tap the big button to try the real
                  tool.
                </p>
              </div>
              <div className="lesson-carousel-dots">
                {walkthroughSteps.map((step, index) => (
                  <button
                    key={step.id}
                    className={`lesson-dot ${index === activeStep ? "active" : ""}`}
                    onClick={() => setActiveStep(index)}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="lesson-carousel-stage">
              <div
                className="lesson-carousel-illustration"
                style={{ background: day.color }}
              >
                <span className="lesson-carousel-emoji">
                  {walkthroughSteps[activeStep]?.image}
                </span>
              </div>
              <div className="lesson-carousel-copy">
                <span className="lesson-step-chip">Step {activeStep + 1}</span>
                <h3>{walkthroughSteps[activeStep]?.title}</h3>
                <p>{walkthroughSteps[activeStep]?.description}</p>
                <div className="lesson-highlight-pill">
                  <Sparkles size={16} /> {walkthroughSteps[activeStep]?.tip}
                </div>
              </div>
            </div>

            <div className="lesson-carousel-actions">
              <button
                className="btn btn-ghost"
                onClick={previousStep}
                disabled={activeStep === 0}
              >
                ← Back
              </button>
              {activeStep < walkthroughSteps.length - 1 ? (
                <button className="btn btn-primary" onClick={nextStep}>
                  Next step <span aria-hidden="true">→</span>
                </button>
              ) : (
                <a
                  className="btn btn-primary"
                  href={day.toolLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: `linear-gradient(135deg, ${day.color}, ${day.color}dd)`,
                  }}
                >
                  <PlayCircle size={18} /> Go try it for real!
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="lesson-section animate-fadeInUp delay-4">
          <div
            className="lesson-action-card"
            style={{ borderColor: day.color }}
          >
            <h2 className="lesson-section-title">
              <BookOpenText size={20} /> Your mini practice
            </h2>
            <p className="lesson-action-copy">
              Type your own idea for {day.tool} below. It stays on this device
              and helps you remember what to try next.
            </p>
            <textarea
              className="textarea your-turn-input"
              placeholder={`Write your ${day.tool} idea about your ${animalName} here...`}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              rows={4}
            />
            {userPrompt && (
              <div className="your-turn-preview">
                <Sparkles size={16} /> Nice idea ready to try!
              </div>
            )}
          </div>
        </div>

        <div className="lesson-section animate-fadeInUp delay-5">
          <h2 className="lesson-section-title">
            <Sparkles size={18} /> Worked Example — {day.workedExampleAnimal}
          </h2>
          <div className="example-card">
            <div className="example-prompt">
              <span className="example-label">Prompt</span>
              <p>{day.workedExamplePrompt}</p>
            </div>
            <div className="example-output">
              <span className="example-label">Result</span>
              <p>{day.workedExampleOutput}</p>
            </div>
          </div>
        </div>

        <div className="lesson-section animate-fadeInUp delay-7">
          <div className="reflect-card">
            <p className="reflect-question">{day.reflectionQuestion}</p>
            <textarea
              className="textarea reflect-input"
              placeholder="Write your reflection here..."
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="lesson-complete-area animate-fadeInUp delay-8">
          <button
            className="btn btn-primary btn-lg lesson-complete-btn"
            onClick={() => setReturning(true)}
            style={{
              background: `linear-gradient(135deg, ${day.color}, ${day.color}dd)`,
            }}
          >
            <CheckCircle2 size={18} /> Finish Day {day.day}
          </button>
        </div>

        {returning && (
          <div
            className="lesson-return-overlay"
            role="dialog"
            aria-modal="true"
          >
            <div className="lesson-return-card">
              <h3>Welcome back!</h3>
              <p>Show us what you made and claim your badge.</p>
              <div className="lesson-proof-options">
                <label className="lesson-proof-pill">
                  <input
                    type="radio"
                    name="proof"
                    value="self"
                    checked={proofType === "self"}
                    onChange={() => setProofType("self")}
                  />
                  I made it!
                </label>
                <label className="lesson-proof-pill">
                  <input
                    type="radio"
                    name="proof"
                    value="link"
                    checked={proofType === "link"}
                    onChange={() => setProofType("link")}
                  />
                  Paste a link
                </label>
              </div>
              {proofType === "link" && (
                <input
                  className="input"
                  value={proofValue}
                  onChange={(e) => setProofValue(e.target.value)}
                  placeholder="Paste your creation link here"
                />
              )}
              <div className="lesson-carousel-actions">
                <button
                  className="btn btn-ghost"
                  onClick={() => setReturning(false)}
                >
                  Not yet
                </button>
                <button className="btn btn-primary" onClick={handleProofSubmit}>
                  Claim badge
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
