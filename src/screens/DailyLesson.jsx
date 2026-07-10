import { useState } from 'react';
import { lessonData } from '../data/lessonData';
import Mascot from '../components/Mascot';
import StepWalkthrough from '../components/StepWalkthrough';
import './DailyLesson.css';

export default function DailyLesson({ dayNumber, animalName, animalEmoji, studentName, onComplete, onBack }) {
  const day = lessonData.find(d => d.day === dayNumber);
  const [userPrompt, setUserPrompt] = useState('');
  const [reflection, setReflection] = useState('');
  const [showComplete, setShowComplete] = useState(false);

  if (!day) return null;

  const handleComplete = () => {
    setShowComplete(true);
    setTimeout(() => {
      onComplete(dayNumber);
    }, 1500);
  };

  return (
    <div className="lesson screen">
      {showComplete && (
        <div className="lesson-complete-overlay">
          <div className="lesson-complete-message animate-popIn">
            <span className="complete-emoji">🎉</span>
            <h2>Day {dayNumber} Complete!</h2>
            <p>Amazing work, {studentName}!</p>
          </div>
        </div>
      )}

      <div className="container container-narrow">
        {/* Back button */}
        <button className="btn btn-ghost btn-sm lesson-back" onClick={onBack}>
          ← Back to Map
        </button>

        {/* Day Header */}
        <div className="lesson-header animate-fadeInDown" style={{ '--day-color': day.color }}>
          <div className="lesson-day-badge" style={{ background: day.color }}>
            Day {day.day}
          </div>
          <div>
            <h1 className="lesson-title">{day.emoji} {day.title}</h1>
            <div className="lesson-meta">
              <span className="lesson-tool">
                🛠️ Tool: <a href={day.toolLink} target="_blank" rel="noopener noreferrer">{day.tool}</a>
              </span>
              <span className="lesson-skill">🧠 Skill: {day.skill}</span>
            </div>
          </div>
        </div>

        {/* Mascot Intro */}
        <div className="lesson-mascot animate-fadeInUp delay-1">
          <Mascot
            message={day.mascotIntro.replace(/your animal/gi, `your ${animalName}`)}
            mood="excited"
          />
        </div>

        {/* Task Description */}
        <div className="lesson-section animate-fadeInUp delay-2">
          <h2 className="lesson-section-title">📋 Today's Mission</h2>
          <div className="lesson-task-card" style={{ borderLeftColor: day.color }}>
            <p>{day.task.replace(/your animal/gi, `your ${animalName}`).replace(/your chosen animal/gi, `your ${animalName}`)}</p>
          </div>
        </div>

        {/* Step by Step */}
        <div className="lesson-section animate-fadeInUp delay-3">
          <h2 className="lesson-section-title">🪜 Step-by-Step Guide</h2>
          <StepWalkthrough steps={day.steps} color={day.color} />
        </div>

        {/* Worked Example */}
        <div className="lesson-section animate-fadeInUp delay-4">
          <h2 className="lesson-section-title">💡 Worked Example — {day.workedExampleAnimal}</h2>
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

        {/* Your Turn */}
        <div className="lesson-section animate-fadeInUp delay-5">
          <h2 className="lesson-section-title">{animalEmoji} Your Turn!</h2>
          <div className="your-turn-card" style={{ '--day-color': day.color }}>
            <p className="your-turn-prompt">
              Now write YOUR prompt for your {animalName}! Use the steps above as a guide.
            </p>
            <textarea
              className="textarea your-turn-input"
              placeholder={`Write your ${day.tool} prompt about your ${animalName} here...`}
              value={userPrompt}
              onChange={e => setUserPrompt(e.target.value)}
              rows={5}
            />
            {userPrompt && (
              <div className="your-turn-preview animate-fadeIn">
                <span className="your-turn-preview-label">✨ Your prompt is {userPrompt.length} characters — nice!</span>
              </div>
            )}
          </div>
        </div>

        {/* Save & Reflect */}
        <div className="lesson-section animate-fadeInUp delay-6">
          <h2 className="lesson-section-title">🪞 Save & Reflect</h2>
          <div className="reflect-card">
            <p className="reflect-question">{day.reflectionQuestion}</p>
            <textarea
              className="textarea reflect-input"
              placeholder="Write your reflection here..."
              value={reflection}
              onChange={e => setReflection(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Complete Button */}
        <div className="lesson-complete-area animate-fadeInUp delay-7">
          <button
            className="btn btn-primary btn-lg lesson-complete-btn"
            onClick={handleComplete}
            style={{ background: `linear-gradient(135deg, ${day.color}, ${day.color}dd)` }}
          >
            ✅ Mark Day {day.day} Complete!
          </button>
        </div>
      </div>
    </div>
  );
}
